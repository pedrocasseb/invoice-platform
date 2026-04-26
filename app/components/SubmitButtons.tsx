"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButtons() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled>
                    <Loader2 className="size-4 mr-2 animate-spin" /> Please
                    Wait...
                </Button>
            ) : (
                <Button type="submit">Submit</Button>
            )}
        </>
    );
}
