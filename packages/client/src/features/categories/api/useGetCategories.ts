import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { CategoriesData, CategoriesTableRow } from "../types";
import { fetcher } from "@/api/fetcher";
import dayjs from "dayjs";

const LIMIT = 30;
export const useGetCategories = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    { data: CategoriesData[]; total: number },
    Error,
    InfiniteData<{ categories: CategoriesTableRow[]; total: number }>
  >({
    queryKey: ["category", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<{
        data: CategoriesData[];
        total: number;
      }>(
        `/category${q ? `/search?q=${q}` : ""}${
          q ? `&skip=${skip}&limit=${LIMIT}` : `?skip=${skip}&limit=${LIMIT}`
        }`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          categories: page.data.map((ele) => ({
            id: ele._id,
            name: ele.name,
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
