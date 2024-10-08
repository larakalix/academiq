import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const session = await auth();
    // if (!session?.user) redirect("/sign-in");

    const school = await prisma.school.findFirst({
        where: {
            id: "cm1vp6nir0001we36gxpcc8ad",
            // userId: session?.user?.id,
        },
    });

    if (school) return redirect(`/dashboard/${school.id}`);

    return <>{children}</>;
}
