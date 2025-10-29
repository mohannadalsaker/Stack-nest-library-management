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

export const createBookSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  author: z.string().min(1),
  rating: z.number().optional(),
  isbn: z
    .string()
    .regex(/^\d{10}(\d{3})?$/, "Invalid ISBN")
    .optional(),
  category: z.string().min(1),
  subCategory: z.string().min(1),
  location: z.string().optional(),
  notes: z.string().optional(),
  availableQuantity: z.number(),
  totalQuantity: z.number(),
});

export const updateBookSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    author: z.string().optional(),
    rating: z.number().optional(),
    isbn: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    location: z.string().optional(),
    notes: z.string().optional(),
    availableQuantity: z.number().optional(),
    totalQuantity: z.number().optional(),
    isDeleteImage: z.enum(["0", "1"]),
  })
  .superRefine((data, ctx) => {
    if (data.category && !data.subCategory) {
      ctx.addIssue({
        path: ["subCategory"],
        code: "custom",
        message: "subCategory is required when category is updated.",
      });
    }
  });

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
