import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SubCategoryData } from "../../types";
import { fetcher } from "@/api/fetcher";

export const useGetSubCategoriesByCategory = (id: string) => {
  const query = useQuery<
    ApiResponse<SubCategoryData[]>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["subCategory-category-option", id],
    queryFn: () =>
      fetcher<ApiResponse<SubCategoryData[]>>(`/subCategory?categoryId=${id}`),
    select: (data) =>
      data.data.map((ele) => ({
        value: ele._id,
        label: ele.name,
      })),
    enabled: Boolean(id),
  });
  return query;
};
