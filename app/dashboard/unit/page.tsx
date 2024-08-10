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

import { ContentLayout } from "../_components/content-layout";
import { Section } from "@prisma/client";
import { db } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "APBn Scouts | Units",
  description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        section: Section;
        page: string;
        perPage: string;
        search: string;
    }
};


const Units = async ({ searchParams }: Props) => {
     const { section, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const units = await db.unit.findMany({
        where: {
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        },
        // include: {
        //     // scouts: {
        //     //     select: {
        //     //         id: true
        //     //     }
        //     // }
        // },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalUnit = await db.unit.count({
        where: {
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        }
    })

    const totalPage = Math.round(totalUnit / itemsPerPage)

    return (
        <ContentLayout title="Unit">
            <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Units</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* <UnitForm /> */}
        </ContentLayout>
    )
}

export default Units