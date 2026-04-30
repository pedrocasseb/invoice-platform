import { redirect } from "next/navigation";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";

export async function DeleteInvoice(invoiceId: string) {
    const session = await requireUser();

    const data = await prisma.invoice.delete({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
    });

    return redirect("/dashboard/invoices");
}
