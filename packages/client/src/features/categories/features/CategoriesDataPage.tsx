import { Dialog, MainTable } from "@/shared/components";
import FeatureHeader from "@/shared/components/FeatureHeader";
import { useAuthStore, useDialogStore } from "@/stores";
import CategoryForm from "./CategoryForm";
import CategoryDeleteDialog from "./CategoryDeleteDialog";
import { useCategoriesTable } from "../hooks";
import type { CategoriesTableRow } from "../types";
import { Loader } from "lucide-react";
import { UserRoles } from "@/shared/types";

const CategoriesDataPage = () => {
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
    totalCategories,
    rows,
    tableActions,
    tableRef,
    isPending,
    handleScroll,
    isFetchingNextPage,
    handleSearch,
  } = useCategoriesTable();

  return (
    <div className="flex flex-col gap-4 h-full w-full overflow-hidden">
      <Dialog
        isOpen={isOpenAdd || Boolean(openEditId)}
        title={isOpenAdd ? "Add Category" : "Edit Category"}
        onClose={() => {
          if (isOpenAdd) toggleOpenAdd();
          else changeOpenEdit(null);
        }}
      >
        <CategoryForm />
      </Dialog>
      <Dialog
        isOpen={Boolean(openDeleteId)}
        title={"Delete Category"}
        subTitle="The action cannot be undone, the category will be permenantly removed from your inventory."
        onClose={() => {
          changeOpenDelete(null);
        }}
      >
        <CategoryDeleteDialog />
      </Dialog>
      <FeatureHeader
        buttonTitle="Add Category"
        hasButton={role !== UserRoles.archiver}
        onClickAdd={() => {
          toggleOpenAdd();
        }}
        onSearch={(e) => {
          handleSearch(e.target.value);
        }}
        title="Categories"
        description={`Manage your categories inventory (${
          totalCategories || 0
        } categories)`}
      />

      <div
        className="w-full h-full overflow-auto"
        onScroll={handleScroll}
        ref={tableRef}
      >
        <MainTable<CategoriesTableRow>
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

export default CategoriesDataPage;
