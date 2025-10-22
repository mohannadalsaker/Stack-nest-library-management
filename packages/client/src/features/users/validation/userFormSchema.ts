import z from "zod";

export const UserFormSchema = z.object({
  username: z.string().min(1, "This field is required"),
  email: z.email().min(1, "This field is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([]),
});

export type UserFormInput = z.infer<typeof UserFormSchema>;
