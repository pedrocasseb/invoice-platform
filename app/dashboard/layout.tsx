import Link from "next/link";
import { requireUser } from "../utils/hooks";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { DashboardLinks } from "../components/DashboardLinks";
import { HeaderActions } from "../components/HeadersActions";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

async function getUser(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
        },
    });

    if (!data?.firstName || !data.lastName || !data.address) {
        redirect("/onboarding");
    }
}

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await requireUser();
    const data = await getUser(session.user?.id as string);

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex flex-col max-h-screen h-full gap-2">
                    <div className="h-14 flex items-center border-b px-4 lg:h-15 lg:px-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={Logo} alt="Logo" className="size-7" />
                            <p className="text-2xl font-bold">Invoice</p>
                        </Link>
                    </div>

                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <DashboardLinks />
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-15 lg:px-6">
                    <HeaderActions />
                </header>

                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
