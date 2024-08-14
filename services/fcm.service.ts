"use server";

import { db } from "@/lib/prisma";
import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { GET_USER } from "./user.service";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("/fcm.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

type FcmNotification = {
  token: string;
  title: string;
  body: string;
  link?: string;
};
export const SEND_FCM_NOTIFICATION = async ({
  token,
  title,
  body,
  link,
}: FcmNotification) => {
  const payload: Message = {
    token,
    notification: {
      title: title,
      body,
    },
    webpush: link
      ? {
          fcmOptions: {
            link,
          },
        }
      : undefined,
  };

  try {
    await admin.messaging().send(payload);
    console.log("sent");
    return;
  } catch (error) {
    console.log(error);
  }
};

type UpdateUserFcm = {
  token: string;
};

export const UPDATE_USER_FCM_TOKEN = async ({ token }: UpdateUserFcm) => {
  const { user } = await GET_USER();
  if (user?.fcmToken && user?.fcmToken === token) return;

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      fcmToken: token,
    },
  });

  return { success: "token assigned" };
};
