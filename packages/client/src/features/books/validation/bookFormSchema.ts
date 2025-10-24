import z from "zod";

export const fileSchema = z
  .any()
  .refine((file) => file instanceof File, {
    message: "Expected a file upload.",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be 5MB or less.",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "Only JPEG, PNG, or WEBP images are allowed.",
    }
  );
export const bookSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  coverImage: fileSchema.optional(),
  author: z.string().min(1),
  rating: z.string().optional(),
  isbn: z
    .string()
    .regex(/^\d{10}(\d{3})?$/, "Invalid ISBN")
    .optional(),
  category: z.string().min(1),
  subCategory: z.string().min(1),
  location: z.string().optional(),
  notes: z.string().optional(),
  availableQuantity: z.string(),
  totalQuantity: z.string(),
  isDeleteImage: z.enum(["0", "1"]).optional(),
});

export type BookInput = z.infer<typeof bookSchema>;
