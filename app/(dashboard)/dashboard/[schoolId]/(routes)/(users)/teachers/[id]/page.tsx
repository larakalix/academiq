import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { TeacherForm } from "@/components/features/teacher/form";
import { MODULES } from "@/lib/constants";

export default async function Page({ params: { id } }: { params: PageParams }) {
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.teacher.findUnique({ where: { id } });

    return (
        <>
            <ListHeader
                module={MODULES.TEACHERS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <TeacherForm initialData={data} />
        </>
    );
}
