import { useGetCategories, useGetSubCategoriesByCategory } from "../api";
import { BookStatus } from "../types";

export const useBooksFilter = ({ category }: { category?: string }) => {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const { data: subCategories, isLoading: isLoadingSubCategories } =
    useGetSubCategoriesByCategory(category!);

  const statusOptions = [
    {
      label: "Available",
      value: BookStatus.available,
    },
    {
      label: "Archived",
      value: BookStatus.archived,
    },
  ];

  return {
    categories,
    subCategories,
    statusOptions,
    isLoadingCategories,
    isLoadingSubCategories,
  };
};
