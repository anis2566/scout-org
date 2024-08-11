"use server";

import { db } from "@/lib/prisma";
import { SignInSchemaType } from "../sign-in/schema";
import { SignUpSchema } from "./schema";
import { saltAndHashPassword } from "@/lib/utils";
import streamServerClient from "@/lib/stream";
import { User } from "next-auth";
import { Knock } from "@knocklabs/node";
const knock = new Knock(process.env.NEXT_PUBLIC_KNOCK_API_KEY);

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

    await knock.users.identify(newUser.id, {
      name: newUser.name ?? "Guest",
      avatar: newUser.image,
    });

    await streamServerClient.upsertUser({
      id: newUser.id,
      name: data.name,
      username: data.name,
    });

    return newUser;
  });

  return {
    success: "Registration successful",
    user: newUser,
  };
};

export const CREATE_STREAM_USER = async (user: User) => {
  await streamServerClient.upsertUser({
    id: user.id ?? "",
    username: user.name || "Guest",
    name: user.name || "Guest",
  });
};
