import React from "react";
import prisma from "@/lib/prisma";
import { MODULES } from "@/lib/constants";
import { ParentView } from "@/components/features/parent/view";
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
        ? await prisma.parent.findMany({
              where: { schoolId: params.schoolId },
              orderBy: { createdAt: "desc" },
          })
        : [];

    return (
        <>
            <ListHeader module={MODULES.PARENTS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.PARENTS} />
            ) : (
                <ParentView data={data} />
            )}
        </>
    );
}
