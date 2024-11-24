import type { Grade, Student as PrismaStudent } from "@prisma/client";

export type Student = Pick<
    PrismaStudent,
    "id" | "status" | "studentStatus" | "name" | "email" | "phone" | "photo"
> & {
    parents: string;
};

export type StudentByGrade = Pick<Grade, "id" | "level"> & {
    students: Student[];
};
