import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;
