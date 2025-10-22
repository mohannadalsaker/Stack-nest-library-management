import z from "zod";

export const BookFormSchema = z.object({});

export type BookFormInput = z.infer<typeof BookFormSchema>;
