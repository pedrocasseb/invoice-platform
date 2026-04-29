import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
    return (
        <div className="flex items-center justify-between py-5 ">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src={Logo}
                    alt="Hero Image"
                    className="size-10 shadow-xl rounded-md"
                />
                <h3 className="text-xl font-semibold">Paperless</h3>
            </Link>
            <Link href="/login" className={buttonVariants()}>
                Get Started
            </Link>
        </div>
    );
}
