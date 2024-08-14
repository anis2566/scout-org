"use client"

import { useEffect } from "react";

import { useFcmToken } from "@/hooks/use-fcm";
import { UPDATE_USER_FCM_TOKEN } from "@/services/fcm.service";

interface Props {
    children: React.ReactNode;
    id: string;
}

export const FcmProvider = ({ children, id }: Props) => {
    const { token } = useFcmToken()

    useEffect(() => {
        const updateUser = async () => {
            if (token) {
                await UPDATE_USER_FCM_TOKEN({ token });
            } else return
        }
        updateUser()
    }, [token])

    return (
        <div>{children}</div>
    )
}