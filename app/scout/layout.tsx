import { auth } from "@/auth";
import ScoutLayout from "./_components/scout-layout";
import { redirect } from "next/navigation";

export default async function DemoLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth()
    if (!session?.status) {
        redirect("/")
    }
    return (
        // <AppKnockProviders>
        <ScoutLayout status={session.status}>{children}</ScoutLayout>
        // </AppKnockProviders>
    )
}
