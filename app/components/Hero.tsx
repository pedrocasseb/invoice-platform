import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
            <div className="text-center">
                <span className="text-sm text-primary font-medium tracking-tight bg-primary/5 py-2 px-4 rounded-full">
                    Introducing Paperless 1.0
                </span>
                <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
                    Invoicing made{" "}
                    <span className="block -mt-2 bg-linear-to-l from-[#c31432] to-[#240b36] text-transparent bg-clip-text">
                        super easy!
                    </span>
                </h1>
                <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
                    Creating Invoices can be a pain! We at Paperless make it
                    super easy for you to get paid in time
                </p>
                <div className="mt-7 mb-12">
                    <Link href="/login" className="z-10">
                        <Button>Get Unlimited Access</Button>
                    </Link>
                </div>
            </div>

            <div className="relative items-center w-full py-12 mx-auto mt-12">
                <svg
                    className="absolute inset-0 -mt-55 blur-3xl"
                    style={{ zIndex: -1 }}
                    viewBox="0 0 600 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <radialGradient
                            id="gradient1"
                            cx="50%"
                            cy="50%"
                            r="50%"
                        >
                            <stop offset="0%" stopColor="#c31432" />
                            <stop offset="50%" stopColor="#240b36" />
                            <stop offset="100%" stopColor="#c31432" />
                        </radialGradient>

                        <filter
                            id="blur"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="100%"
                        >
                            <feGaussianBlur stdDeviation="80" />
                        </filter>
                    </defs>

                    <circle
                        cx="300"
                        cy="300"
                        r="200"
                        fill="url(#gradient1)"
                        filter="url(#blur)"
                        opacity="0.7"
                    />
                </svg>
                {/* image */}
            </div>
        </section>
    );
}
