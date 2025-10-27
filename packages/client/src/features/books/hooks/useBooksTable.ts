import {
  UserRoles,
  type MainTableAction,
  type MainTableColumn,
} from "@/shared/types";
import { useAuthStore, useDialogStore } from "@/stores";
import { debounce } from "lodash";
import { ArchiveRestoreIcon, Pencil, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useGetBooks, useUpdateBookStatus } from "../api";
import type { BooksTableRow } from "../types";

export const useBooksTable = () => {
  const { role } = useAuthStore();
  const { changeOpenDelete, changeOpenEdit } = useDialogStore();
  const { mutate: updateBookStatus } = useUpdateBookStatus();

  const [searchValue, setSearchValue] = useState("");
  const tableRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
  } = useGetBooks({ q: searchValue });

  const columns: MainTableColumn<BooksTableRow>[] = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "isbn",
      label: "ISBN",
    },
    {
      key: "author",
      label: "Author",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "availableQty",
      label: "Available Qty",
    },
    {
      key: "totalQty",
      label: "Total Qty",
    },
    {
      key: "category",
      label: "Category name",
    },
    {
      key: "createdAt",
      label: "Created at",
    },
    {
      key: "updatedAt",
      label: "Updated at",
    },
  ];

  const tableActions: MainTableAction[] = [
    ...(role !== UserRoles.archiver
      ? [
          {
            icon: Pencil,
            action: (id: string) => changeOpenEdit(id),
          },
        ]
      : []),
    ...(role !== UserRoles.dataEntry
      ? [
          {
            icon: ArchiveRestoreIcon,
            action: (id: string) => updateBookStatus({ id }),
          },
        ]
      : []),
    ...(role !== UserRoles.archiver
      ? [
          {
            icon: Trash2,
            action: (id: string) => changeOpenDelete(id),
            type: "delete" as const,
          },
        ]
      : []),
  ];

  const handleSearch = debounce((value: string) => {
    setSearchValue(value);
  }, 500);

  const handleScroll = useCallback(() => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight * 0.8 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const rows = data?.pages.flatMap((page) => page.books) || [];
  const totalBooks = data?.pages[0]?.total || 0;

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    rows,
    columns,
    totalBooks,
    tableActions,
    handleSearch,
    searchValue,
    tableRef,
    isPending,
    handleScroll,
  };
};
