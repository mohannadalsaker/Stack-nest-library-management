import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleUserData } from "../types";
import { fetcher } from "@/api/fetcher";

export const useGetUser = (id: string) => {
  const query = useQuery<ApiResponse<SingleUserData>>({
    queryKey: ["user", id],
    queryFn: () => fetcher<ApiResponse<SingleUserData>>(`/users/${id}`),
    staleTime: 0,
    enabled: Boolean(id),
  });
  return query;
};
