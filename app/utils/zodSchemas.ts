import { z } from "zod";

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(5, "Address is required"),
});

export const invoiceSchema = z.object({
    invoiceName: z.string().min(2, "Invoice name is required"),
    total: z.number().min(1, "1$ is the minimum amount"),

    status: z.enum(["PAID", "PENDING"]).default("PENDING"),

    date: z.string().min(1, "Date is required"),
    dueDate: z.number().min(1, "Due date is required"),

    fromName: z.string().min(2, "Sender name is required"),
    fromEmail: z.string().email("Invalid email"),
    fromAddress: z.string().min(5, "Sender address is required"),

    clientName: z.string().min(2, "Client name is required"),
    clientEmail: z.string().email("Invalid email"),
    clientAddress: z.string().min(5, "Client address is required"),

    currency: z.string().min(1, "Currency is required"),
    invoiceNumber: z.number().min(1, "Invoice number is required"),

    note: z.string().optional(),

    invoiceItemDescription: z
        .string()
        .min(2, "Invoice item description is required"),
    invoiceItemQuantity: z.number().min(1, "Invoice item quantity is required"),
    invoiceItemRate: z.number().min(1, "Invoice item rate is required"),
});
