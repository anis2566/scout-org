"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
// import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { VERIFY_USER } from "../action"

// import { VERIFY_USER } from "../action"
// import { SIGN_IN_USER } from "@/app/auth/sign-in/action"

interface Props {
    id: string;
}

export const VerifyForm = ({ id }: Props) => {
    const [value, setValue] = useState<string>("")

    // const { update } = useSession()
    const router = useRouter()

    // const { mutate: signInUser, isPending: isLoading } = useMutation({
    //     mutationFn: SIGN_IN_USER,
    //     onSuccess: async (data) => {
    //         // if (data?.user) {
    //         //     await update({
    //         //         role: data?.user?.role,
    //         //         status: data?.user?.status,
    //         //         userId: data?.user?.id,
    //         //         isVerified: !!data?.user?.emailVerified
    //         //     })
    //         //     router.push("/")
    //         // }
    //     },
    // })

    const { mutate: verifyUser, isPending } = useMutation({
        mutationFn: VERIFY_USER,
        onSuccess: async (data) => {
            toast.success(data?.success, {
                id: "verify-user"
            })
            // if (data?.user && data?.user?.password) {
            //     await signInUser({ values: { email: data.user.email, password: data.user.password }, callback: null })
            // }
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "verify-user"
            })
        }
    })

    const handleComplete = () => {
        toast.loading("Verifing...", {
            id: "verify-user"
        })
        verifyUser({ id, code: value })
    }

    return (
        <div className="space-y-4">
            <h4 className="text-center  text-muted-foreground">An email has been sent to your inbox. Checkout and enter the verification code to confirm.</h4>
            <div className="space-y-2 mx-auto flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                    onComplete={handleComplete}
                    disabled={isPending}
                    autoFocus
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div>
    )
}