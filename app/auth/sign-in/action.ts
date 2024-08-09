"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { isRedirectError } from "next/dist/client/components/redirect";

import { signIn } from "@/auth";
import { SignInSchemaType } from "./schema";
import { db } from "@/lib/prisma";
import { VerifyEmail } from "@/components/templates/email-verify";

const resend = new Resend(process.env.RESEND_API_KEY);

type SignInUser = {
  values: SignInSchemaType;
  callback: string | null;
};
export const SIGN_IN_USER = async ({ values, callback }: SignInUser) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!user.emailVerified) {
      const verificationToken = await db.verificationToken.upsert({
        where: {
          identifier: user.id,
        },
        update: {
          token: Math.floor(100000 + Math.random() * 900000).toString(),
          expires: new Date(Date.now() + 30 * 60 * 1000),
        },
        create: {
          identifier: user.id,
          token: Math.floor(100000 + Math.random() * 900000).toString(),
          expires: new Date(Date.now() + 30 * 60 * 1000),
        },
      });

      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [values.email],
        subject: "Account Verification",
        react: VerifyEmail({ code: verificationToken.token }),
      });

      redirect(`/auth/verify/${user.id}`);
    } else {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirectTo: callback ? callback : "/",
      });

      return { success: "Login successful", user };
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof Error) {
      const { type, cause } = error as AuthError;

      switch (type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        case "CallbackRouteError":
          throw new Error(cause?.err?.toString());
        default:
          throw new Error("Something went wrong");
      }
    }
  }
};

export const VERIFY_EMAIL = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};
