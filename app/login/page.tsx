import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "../utils/auth";
import { SubmitButtons } from "../components/SubmitButtons";
import { redirect } from "next/navigation";
import { login } from "../actions/login";

export default async function Login() {
    const session = await auth();
    if (session?.user) redirect("/dashboard");
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="max-w-sm w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Login
                        </CardTitle>
                        <CardDescription>
                            Enter your email below to log in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-y-4" action={login}>
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="hello@hello.com"
                                />
                            </div>

                            <SubmitButtons text="Login" />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
