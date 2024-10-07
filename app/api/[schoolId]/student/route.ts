import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { genericValidator } from "@/lib/api/generic_validator";
import type { Student } from "@prisma/client";

export async function POST(
    req: Request,
    { params: { schoolId } }: { params: { schoolId: string } }
) {
    try {
        const session = await auth();
        if (!session?.user)
            return new NextResponse("Unauthenticated", { status: 403 });

        const { name, email, genre, pin, phone, password } =
            (await req.json()) as Student;

        await genericValidator({
            session,
            schoolId,
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
                    value: schoolId,
                    message: "School Id is required",
                    status: 400,
                },
            ],
        });

        const hashedPassword = await hash(password, 10);
        const data: Student = await prisma.student.create({
            data: {
                name,
                email,
                genre,
                pin,
                phone,
                password: hashedPassword,
                schoolId,
                // categories: {
                //     connect: categories.map((id: string) => ({ id })),
                // },
                // colors: {
                //     connect: colors.map((id: string) => ({ id })),
                // },
                // sizes: {
                //     connect: sizes.map((id: string) => ({ id })),
                // },
            },
            // include: {
            //     categories: true,
            //     colors: true,
            //     sizes: true,
            // },
        });

        return NextResponse.json({
            message: "Teacher created successfully",
            data,
        });
    } catch (error) {
        console.log("[STUDENT_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
