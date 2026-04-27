// app/components/HeaderActions.tsx
"use client";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DashboardLinks } from "./DashboardLinks";
import { logout } from "../actions/logout";

export function HeaderActions() {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden" size="icon">
                        <Menu className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetTitle></SheetTitle>
                    <nav className="grid gap-2 mt-10 p-4">
                        <DashboardLinks />
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="flex items-center ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="rounded-full"
                            variant="outline"
                            size="icon"
                        >
                            <User2 />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel> My Account </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/invoices">Invoices</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <form action={logout} className="w-full">
                                <button
                                    type="submit"
                                    className="w-full text-left"
                                >
                                    Log Out
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}
