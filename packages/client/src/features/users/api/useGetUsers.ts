import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import dayjs from "dayjs";
import type { UsersData, UsersTableRow } from "../types";
import type { PaginatedApiResponse } from "@/shared/types";

const LIMIT = 15;
export const useGetUsers = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    PaginatedApiResponse<UsersData>,
    Error,
    InfiniteData<{ users: UsersTableRow[]; total: number }>
  >({
    queryKey: ["user", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<PaginatedApiResponse<UsersData>>(
        `/users/search?q=${q}&skip=${skip}&limit=${LIMIT}`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          users: page.data.data.map((ele) => ({
            id: ele._id,
            name: ele.username,
            email: ele.email,
            role: ele.role,
            createdAt: dayjs(ele.createdAt).format("YYYY-MM-DD"),
            updatedAt: dayjs(ele.updatedAt).format("YYYY-MM-DD"),
          })),
          total: page.data.total,
        })),
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.length * LIMIT;
      return loadedItems < lastPage.data.total &&
        lastPage.data.data.length === LIMIT
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
  });
  return query;
};
