import { Category } from "../models/Category";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../validators/categoryValidator";

export const getCategories = async () => {
  const categories = await Category.find({});

  return categories;
};

export const findCategoryById = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  return category;
};

export const createCategory = async (categoryInput: CreateCategoryInput) => {
  const newCategory = new Category(categoryInput);
  return await newCategory.save();
};

export const updateCategory = async ({
  id,
  categoryInput,
}: {
  id: string;
  categoryInput: UpdateCategoryInput;
}) => {
  await findCategoryById(id);
  const newCategory = await Category.findByIdAndUpdate(id, categoryInput, {
    new: true,
  });
  return newCategory;
};

export const deleteCategory = async (id: string) => {
  await Category.findOneAndDelete({ _id: id });
  return;
};
