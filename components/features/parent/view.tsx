"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import type { Parent } from "@prisma/client";

export function ParentView({ data }: { data: Parent[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
