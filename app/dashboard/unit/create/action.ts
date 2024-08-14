"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { UnitSchema, UnitSchemaType } from "../schema";
import { GET_USER } from "@/services/user.service";
import { SEND_FCM_NOTIFICATION } from "@/services/fcm.service";

export const CREATE_UNIT = async (values: UnitSchemaType) => {
  const { success, data } = UnitSchema.safeParse(values);

  if (!success) {
    throw new Error(`Invalid input value`);
  }

  const existingUnit = await db.unit.findFirst({
    where: {
      name: data.name,
      section: data.section,
    },
  });

  if (existingUnit) {
    throw new Error("Unit already exists");
  }

  await db.unit.create({
    data: {
      ...data,
    },
  });

  const { user } = await GET_USER();

  await SEND_FCM_NOTIFICATION({
    token: user.fcmToken ?? "",
    title: "New Unit created",
    body: "This is new Unit",
    link: "/dashboard/utils"
  });

  revalidatePath("/dashboard/unit");

  return {
    success: "Unit created",
  };
};
