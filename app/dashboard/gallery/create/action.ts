"use server";

import { db } from "@/lib/prisma";
import { GallerySchema, GallerySchemaType } from "./schema";

export const CREATE_GALLERY = async (values: GallerySchemaType) => {
  const { data, success } = GallerySchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const gallery = await db.gallery.findFirst({
    where: {
      title: data.title,
    },
  });

  if (gallery) {
    throw new Error("Gallery already exists");
  }

  await db.gallery.create({
    data: {
      ...data,
    },
  });

  return {
    success: "Gallery created",
  };
};
