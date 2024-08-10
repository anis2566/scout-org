// import { AppKnockProviders } from "../../providers/knock-provider";

import AdminPanelLayout from "./_components/admin-layout";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    // <AppKnockProviders>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    // </AppKnockProviders>
  )
}