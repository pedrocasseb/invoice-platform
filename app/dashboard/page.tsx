import { Button } from "@/components/ui/button";
import { requireUser } from "../utils/hooks";
import { signOut } from "../utils/auth";

export default async function DashboardRoute() {
    const session = await requireUser();
    return (
        <div>
            <h1>hello from dashboard router</h1>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    );
}
