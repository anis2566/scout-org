"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "./sidebar";
import { Pending } from "./pending";

interface Props {
    children: React.ReactNode,
    status: string;
}

export default function ScoutLayout({
    children,
    status
}: Props) {
    const sidebar = useSidebar(useSidebarToggle, (state) => state);
    const pathname = usePathname()
    const isNoLayout = pathname.includes("/scout/edit")

    if (!sidebar) return null;

    return (
        <>
            {
                !isNoLayout && (
                    <Sidebar status={status} />
                )
            }
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
                    isNoLayout ? "ml-0 max-w-6xl mx-auto" : sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64",
                )}
            >
                {
                    status === "Pending" ? <Pending /> : children
                }
            </main>
        </>
    );
}