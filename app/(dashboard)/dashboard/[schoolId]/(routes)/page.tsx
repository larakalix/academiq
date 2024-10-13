import React from "react";
import Charts from "@/components/charts";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getDashboardCounts } from "@/service/dashboard-metrics";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const [teachers, students, announcements, events] =
        await getDashboardCounts(params.schoolId);

    return (
        <>
            <h1>Hello dashboard</h1>

            <DashboardHeader
                teachers={teachers}
                students={students}
                announcements={announcements}
                events={events}
            />

            <Charts />
        </>
    );
}
