"use server";

import { signIn } from "../utils/auth";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        throw new Error("Email is required");
    }

    await signIn("nodemailer", {
        email,
        redirectTo: "/dashboard",
    });
}
