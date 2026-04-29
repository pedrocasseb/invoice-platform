"use server";

import { parseWithZod } from "@conform-to/zod";
import { requireUser } from "../utils/hooks";
import { invoiceSchema } from "../utils/zodSchemas";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

export async function createInvoice(prevState: unknown, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const date = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceNumber: submission.value.invoiceNumber,
            invoiceName: submission.value.invoiceName,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,
        },
    });

    return redirect("/dashboard/invoices");
}
