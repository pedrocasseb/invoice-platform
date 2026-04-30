"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface iAppProps {
    text: string;
    variant?:
        | "link"
        | "default"
        | "outline"
        | "secondary"
        | "ghost"
        | "destructive"
        | null
        | undefined;
}

export function SubmitButtons({ text, variant }: iAppProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled variant={variant}>
                    <Loader2 className="size-4 mr-2 animate-spin" /> Please
                    Wait...
                </Button>
            ) : (
                <Button type="submit" variant={variant}>
                    {text}
                </Button>
            )}
        </>
    );
}
