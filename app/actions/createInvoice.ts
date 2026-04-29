"use server";

import { parseWithZod } from "@conform-to/zod";
import { requireUser } from "../utils/hooks";
import { invoiceSchema } from "../utils/zodSchemas";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "../utils/mailtrap";
import { Currency, formatCurrency } from "../utils/format";

export async function createInvoice(prevState: unknown, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
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

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Invoice Next",
    };

    emailClient.send({
        from: sender,
        to: [{ email: "casseb.phcc@gmail.com" }],
        template_uuid: "ecddc434-8675-4f66-93a3-06d64fd60fbf",
        template_variables: {
            ClientName: submission.value.clientName,
            InvoiceNumber: submission.value.invoiceNumber,
            DueDate: new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            TotalAmount: formatCurrency(
                submission.value.total,
                submission.value.currency as Currency,
            ),
            invoiceLink: "test invoice link",
        },
    });

    return redirect("/dashboard/invoices");
}
