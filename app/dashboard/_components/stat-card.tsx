import { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BigCardProps {
    title: string;
    icon: LucideIcon;
    value: number;
}

export const StatCard = ({ title, icon: Icon, value }: BigCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}