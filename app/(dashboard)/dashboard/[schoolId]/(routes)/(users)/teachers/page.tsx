import React from "react";
import prisma from "@/lib/prisma";
import { MODULES } from "@/lib/constants";
import { TeacherView } from "@/components/features/teacher/view";
import { EmptyState } from "@/components/empty-state";
import { ListHeader } from "@/components/list-page-header/header";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = params.schoolId
        ? await prisma.teacher.findMany({
              where: { schoolId: params.schoolId },
              orderBy: { createdAt: "desc" },
          })
        : [];

    return (
        <>
            <ListHeader module={MODULES.TEACHERS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.TEACHERS} />
            ) : (
                <TeacherView data={data} />
            )}
        </>
    );
}