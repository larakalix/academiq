import React from "react";
import { MODULES } from "@/lib/constants";
import { ListHeader } from "@/components/list-page-header/header";
import { getStudentsByGrade } from "@/service/schemas/get-students";
import { StudentCard } from "@/components/ui/custom/student/student-card";
import { School } from "lucide-react";
import { EmptyState } from "@/components/ui/custom/empty-state";

export default async function Page({
    params,
}: {
    params: {
        id: string;
        schoolId: string;
    };
}) {
    const grade = await getStudentsByGrade(params.id, params.schoolId);

    if (!grade) {
        return <p>Grade not found</p>;
    }

    return (
        <>
            <div className="space-y-2">
                <figure className="rounded-lg bg-primary inline-flex p-2 text-white">
                    <School size={18} />
                </figure>
                <ListHeader
                    module={MODULES.GRADES}
                    lastAction={`Students ${grade.level}`}
                />
            </div>

            {grade.students.length === 0 ? (
                <EmptyState
                    module={MODULES.STUDENTS}
                    customDescription="You haven't added students to this grade."
                    hideAction
                />
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
                    {grade.students.map((student) => (
                        <StudentCard key={student.id} student={student} />
                    ))}
                </section>
            )}
        </>
    );
}
