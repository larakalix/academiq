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
import type { AuthTeacher } from "@/types/service";
import { useGlobalStore } from "@/store/global.store";
import { useEffect } from "react";

type Props = {
    user: SessionUser;
    authUser: AuthTeacher;
    schoolId: string;
};

export function AppSidebar({ user, authUser, schoolId }: Props) {
    const { data, ...state } = useSidebar({ schoolId });

    useEffect(() => {
        const school = authUser?.schools.find(
            (school) => school.id === schoolId
        );

        useGlobalStore.setState({ user: authUser, schoolId, school });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Sidebar>
            <SidebarHeader>
                <TeamSwitcher
                    teams={data.teams}
                    user={state.user}
                    schoolId={schoolId}
                />
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
