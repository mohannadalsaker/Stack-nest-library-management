import { useAuthStore, useDialogStore } from "@/stores";
import { useCallback, useRef, useState } from "react";
import { useGetSubtCategories } from "../api/useGetSubCategories";
import {
  UserRoles,
  type MainTableAction,
  type MainTableColumn,
} from "@/shared/types";
import type { SubCategoriesTableRow } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import { debounce } from "lodash";

export const useSubCategoriesTable = () => {
  const { role } = useAuthStore();
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
  } = useGetSubtCategories({ q: searchValue });

  const columns: MainTableColumn<SubCategoriesTableRow>[] = [
    {
      key: "name",
      label: "Sub category name",
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

  const rows = data?.pages.flatMap((page) => page.subCategories) || [];
  const totalSubCategories = data?.pages[0]?.total || 0;

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    rows,
    columns,
    totalSubCategories,
    tableActions,
    handleSearch,
    searchValue,
    tableRef,
    isPending,
    handleScroll,
  };
};
