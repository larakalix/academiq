import { PrismaClient } from "@prisma/client";

const statusGlobalFilter = ["Teacher", "Student", "Parent", "Announcement"];

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

prisma.$extends({
    query: {
        $allModels: {
            async findMany({ model, args, query }) {
                if (statusGlobalFilter.includes(model)) {
                    if (!args) args = {};
                    if (!args.where) args.where = {};

                    args.where.AND = [{ status: "ACTIVE" }];
                }

                return query(args);
            },
        },
    },
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
