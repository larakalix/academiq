import type { LucideIcon } from "lucide-react";

export type SidebarProjectItems = {
    name: string;
    url: string;
};

export type SidebarItems = {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
};
