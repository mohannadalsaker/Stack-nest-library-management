import { fetcher } from "@/api/fetcher";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { SubCategoriesData, SubCategoriesTableRow } from "../types";

const LIMIT = 30;
export const useGetSubtCategories = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    { data: SubCategoriesData[]; total: number },
    Error,
    InfiniteData<{ subCategories: SubCategoriesTableRow[]; total: number }>
  >({
    queryKey: ["subCategory", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<{
        data: SubCategoriesData[];
        total: number;
      }>(
        `/subCategory${q ? `/search?q=${q}` : ""}${
          q ? `&skip=${skip}&limit=${LIMIT}` : `?skip=${skip}&limit=${LIMIT}`
        }`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          subCategories: page.data.map((ele) => ({
            id: ele._id,
            name: ele.name,
            category: ele.category.name,
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
