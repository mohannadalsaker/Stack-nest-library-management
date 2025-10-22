import z from "zod";

export const SubCategoryFormSchema = z.object({
  name: z.string().min(1, "This field is required"),
  category: z.string().min(1, "This field is reuquired"),
});

export type SubCategoryFormInput = z.infer<typeof SubCategoryFormSchema>;
