import { BookDeleteDialog, BooksForm } from "@/features/books/features";
import { Dialog, MainTable } from "@/shared/components";
import FeatureHeader from "@/shared/components/FeatureHeader";
import { useDialogStore } from "@/stores";
import { useBooksTable } from "../hooks";
import { Loader } from "lucide-react";
import type { BooksTableRow } from "../types";

const BooksDataPage = () => {
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
        title={"Delete User"}
        subTitle="The action cannot be undone, the user will be permenantly removed from your inventory."
        onClose={() => {
          changeOpenDelete(null);
        }}
      >
        <BookDeleteDialog />
      </Dialog>
      <FeatureHeader
        buttonTitle="Add Book"
        onClickAdd={() => {
          toggleOpenAdd();
        }}
        onSearch={(e) => {
          handleSearch(e.target.value);
        }}
        title="Books"
        description={`Manage your books inventory (${totalBooks || 0} books)`}
      />

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
