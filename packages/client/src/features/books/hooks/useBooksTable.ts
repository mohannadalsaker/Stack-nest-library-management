import type { MainTableAction, MainTableColumn } from "@/shared/types";
import { useDialogStore } from "@/stores";
import { debounce } from "lodash";
import { ArchiveRestoreIcon, Pencil, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useGetBooks, useUpdateBookStatus } from "../api";
import type { BooksTableRow } from "../types";

export const useBooksTable = () => {
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
    {
      icon: Pencil,
      action: (id) => changeOpenEdit(id),
    },
    {
      icon: ArchiveRestoreIcon,
      action: (id) => updateBookStatus({ id }),
    },
    {
      icon: Trash2,
      action: (id) => changeOpenDelete(id),
      type: "delete",
    },
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
