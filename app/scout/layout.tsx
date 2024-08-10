import { auth } from "@/auth";
import ScoutLayout from "./_components/scout-layout";
import { redirect } from "next/navigation";
import { GET_ADMIN } from "@/services/user.service";

export default async function DemoLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth()
    const { admin } = await GET_ADMIN()

    if (!session?.status || !admin) {
        redirect("/")
    }
    return (
        // <AppKnockProviders>
        <ScoutLayout status={session.status} adminId={admin.id}>{children}</ScoutLayout>
        // </AppKnockProviders>
    )
}
