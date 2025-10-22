import z from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(1, "This field is required"),
});

export type CategoryFormInput = z.infer<typeof CategoryFormSchema>;
