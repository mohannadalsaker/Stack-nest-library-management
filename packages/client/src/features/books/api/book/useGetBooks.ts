import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { BooksData, BooksTableRow } from "../../types";
import { fetcher } from "@/api/fetcher";
import dayjs from "dayjs";

const LIMIT = 30;
export const useGetBooks = ({ q }: { q: string }) => {
  const query = useInfiniteQuery<
    { data: BooksData[]; total: number },
    Error,
    InfiniteData<{ books: BooksTableRow[]; total: number }>
  >({
    queryKey: ["book", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<{
        data: BooksData[];
        total: number;
      }>(
        `/books${q ? `/search?q=${q}` : ""}${
          q ? `&skip=${skip}&limit=${LIMIT}` : `?skip=${skip}&limit=${LIMIT}`
        }`
      );
    },
    staleTime: 1000 * 60 * 20,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          books: page.data.map((ele) => ({
            id: ele._id,
            title: ele.title,
            status: ele.status,
            author: ele.author,
            category: ele.category.name,
            subCategory: ele.subCategory.name,
            availableQty: ele.availableQuantity,
            totalQty: ele.totalQuantity,
            isbn: ele.isbn,
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
