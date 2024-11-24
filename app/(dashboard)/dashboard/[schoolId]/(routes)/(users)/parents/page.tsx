import React from "react";
import { MODULES } from "@/lib/constants";
import { ParentView } from "@/components/features/parent/view";
import { EmptyState } from "@/components/ui/custom/empty-state";
import { ListHeader } from "@/components/list-page-header/header";
import { getParents } from "@/service/schemas/get-parents";

export default async function Page({
    params,
}: {
    params: {
        schoolId: string;
    };
}) {
    const data = await getParents(params.schoolId);

    return (
        <>
            <ListHeader module={MODULES.PARENTS} />

            {data.length === 0 ? (
                <EmptyState module={MODULES.PARENTS} />
            ) : (
                <ParentView data={data} schoolId={params.schoolId} />
            )}
        </>
    );
}
