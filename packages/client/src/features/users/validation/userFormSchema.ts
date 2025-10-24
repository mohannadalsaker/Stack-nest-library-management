import { UserRoles } from "@/shared/types";
import z from "zod";

export const UserFormSchema = z.object({
  username: z.string().min(1, "This field is required"),
  email: z.email().min(1, "This field is required"),
  password: z.string().optional(),
  role: z.enum(UserRoles),
});

export type UserFormInput = z.infer<typeof UserFormSchema>;
