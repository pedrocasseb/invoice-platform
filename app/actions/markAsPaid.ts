import { redirect } from "next/navigation";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";

export async function MarkAsPaidAction(invoiceId: string) {
    const session = await requireUser();

    const data = await prisma.invoice.update({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        },
        data: {
            status: "PAID",
        },
    });

    return redirect(`/dashboard/invoices`);
}
