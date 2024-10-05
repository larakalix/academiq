import { NextResponse } from "next/server";
import { hash } from "bcrypt";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Teacher } from "@prisma/client";

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
            return new NextResponse("Teacher id is required", {
                status: 400,
            });

        const teacher: Teacher | null = await prisma.teacher.findUnique({
            where: { id: params.id },
            include: {},
        });

        return NextResponse.json({
            message: "Teacher fetched successfully",
            data: teacher,
        });
    } catch (error) {
        console.log("[TEACHER_GET]", error);
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
            return new NextResponse("Teacher id is required", {
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

        const data = await prisma.teacher.delete({
            where: { id: params.id, schoolId: params.schoolId },
        });

        return NextResponse.json({
            message: "Parent deleted successfully",
            data,
        });
    } catch (error) {
        console.log("[TEACHER_DELETE]", error);
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

        const { name, email, password } = (await req.json()) as Teacher;

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
                {
                    value: params.id,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const hashedPassword = await hash(password, 10);

        const data = await prisma.teacher.update({
            where: { id: params.id },
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({
            message: "Teacher updated successfully",
            data,
        });
    } catch (error) {
        console.log("[PARENT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
