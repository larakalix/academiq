import React from "react";
import Charts from "@/components/charts";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function Page() {
    return (
        <>
            <h1>Hello dashboard</h1>

            <DashboardHeader />

            <Charts />
        </>
    );
}
