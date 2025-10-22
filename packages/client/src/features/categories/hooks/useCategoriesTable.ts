import type { MainTableAction, MainTableColumn } from "@/shared/types";
import { useGetCategories } from "../api/useGetCategories";
import type { CategoriesTableRow } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useDialogStore } from "@/stores";
import { debounce } from "lodash";

export const useCategoriesTable = () => {
  const { changeOpenDelete, changeOpenEdit } = useDialogStore();

  const [searchValue, setSearchValue] = useState("");
  const tableRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
  } = useGetCategories({ q: "" });

  const columns: MainTableColumn<CategoriesTableRow>[] = [
    {
      key: "name",
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

  const rows = data?.pages.flatMap((page) => page.categories) || [];
  const totalCategories = data?.pages[0]?.total || 0;

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    rows,
    columns,
    totalCategories,
    tableActions,
    handleSearch,
    searchValue,
    tableRef,
    isPending,
    handleScroll,
  };
};
