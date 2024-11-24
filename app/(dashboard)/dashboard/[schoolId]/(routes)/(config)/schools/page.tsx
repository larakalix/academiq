import { SchoolForm } from '@/components/features/school/form';
import { ListHeader } from '@/components/list-page-header/header';
import { MODULES } from '@/lib/constants';
import prisma from '@/lib/prisma';
import React from 'react'

export default async function page({ params: { schoolId } }: { params: PageParams }) {
    const data = await prisma.school.findUnique({
        where: { id: schoolId },
    });

    return (
        <>
            <ListHeader
                module={MODULES.SCHOOL}
                lastAction="edit"
            />
            <SchoolForm initialData={data} schoolId={schoolId} />
        </>
    )
}
