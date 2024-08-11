"use server";

import { db } from "@/lib/prisma";

export const GET_SCOUT = async (id: string) => {
  const scout = await db.scout.findUnique({
    where: {
      userId: id,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  return { scout };
};
