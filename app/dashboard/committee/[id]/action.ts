"use server";

import { db } from "@/lib/prisma";
import { CommitteeMember, CommitteeMemberType } from "./schema";
import { revalidatePath } from "next/cache";

export const ADD_MEMBER = async (values: CommitteeMemberType) => {
  const { data, success } = CommitteeMember.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const member = await db.committeeMember.findFirst({
    where: {
      name: data.name,
    },
  });

  if (member) {
    throw new Error("Member already exists");
  }

  await db.committeeMember.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/committee");

  return {
    success: "Member added",
  };
};
