import z from "zod";

export const createSubCategorySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
});

export const updateSubCategorySchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
});

export type CreateSubCategoryInput = z.infer<typeof createSubCategorySchema>;
export type UpdateSubCategoryInput = z.infer<typeof updateSubCategorySchema>;
