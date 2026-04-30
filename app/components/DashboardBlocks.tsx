import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { Currency, formatCurrency } from "../utils/format";

async function getData(userId: string) {
    const [data, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId,
            },
            select: {
                total: true,
                currency: true,
            },
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PENDING",
            },
            select: {
                id: true,
            },
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PAID",
            },
            select: {
                id: true,
            },
        }),
    ]);

    return {
        data,
        openInvoices,
        paidInvoices,
    };
}

export async function DashboardBlocks() {
    const session = await requireUser();
    const { data, openInvoices, paidInvoices } = await getData(
        session.user?.id as string,
    );
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        {formatCurrency(
                            data.reduce(
                                (acc, invoice) => acc + invoice.total,
                                0,
                            ),
                            "BRL" as Currency,
                        )}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Based on the last 30 days!
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">
                        Total Invoices Issued
                    </CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">{data.length}</h2>
                    <p className="text-xs text-muted-foreground">
                        Total invoices issued!
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">
                        Paid Invoices
                    </CardTitle>
                    <CreditCard className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        {paidInvoices.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Total invoices that have been paid!
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">
                        Open Invoices
                    </CardTitle>
                    <Activity className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        {openInvoices.length}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Invoices which havent been paid!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
