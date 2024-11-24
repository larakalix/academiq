"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns, StudentColumn } from "./columns";

export function StudentView({ data }: { data: StudentColumn[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
