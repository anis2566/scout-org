import { Unit } from "@prisma/client"
import { EllipsisVertical, Eye, Pen } from "lucide-react"
import Link from "next/link"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { Empty } from "@/components/empty"

interface UnitWithScout extends Unit {
    scouts: { id: string; }[]
}

interface UnitListProps {
    units: Unit[];
}

export const UnitList = ({ units }: UnitListProps) => {
    return (
        <>
            {
                units.length < 1 ? (
                    <Empty title="No Unit found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Limit</TableHead>
                                <TableHead>Members</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                units.map(unit => (
                                    <TableRow key={unit.id}>
                                        <TableCell className="py-3">{unit.name}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge>{unit.section}</Badge>
                                        </TableCell>
                                        <TableCell className="py-3">{unit.limit}</TableCell>
                                        <TableCell className="py-3">{5}</TableCell>
                                        <TableCell className="py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/unit/${unit.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-4 h-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/unit/edit/${unit.id}`} className="flex items-center gap-x-3">
                                                            <Pen className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="w-flex items-center gap-x-3" asChild>
                                                        {/* <ActionButton unitId={unit.id} /> */}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                )
            }
        </>
    )
}