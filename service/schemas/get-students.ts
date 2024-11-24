"use server";

import prisma from "@/lib/prisma";
import type { StudentColumn } from "@/components/features/student/columns";
import type { StudentByGrade } from "@/types/schemas/students";

export const getStudents = async (
    schoolId: string
): Promise<StudentColumn[]> => {
    try {
        const students = schoolId
            ? await prisma.student.findMany({
                  where: { schoolId },
                  include: { grade: true, parents: true },
                  orderBy: { createdAt: "desc" },
              })
            : [];

        const data = students.map((student) => ({
            ...student,
            grade: student.grade?.level ?? "",
            parents:
                student.parents?.length > 0
                    ? student.parents.map((parent) => parent.name).join(", ")
                    : "N/A",
        }));

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getStudentsByGrade = async (
    id: string,
    schoolId: string
): Promise<StudentByGrade | null> => {
    try {
        const data = await prisma.grade.findFirst({
            where: { id, schoolId },
            select: {
                id: true,
                level: true,
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        photo: true,
                        status: true,
                        studentStatus: true,
                        parents: true,
                    },
                },
            },
        });

        if (!data) return null;

        return {
            ...data,
            students: data?.students.map((student) => ({
                ...student,
                parents:
                    student.parents?.length > 0
                        ? student.parents
                              .map((parent) => parent.name)
                              .join(", ")
                        : "N/A",
            })),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
