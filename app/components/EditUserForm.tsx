"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/app/actions/updateUser";
import { onboardingSchema } from "@/app/utils/zodSchemas";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface iAppProps {
    data: Prisma.UserGetPayload<{}>;
}

export default function EditUserForm({ data }: iAppProps) {
    const [lastResult, action] = useActionState(updateUser, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onboardingSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-sm w-full">
                <CardHeader>
                    <CardTitle>Edit Account</CardTitle>
                    <CardDescription>
                        Update your personal information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={action}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        noValidate
                        className="grid gap-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={data.firstName ?? ""}
                                />
                                <p className="text-red-500 text-xs">
                                    {fields.firstName.errors}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={data.lastName ?? ""}
                                />
                                <p className="text-red-500 text-xs">
                                    {fields.lastName.errors}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={data.address ?? ""}
                            />
                            <p className="text-red-500 text-xs">
                                {fields.address.errors}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <Link
                                href="/dashboard"
                                className={buttonVariants({
                                    variant: "outline",
                                })}
                            >
                                Back
                            </Link>
                            <SubmitButtons text="Save Changes" />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
