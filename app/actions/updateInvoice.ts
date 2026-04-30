"use server";

import { redirect } from "next/navigation";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { invoiceSchema } from "../utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { emailClient } from "../utils/mailtrap";
import { Currency, formatCurrency } from "../utils/format";

export async function updateInvoice(prevState: unknown, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id,
        },
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
        name: "Updated Invoice",
    };

    emailClient.send({
        from: sender,
        to: [{ email: "casseb.phcc@gmail.com" }],
        template_uuid: "2f103cbf-8cc0-43ba-a027-659cbd14b4c9",
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
            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
        },
    });

    return redirect("/dashboard/invoices");
}
