import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { SUBJECTS } from "./../lib/constants";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await hash("demo00123", 10);

    await prisma.$transaction(async (tx) => {
        const school = await tx.school.create({
            data: {
                name: "Broward Plantation High School",
                address: "1234 NW 5th Ave, Plantation, FL 33317",
                email: "hello@bws.us",
                phone: "(954) 555-1234",
                logo: "",
                slug: "bphs",
                website: "https://bphs.us",
                userId: "",
            },
        });

        await tx.teacher.create({
            data: {
                name: "Mr. Larry Lenhardt",
                email: "lenhardt_larry@bws.us",
                role: "PRINCIPAL",
                password: hashedPassword,
                schoolId: school.id,
            },
        });
    });

    await prisma.$transaction(async (tx) => {
        const data = SUBJECTS.map((subject) => ({
            name: subject.name,
        }));

        await tx.subject.createMany({
            data,
        });
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
