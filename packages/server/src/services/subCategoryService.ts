import { SubCategory } from "../models/SubCategory";
import type {
  CreateSubCategoryInput,
  UpdateSubCategoryInput,
} from "../validators/subCategoryValidator";

export const findSubCategories = async ({
  categoryId,
  q,
  skip,
  limit,
}: {
  categoryId?: string;
  q?: string;
  skip: number;
  limit: number;
}) => {
  const filterQuery = q
    ? {
        name: { $regex: q, $options: "i" },
        ...(categoryId ? { category: categoryId } : {}),
      }
    : {};
  const [subCategories, total] = await Promise.all([
    SubCategory.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category"),
    SubCategory.countDocuments(filterQuery),
  ]);
  return {
    data: subCategories,
    total,
  };
};

export const findSubCategoryById = async (id: string) => {
  const subCategory = await SubCategory.findById(id).populate("category");
  if (!subCategory) throw new Error("Sub category not found");
  return subCategory;
};

export const createSubCategory = async (
  subCategoryInput: CreateSubCategoryInput
) => {
  const newSubCategory = new SubCategory(subCategoryInput);

  return await newSubCategory.save();
};

export const updateSubCategory = async ({
  id,
  subCategoryInput,
}: {
  id: string;
  subCategoryInput: UpdateSubCategoryInput;
}) => {
  await findSubCategoryById(id);
  const newSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    subCategoryInput,
    { new: true }
  ).populate("category");
  return newSubCategory;
};

export const deleteSubCategory = async (id: string) => {
  await findSubCategoryById(id);
  await SubCategory.findByIdAndDelete(id);
  return;
};
