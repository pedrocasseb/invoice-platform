import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import EditUserForm from "@/app/components/EditUserForm";

export default async function Page() {
    const session = await requireUser();

    const data = await prisma.user.findUnique({
        where: {
            id: session.user?.id,
        },
    });

    if (!data) {
        throw new Error("User not found");
    }

    return <EditUserForm data={data} />;
}
