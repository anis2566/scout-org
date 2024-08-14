import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgbT9ssmMr42fxjC6Js86r4Y2f8OwBj4M",
  authDomain: "apbn-ea8cc.firebaseapp.com",
  projectId: "apbn-ea8cc",
  storageBucket: "apbn-ea8cc.appspot.com",
  messagingSenderId: "903448418334",
  appId: "1:903448418334:web:bbdcb67f74055a8a65b60f",
  measurementId: "G-RRDWT42H9W",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
