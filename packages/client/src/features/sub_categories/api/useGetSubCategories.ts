import { fetcher } from "@/api/fetcher";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { SubCategoriesData, SubCategoriesTableRow } from "../types";
import type { PaginatedApiResponse } from "@/shared/types";

const LIMIT = 15;
export const useGetSubtCategories = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    PaginatedApiResponse<SubCategoriesData>,
    Error,
    InfiniteData<{ subCategories: SubCategoriesTableRow[]; total: number }>
  >({
    queryKey: ["subCategory", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<PaginatedApiResponse<SubCategoriesData>>(
        `/subCategory/search?q=${q}&skip=${skip}&limit=${LIMIT}`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          subCategories: page.data.data.map((ele) => ({
            id: ele._id,
            name: ele.name,
            category: ele.category.name,
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
