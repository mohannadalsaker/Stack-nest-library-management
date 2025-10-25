import { useDialogStore } from "@/stores";
import { useCallback, useRef, useState } from "react";
import { useGetUsers } from "../api/useGetUsers";
import type { MainTableAction, MainTableColumn } from "@/shared/types";
import type { UsersTableRow } from "../types";
import { Pencil, Trash2 } from "lucide-react";
import { debounce } from "lodash";

export const useUsersTable = () => {
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
  } = useGetUsers({ q: searchValue });

  const columns: MainTableColumn<UsersTableRow>[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
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

  const rows = data?.pages.flatMap((page) => page.users) || [];
  const totalUsers = data?.pages[0]?.total || 0;

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    rows,
    columns,
    totalUsers,
    tableActions,
    handleSearch,
    searchValue,
    tableRef,
    isPending,
    handleScroll,
  };
};
