import z from "zod";
import { UserRoles } from "../types/userTypes";

export const createUserSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.email().min(1, "email is required"),
  password: z.string().min(8),
  role: z.enum(UserRoles),
});

export const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.email().optional(),
  role: z.enum(UserRoles),
});

export const loginSchema = z.object({
  email: z.email().min(1, "email is required"),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
