import {
  BookDeleteDialog,
  BooksFilterDialog,
  BooksForm,
} from "@/features/books/features";
import { Dialog, MainTable } from "@/shared/components";
import FeatureHeader from "@/shared/components/FeatureHeader";
import { useAuthStore, useDialogStore } from "@/stores";
import { useBooksTable } from "../hooks";
import { Filter, Loader } from "lucide-react";
import type { BooksTableRow } from "../types";
import { UserRoles } from "@/shared/types";
import PrimaryButton from "@/shared/components/PrimaryButton";

const BooksDataPage = () => {
  const { role } = useAuthStore();

  const {
    isOpenAdd,
    openEditId,
    openDeleteId,
    changeOpenDelete,
    toggleOpenAdd,
    changeOpenEdit,
  } = useDialogStore();
  const {
    columns,
    totalBooks,
    rows,
    tableActions,
    tableRef,
    isPending,
    handleScroll,
    isFetchingNextPage,
    handleSearch,
    handleChangeTempFilter,
    handleFilter,
    isOpenFilter,
    tempFilters,
    toggleOpenFilter,
    isLoading,
  } = useBooksTable();

  return (
    <div className="flex flex-col gap-4 h-full w-full overflow-hidden">
      <Dialog
        isOpen={isOpenAdd || Boolean(openEditId)}
        title={isOpenAdd ? "Add Book" : "Edit Book"}
        onClose={() => {
          if (isOpenAdd) toggleOpenAdd();
          else changeOpenEdit(null);
        }}
      >
        <BooksForm />
      </Dialog>
      <Dialog
        isOpen={Boolean(openDeleteId)}
        title={"Delete Book"}
        subTitle="The action cannot be undone, the book will be permenantly removed from your inventory."
        onClose={() => {
          changeOpenDelete(null);
        }}
      >
        <BookDeleteDialog />
      </Dialog>
      <Dialog
        isOpen={isOpenFilter}
        title={"Filter Books"}
        subTitle="Filter books by these properties."
        onClose={toggleOpenFilter}
      >
        <BooksFilterDialog
          filters={tempFilters}
          isLoading={isLoading}
          onChangeFilter={handleChangeTempFilter}
          onFilter={handleFilter}
          toggleOpen={toggleOpenFilter}
        />
      </Dialog>
      <FeatureHeader
        buttonTitle="Add Book"
        hasButton={role !== UserRoles.archiver}
        onClickAdd={() => {
          toggleOpenAdd();
        }}
        onSearch={(e) => {
          handleSearch(e.target.value);
        }}
        searchPlaceholder="Search in Books by (title, isbn, author)"
        title="Books"
        description={`Manage your books inventory (${totalBooks || 0} books)`}
      />
      <div className="flex w-full justify-end">
        <PrimaryButton
          title={"Filter"}
          icon={Filter}
          onClick={toggleOpenFilter}
          className="text-white px-10"
        />
      </div>
      <div
        className="w-full h-full overflow-auto"
        onScroll={handleScroll}
        ref={tableRef}
      >
        <MainTable<BooksTableRow>
          columns={columns}
          data={rows!}
          actions={tableActions}
        />
        {(isFetchingNextPage || isPending) && (
          <div className="flex justify-center p-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksDataPage;
