"use server";

import { Resend } from "resend";

import { db } from "@/lib/prisma";
import { SignInSchemaType } from "../sign-in/schema";
import { SignUpSchema } from "./schema";
import { saltAndHashPassword } from "@/lib/utils";
import { VerifyEmail } from "@/components/templates/email-verify";

const resend = new Resend(process.env.RESEND_API_KEY);

export const SIGN_UP = async (values: SignInSchemaType) => {
  const { data, success } = SignUpSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = saltAndHashPassword(data.password);

  const newUser = await db.$transaction(async (ctx) => {
    const newUser = await ctx.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const verificationToken = await ctx.verificationToken.create({
      data: {
        identifier: newUser.id,
        token: Math.floor(100000 + Math.random() * 900000).toString(),
        expires: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [data.email],
      subject: "Account Verification",
      react: VerifyEmail({ code: verificationToken.token }),
    });

    return newUser;
  });

  return {
    success: "Registration successful",
    user: newUser,
  };
};
