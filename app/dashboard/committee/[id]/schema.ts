import { Designation } from "@prisma/client";
import { z } from "zod";

export const CommitteeMemberSchema = z.object({
  committeeId: z.string().min(1, { message: "required" }),
  name: z.string().min(1, { message: "required" }),
  designation: z
    .nativeEnum(Designation)
    .refine((val) => Object.values(Designation).includes(val), {
      message: "required",
    }),
  imageUrl: z.string().min(1, { message: "required" }),
});

export type CommitteeMemberSchemaType = z.infer<typeof CommitteeMemberSchema>;
