import React from "react";
import prisma from "@/lib/prisma";
import { ListHeader } from "@/components/list-page-header/header";
import { StudentForm } from "@/components/features/student/form";
import { getCustomFields } from "@/service/schemas/get-custom-fields";
import { MODULES } from "@/lib/constants";
import { getGradesCatalogue } from "@/service/catalogues/get-grades-catalogue";

export default async function Page({
    params: { id, schoolId },
}: {
    params: PageParams;
}) {
    const IS_NEW = id === "new";
    const data = IS_NEW
        ? null
        : await prisma.student.findUnique({ where: { id, schoolId } });

    const [customFields, grades] = await Promise.all([
        getCustomFields(schoolId, "student"),
        getGradesCatalogue(schoolId),
    ]);

    return (
        <>
            <ListHeader
                module={MODULES.STUDENTS}
                lastAction={IS_NEW ? "create" : "edit"}
            />

            <StudentForm initialData={data} customFields={customFields} grades={grades} />
        </>
    );
}
