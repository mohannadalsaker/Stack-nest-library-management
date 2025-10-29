import { fetcher } from "@/api/fetcher";
import type { PaginatedApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { ArchivingBooksData } from "../../types";

export const useGetArchivingBooks = () => {
  const query = useQuery<
    PaginatedApiResponse<ArchivingBooksData>,
    Error,
    ArchivingBooksData[]
  >({
    queryKey: ["archiving-books"],
    queryFn: () =>
      fetcher<PaginatedApiResponse<ArchivingBooksData>>(
        `/notification/archiving`
      ),
    staleTime: 0,
    select: (res) => res?.data?.data,
  });
  return query;
};
