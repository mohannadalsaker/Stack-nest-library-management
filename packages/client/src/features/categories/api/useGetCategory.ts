import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import type { SingleCategoryData } from "../types";
import type { ApiResponse } from "@/shared/types";

export const useGetCategory = (id: string) => {
  const query = useQuery<ApiResponse<SingleCategoryData>>({
    queryKey: ["category", id],
    queryFn: () => fetcher<ApiResponse<SingleCategoryData>>(`/category/${id}`),
    staleTime: 0,
    enabled: Boolean(id),
  });
  return query;
};
