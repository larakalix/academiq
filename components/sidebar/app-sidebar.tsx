"use client";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
} from "@/components/ui/sidebar";
import { useSidebar } from "./hooks/use-sidebar";

type Props = {
    user: SessionUser;
    schoolId: string;
};

export function AppSidebar({ user, schoolId }: Props) {
    const { data } = useSidebar({ schoolId });

    return (
        <Sidebar>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarItem>
                    <SidebarLabel>Platform</SidebarLabel>
                    <NavMain
                        items={data.navMain}
                        searchResults={data.searchResults}
                    />
                </SidebarItem>
                <SidebarItem>
                    <SidebarLabel>Quick Actions</SidebarLabel>
                    <NavProjects projects={data.projects} />
                </SidebarItem>
                <SidebarItem className="mt-auto">
                    <SidebarLabel>Help</SidebarLabel>
                    <NavSecondary items={data.navSecondary} />
                </SidebarItem>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} links={data.user.links} />
            </SidebarFooter>
        </Sidebar>
    );
}
