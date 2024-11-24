import React from "react";
import prisma from "@/lib/prisma";
import { MODULES } from "@/lib/constants";
import { GradesView } from "@/components/features/grade/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = params.schoolId
        ? await prisma.grade.findMany({
              where: { schoolId: params.schoolId },
              orderBy: { level: "asc" },
          })
        : [];

    return (
        <>
            <ListHeader module={MODULES.GRADES} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.GRADES} />
            ) : (
                <GradesView data={data} schoolId={params.schoolId} />
            )}
        </>
    );
}
