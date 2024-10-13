"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { useGlobalStore } from "@/store/global.store";

export const SidebarHeader = () => {
    const { school } = useGlobalStore((state) => state);

    return (
        <header className="flex items-center gap-x-4">
            <SidebarTrigger className="bg-zinc-200 hover:bg-slate-900 hover:text-zinc-100" />

            <span className="text-base md:text-2xl font-semibold">
                {school?.name}
            </span>
        </header>
    );
};
