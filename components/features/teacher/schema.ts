import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.enum(["TEACHER", "TEACHER_ASSISTANT"]),
});

export type FormValues = z.infer<typeof formSchema>;
