import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleBookData } from "../../types";
import { fetcher } from "@/api/fetcher";

export const useGetBook = (id: string) => {
  const query = useQuery<ApiResponse<SingleBookData>, Error, SingleBookData>({
    queryKey: ["book", id],
    queryFn: () => fetcher<ApiResponse<SingleBookData>>(`/books/${id}`),
    staleTime: 0,
    enabled: Boolean(id),
    select: (res) => res?.data,
  });
  return query;
};
