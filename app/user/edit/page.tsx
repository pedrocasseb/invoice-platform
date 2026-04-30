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

export default function EditUserRoute({ initialData }: { initialData: any }) {
    const [lastResult, action] = useActionState(updateUser, undefined);

    const [form, fields] = useForm({
        lastResult,
        defaultValue: {
            firstName: initialData?.firstName ?? "",
            lastName: initialData?.lastName ?? "",
            address: initialData?.address ?? "",
        },
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onboardingSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"></div>
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
                                    defaultValue={
                                        fields.firstName.initialValue as string
                                    }
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
                                    defaultValue={
                                        fields.lastName.initialValue as string
                                    }
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
                                defaultValue={
                                    fields.address.initialValue as string
                                }
                            />
                            <p className="text-red-500 text-xs">
                                {fields.address.errors}
                            </p>
                        </div>
                        <SubmitButtons text="Save Changes" />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
