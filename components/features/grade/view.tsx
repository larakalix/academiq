"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns, type GradeColumn } from "./columns";

export function GradesView({ data }: { data: GradeColumn[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
