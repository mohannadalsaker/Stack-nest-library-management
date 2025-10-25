import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { CategoriesData, CategoriesTableRow } from "../types";
import { fetcher } from "@/api/fetcher";
import dayjs from "dayjs";
import type { PaginatedApiResponse } from "@/shared/types";

const LIMIT = 15;
export const useGetCategories = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    PaginatedApiResponse<CategoriesData>,
    Error,
    InfiniteData<{ categories: CategoriesTableRow[]; total: number }>
  >({
    queryKey: ["category", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<PaginatedApiResponse<CategoriesData>>(
        `/category/search?q=${q}&skip=${skip}&limit=${LIMIT}`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          categories: page.data.data.map((ele) => ({
            id: ele._id,
            name: ele.name,
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
