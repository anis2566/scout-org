import Link from "next/link";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { ContentLayout } from "../_components/content-layout";
import { Header } from "./_components/header";
import { EventList } from "./_components/event-list";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "APBn Scouts | Event List",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Events = async ({ searchParams }: Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const events = await db.event.findMany({
        where: {
            ...(search && { title: { contains: search, mode: "insensitive" } })
        },
        // include: {
        //     applications: {
        //         where: {
        //             status: MigrationStatus.Approved
        //         },
        //         select: {
        //             id: true
        //         }
        //     }
        // },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalEvent = await db.event.count({
        where: {
            ...(search && { title: { contains: search, mode: "insensitive" } })
        }
    })

    const totalPage = Math.ceil(totalEvent / itemsPerPage)

    return (
        <ContentLayout title="Event">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Event List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Event List</CardTitle>
                    <CardDescription>A collection of event.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <EventList events={events} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Events