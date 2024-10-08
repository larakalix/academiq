import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    genre: z.enum(["MALE", "FEMALE"]),
});

export type FormValues = z.infer<typeof formSchema>;
