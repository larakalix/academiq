import { NextResponse } from "next/server";
import { hash } from "bcrypt";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Student } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENV = process.env.NEXT_ENV || "development";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const session = await auth();
        // if (!session?.user)
        //     return new NextResponse("Unauthenticated", { status: 403 });

        if (!params.id)
            return new NextResponse("Student id is required", {
                status: 400,
            });

        const student: Student | null = await prisma.student.findUnique({
            where: { id: params.id },
            include: {},
        });

        return NextResponse.json({
            message: "Student fetched successfully",
            data: student,
        });
    } catch (error) {
        console.log("[STUDENT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string; schoolId: string } }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        if (!params.id)
            return new NextResponse("Student id is required", {
                status: 400,
            });

        const schoolByUserId = await prisma.school.findFirst({
            where: {
                id: params.id,
                userId: session?.user.id,
            },
        });

        if (!schoolByUserId)
            return new NextResponse("Unauthorized", { status: 405 });

        const data = await prisma.student.delete({
            where: { id: params.id, schoolId: params.schoolId },
        });

        return NextResponse.json({
            message: "Student deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[STUDENT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string; schoolId: string } }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { name, email, genre, pin, phone, password } =
            (await req.json()) as Student;

        await genericValidator({
            session,
            schoolId: params.schoolId,
            data: [
                { value: name, message: "Name is required", status: 400 },
                { value: email, message: "Email is required", status: 400 },
                {
                    value: password,
                    message: "Password is required",
                    status: 400,
                },
                { value: genre, message: "Genre is required", status: 400 },
                {
                    value: params.schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const hashedPassword = await hash(password, 10);

        const data = await prisma.student.update({
            where: { id: params.id },
            data: { name, email, genre, pin, phone, password: hashedPassword },
        });

        return NextResponse.json({
            message: "Student updated successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
