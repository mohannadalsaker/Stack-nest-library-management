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
import { BookStatus, type BookFilters, type BooksTableRow } from "../types";

export const useBooksTable = () => {
  const { role } = useAuthStore();
  const { changeOpenDelete, changeOpenEdit } = useDialogStore();
  const { mutate: updateBookStatus } = useUpdateBookStatus();

  const [filters, setFilters] = useState<Partial<BookFilters>>({});
  const [tempFilters, setTempFilters] = useState<Partial<BookFilters>>({});
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState("");
  const tableRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
  } = useGetBooks({
    q: searchValue,
    ...filters,
  });

  const columns: MainTableColumn<BooksTableRow>[] = [
    {
      key: "image",
      label: "Cover image",
    },
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
      label: "Category",
    },
    {
      key: "subCategory",
      label: "Sub category",
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

  const handleFilter = () => {
    setFilters(tempFilters);
    setIsOpenFilter(false);
  };

  const handleChangeTempFilter = (
    key: keyof Partial<BookFilters> | undefined,
    value: string | BookStatus | undefined
  ) => {
    const oldFilters = { ...tempFilters };
    if (key && value) oldFilters[key] = value as BookStatus;
    setTempFilters(oldFilters);
  };

  const toggleOpenFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  return {
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
    tempFilters,
    isOpenFilter,
    fetchNextPage,
    handleScroll,
    handleFilter,
    handleChangeTempFilter,
    toggleOpenFilter,
  };
};
