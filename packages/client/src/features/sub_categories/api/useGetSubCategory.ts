import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleSubCategoryData } from "../types";
import { fetcher } from "@/api/fetcher";

export const useGetSubCategory = (id: string) => {
  const query = useQuery<ApiResponse<SingleSubCategoryData>>({
    queryKey: ["subCategory", id],
    queryFn: () =>
      fetcher<ApiResponse<SingleSubCategoryData>>(`/subCategory/${id}`),
    staleTime: 0,
    enabled: Boolean(id),
  });
  return query;
};
