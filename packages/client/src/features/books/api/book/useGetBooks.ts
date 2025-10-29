import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { BookFilters, BooksData, BooksTableRow } from "../../types";
import { fetcher } from "@/api/fetcher";
import dayjs from "dayjs";
import type { PaginatedApiResponse } from "@/shared/types";

const LIMIT = 15;
export const useGetBooks = (
  queryParams: { q: string } & Partial<BookFilters>
) => {
  const query = useInfiniteQuery<
    PaginatedApiResponse<BooksData>,
    Error,
    InfiniteData<{ books: BooksTableRow[]; total: number }>
  >({
    queryKey: ["book", queryParams],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      const queryString = Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined && value !== "")
        .map(([key, value]) => {
          if (value) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
        })
        .join("&");
      return fetcher<PaginatedApiResponse<BooksData>>(
        `/books/search?skip=${skip}&limit=${LIMIT}&${queryString}`
      );
    },
    staleTime: 1000 * 60 * 20,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          books: page.data.data.map((ele) => ({
            id: ele._id,
            title: ele.title,
            status: ele.status,
            author: ele.author,
            image: ele.coverImage || undefined,
            category: ele.category.name,
            subCategory: ele.subCategory.name,
            availableQty: ele.availableQuantity,
            totalQty: ele.totalQuantity,
            isbn: ele.isbn,
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
