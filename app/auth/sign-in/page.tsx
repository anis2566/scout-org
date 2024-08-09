"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SignInForm } from "./_components/sign-in-form"
import { Suspense } from "react"
import { SocialLogin } from "@/components/social-login"

const SignIn = () => {
  return (
    <section className="container min-h-screen w-full flex items-center justify-center">
      <Card className="p-0 w-full max-w-xl">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-3">
            <div className="w-[100px] h-[100px] ring-4 ring-primary/80 rounded-full shadow-2xl shadow-primary aspect-square p-1 mx-auto">
              <img
                src="/logo.png"
                alt="logo"
                className="object-cover"
              />
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SignInForm />
          </Suspense>
          <div className="space-y-3">
            <div className="flex items-center gap-x-2">
              <div className="w-full h-[2px] flex-1 bg-primary" />
              <Badge>OR</Badge>
              <div className="w-full h-[2px] flex-1 bg-primary" />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <SocialLogin />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </section>

  )
}

export default SignIn
