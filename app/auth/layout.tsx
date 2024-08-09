import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { SocialLogin } from "./_components/social-login";
import { Loader } from "@/components/loader";

interface Props {
    children: React.ReactNode;
}

const AuthLayout = ({children}:Props) => {
    return (
        <section className="container min-h-screen w-full flex items-center justify-center py-4">
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
                {children}
                <div className="space-y-3">
                    <div className="flex items-center gap-x-2">
                    <div className="w-full h-[2px] flex-1 bg-primary" />
                    <Badge>OR</Badge>
                    <div className="w-full h-[2px] flex-1 bg-primary" />
                    </div>
                    <Suspense fallback={<Loader />}>
                        <SocialLogin />
                    </Suspense>
                </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default AuthLayout