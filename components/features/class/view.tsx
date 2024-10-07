"use client";

import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import type { Class } from "@prisma/client";

export function ClassViewView({ data }: { data: Class[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} />
        </>
    );
}
