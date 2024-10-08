import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { ParentForm } from "@/components/features/parent/form";
import { MODULES } from "@/lib/constants";

export default async function Page({ params: { id } }: { params: PageParams }) {
    const schoolId = "1";
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.parent.findUnique({ where: { id, schoolId } });

    return (
        <>
            <ListHeader
                module={MODULES.PARENTS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <ParentForm initialData={data} />
        </>
    );
}
