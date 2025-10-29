import { fetcher } from "@/api/fetcher";
import type { PaginatedApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SubCategoryData } from "../../types";

export const useGetSubCategoriesByCategory = (id: string) => {
  const query = useQuery<
    PaginatedApiResponse<SubCategoryData>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["subCategory-category-option", id],
    queryFn: () =>
      fetcher<PaginatedApiResponse<SubCategoryData>>(
        `/subCategory?categoryId=${id}`
      ),
    select: (data) =>
      data.data.data.map((ele) => ({
        value: ele._id,
        label: ele.name,
      })),
    enabled: Boolean(id),
  });
  return query;
};
