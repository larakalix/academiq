import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { STATIC_ROUTES } from "@/lib/routeConfig";

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
    const session = await auth();
    if (!session?.user) redirect(STATIC_ROUTES.signin);

    console.log("session", session);

    return (
        <SidebarLayout
            defaultOpen={cookies().get("sidebar:state")?.value === "true"}
        >
            <AppSidebar schoolId={params.schoolId} user={session.user} />
            <main className="flex flex-1 flex-col p-4 transition-all duration-300 ease-in-out">
                <div className="h-full rounded-md p-4">
                    <SidebarTrigger className="bg-zinc-200 hover:bg-slate-900 hover:text-zinc-100" />

                    <div className="flex flex-col gap-4 mt-4">{children}</div>
                </div>
            </main>
        </SidebarLayout>
    );
}
