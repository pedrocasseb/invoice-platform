import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
    return (
        <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
                <Ban className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">
                Please Create a Invoice
            </h2>
            <p>
                Hey you havent created any invoice yet. Please create one to get
                started.
            </p>
            <Link
                href="/dashboard/invoices/create"
                className={buttonVariants() + " mt-4"}
            >
                <PlusCircle className="size-4 mr-2" />
                Create Invoice
            </Link>
        </div>
    );
}
