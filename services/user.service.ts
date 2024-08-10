"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

export const GET_USER_BY_EMAIL = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


export const GET_USER = async () => {
  const session = await auth()

  const user = await db.user.findUnique({
    where: {
      id: session?.userId
    }
  })

  if(!user) {
    throw new Error("User not found")
  }

  return {user};
}