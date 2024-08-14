import { redirect } from "next/navigation";

import { AppKnockProviders } from "@/providers/knock-provider";
import AdminPanelLayout from "./_components/admin-layout";
import { auth } from "@/auth";
import { FcmProvider } from "@/providers/fcm-provider";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()

  if (!session?.status || !session.userId) {
    redirect("/")
  }

  return (
    <FcmProvider id={session.userId}>
      <AppKnockProviders userId={session.userId}>
        <AdminPanelLayout>{children}</AdminPanelLayout>
      </AppKnockProviders>
    </FcmProvider>
  )
}