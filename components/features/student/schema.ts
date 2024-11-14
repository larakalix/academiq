import * as z from "zod";
import type { CustomFields } from "@prisma/client";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    genre: z.enum(["MALE", "FEMALE"]),
    pin: z.string().min(4),
    phone: z.string().min(10),
    password: z.string().min(6),
});

export type FormValues = z.infer<typeof formSchema>;

export const getStudentSchema = (customFields: CustomFields[]) => {
    const schema = formSchema.extend({
        customFields: z.object({}),
    });

    customFields.forEach((field) => {});

    return schema;
};
