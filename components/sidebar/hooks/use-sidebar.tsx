import {
    Atom,
    Eclipse,
    LifeBuoy,
    Rabbit,
    Send,
    Settings2,
    Calendar,
    GraduationCap,
    School,
} from "lucide-react";
import { SidebarItems, SidebarProjectItems } from "../types/types";

export const useSidebar = ({ schoolId }: { schoolId: string }) => {
    const defaultRoute = `/dashboard/${schoolId}`;

    const NAV_MAIN_ITEMS: SidebarItems[] = [
        {
            title: "Users",
            url: "#",
            icon: GraduationCap,
            isActive: true,
            items: [
                {
                    title: "Students",
                    url: `${defaultRoute}/students`,
                },
                {
                    title: "Parents",
                    url: `${defaultRoute}/parents`,
                },
                {
                    title: "Teachers",
                    url: `${defaultRoute}/teachers`,
                },
            ],
        },
        {
            title: "Academics",
            url: "#",
            icon: School,
            items: [
                {
                    title: "Classes",
                    url: `${defaultRoute}/classes`,
                },
                {
                    title: "Lessons",
                    url: `${defaultRoute}/teachers`,
                },
                {
                    title: "Exams",
                    url: `${defaultRoute}/exams`,
                },
                {
                    title: "Assignments",
                    url: `${defaultRoute}/assignments`,
                },
                {
                    title: "Results",
                    url: `${defaultRoute}/results`,
                },
                {
                    title: "Attendance",
                    url: `${defaultRoute}/attendance`,
                },
            ],
        },
        {
            title: "Communication",
            url: "#",
            icon: Calendar,
            items: [
                {
                    title: "Events",
                    url: `${defaultRoute}/events`,
                },
                {
                    title: "Announcements",
                    url: `${defaultRoute}/announcements`,
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: `${defaultRoute}/settings`,
                },
                {
                    title: "Team",
                    url: `${defaultRoute}/team`,
                },
                {
                    title: "Billing",
                    url: `${defaultRoute}/billing`,
                },
                {
                    title: "Security",
                    url: `${defaultRoute}/security`,
                },
                {
                    title: "Integrations",
                    url: `${defaultRoute}/integrations`,
                },
            ],
        },
    ];

    const NAV_QUICK_ACTIONS_ITEMS: SidebarProjectItems[] = [
        {
            name: "Add Student",
            url: `${defaultRoute}/students/new`,
        },
        {
            name: "Add Teacher",
            url: `${defaultRoute}/teachers/new`,
        },
        {
            name: "Transfer Student",
            url: `${defaultRoute}/students/new`,
        },
    ];

    const data = {
        teams: [
            {
                name: "Broward Plantation",
                logo: Atom,
                plan: "Enterprise",
            },
            {
                name: "Broward Fort Lauderdale",
                logo: Eclipse,
                plan: "Startup",
            },
            {
                name: "Broward Oakland Park",
                logo: Rabbit,
                plan: "Free",
            },
        ],
        user: {
            name: "Ivan Lara",
            email: "ivanlara@booqself.com",
            avatar: "https://avatars.githubusercontent.com/u/69819367?v=4",
        },
        navMain: NAV_MAIN_ITEMS,
        navSecondary: [
            {
                title: "Support",
                url: "#",
                icon: LifeBuoy,
            },
            {
                title: "Feedback",
                url: "#",
                icon: Send,
            },
        ],
        projects: NAV_QUICK_ACTIONS_ITEMS,
        searchResults: [
            {
                title: "Routing Fundamentals",
                teaser: "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
                url: "#",
            },
            {
                title: "Layouts and Templates",
                teaser: "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
                url: "#",
            },
            {
                title: "Data Fetching, Caching, and Revalidating",
                teaser: "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
                url: "#",
            },
            {
                title: "Server and Client Composition Patterns",
                teaser: "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
                url: "#",
            },
            {
                title: "Server Actions and Mutations",
                teaser: "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
                url: "#",
            },
        ],
    };

    return { data };
};
