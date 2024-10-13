import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarLayout } from "@/components/ui/sidebar";
import { STATIC_ROUTES } from "@/lib/routeConfig";
import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { getAuthUser } from "@/service/get-auth.user";
import type { Session } from "next-auth";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        schoolId: string;
    };
}) {
    const { cookies } = await import("next/headers");
    const session = (await auth()) as Session | null;
    if (!session?.user) redirect(STATIC_ROUTES.signin);

    const authUser = session?.user.id
        ? await getAuthUser(session?.user.id)
        : null;

    console.log("session", session);

    return (
        <SidebarLayout
            defaultOpen={cookies().get("sidebar:state")?.value === "true"}
        >
            <AppSidebar
                schoolId={params.schoolId}
                user={session?.user}
                authUser={authUser}
            />
            <main className="flex flex-1 flex-col p-4 transition-all duration-300 ease-in-out">
                <div className="h-full rounded-md p-4">
                    <SidebarHeader />

                    <div className="flex flex-col gap-4 mt-4 max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarLayout>
    );
}
