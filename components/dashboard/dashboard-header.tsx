"use client";

import React from "react";
import { useGlobalStore } from "@/store/global.store";

export const DashboardHeader = () => {
    const state = useGlobalStore((state) => state);

    return (
        <>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </>
    );
};
