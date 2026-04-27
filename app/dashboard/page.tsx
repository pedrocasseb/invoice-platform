import { requireUser } from "../utils/hooks";
import { logout } from "../actions/logout";

export default async function DashboardRoute() {
    const session = await requireUser();
    return (
        <div>
            <h1>hello from dashboard router</h1>
            <form action={logout} className="w-full">
                <button type="submit" className="w-full text-left">
                    Log Out
                </button>
            </form>
        </div>
    );
}
