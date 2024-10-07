import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string(),
    address: z.string().optional(),
    password: z.string().min(8).max(100),
});

export type FormValues = z.infer<typeof formSchema>;
