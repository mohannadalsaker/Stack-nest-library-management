import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { CategoryData } from "../../types";
import { fetcher } from "@/api/fetcher";

export const useGetCategories = () => {
  const query = useQuery<
    ApiResponse<CategoryData[]>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["category-option"],
    queryFn: () => fetcher<ApiResponse<CategoryData[]>>(`/category`),
    select: (data) =>
      data.data.map((ele) => ({
        value: ele._id,
        label: ele.name,
      })),
  });
  return query;
};
