import React from "react";
import prisma from "@/lib/prisma";
import { MODULES } from "@/lib/constants";
import { ClassView } from "@/components/features/class/view";
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
        ? await prisma.class.findMany({
              where: { schoolId: params.schoolId },
              orderBy: { createdAt: "desc" },
          })
        : [];

    return (
        <>
            <ListHeader module={MODULES.CLASSES} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.CLASSES} />
            ) : (
                <ClassView data={data} />
            )}
        </>
    );
}
