"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import type { Student } from "@prisma/client";

export function StudentView({ data }: { data: Student[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
