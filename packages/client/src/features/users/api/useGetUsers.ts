import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import dayjs from "dayjs";
import type { UsersData, UsersTableRow } from "../types";

const LIMIT = 30;
export const useGetUsers = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    { data: UsersData[]; total: number },
    Error,
    InfiniteData<{ users: UsersTableRow[]; total: number }>
  >({
    queryKey: ["user", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<{
        data: UsersData[];
        total: number;
      }>(
        `/users${q ? `/search?q=${q}` : ""}${
          q ? `&skip=${skip}&limit=${LIMIT}` : `?skip=${skip}&limit=${LIMIT}`
        }`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          users: page.data.map((ele) => ({
            id: ele._id,
            name: ele.username,
            email: ele.email,
            role: ele.role,
            createdAt: dayjs(ele.createdAt).format("YYYY-MM-DD"),
            updatedAt: dayjs(ele.updatedAt).format("YYYY-MM-DD"),
          })),
          total: page.total,
        })),
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.length * LIMIT;
      return loadedItems < lastPage.total && lastPage.data.length === LIMIT
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
  });
  return query;
};
