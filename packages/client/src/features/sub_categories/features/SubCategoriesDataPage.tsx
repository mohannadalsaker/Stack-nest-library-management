import { Dialog, MainTable } from "@/shared/components";
import FeatureHeader from "@/shared/components/FeatureHeader";
import { useDialogStore } from "@/stores";
import { Loader } from "lucide-react";
import { useSubCategoriesTable } from "../hooks";
import type { SubCategoriesTableRow } from "../types";
import SubCategoryDeleteDialog from "./SubCategoryDeleteDialog";
import SubCategoryForm from "./SubCategoryForm";

const SubCategoriesDataPage = () => {
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
    totalSubCategories,
    rows,
    tableActions,
    tableRef,
    isPending,
    handleScroll,
    isFetchingNextPage,
    handleSearch,
  } = useSubCategoriesTable();

  return (
    <div className="flex flex-col gap-4 h-full w-full overflow-hidden">
      <Dialog
        isOpen={isOpenAdd || Boolean(openEditId)}
        title={isOpenAdd ? "Add Sub Category" : "Edit Sub Category"}
        onClose={() => {
          if (isOpenAdd) toggleOpenAdd();
          else changeOpenEdit(null);
        }}
      >
        <SubCategoryForm />
      </Dialog>
      <Dialog
        isOpen={Boolean(openDeleteId)}
        title={"Delete Sub Category"}
        subTitle="The action cannot be undone, the sub category will be permenantly removed from your inventory."
        onClose={() => {
          changeOpenDelete(null);
        }}
      >
        <SubCategoryDeleteDialog />
      </Dialog>
      <FeatureHeader
        buttonTitle="Add Sub Category"
        onClickAdd={() => {
          toggleOpenAdd();
        }}
        onSearch={(e) => {
          handleSearch(e.target.value);
        }}
        title="Sub Categories"
        description={`Manage your sub categories inventory (${
          totalSubCategories || 0
        } sub categories)`}
      />

      <div
        className="w-full h-full overflow-auto"
        onScroll={handleScroll}
        ref={tableRef}
      >
        <MainTable<SubCategoriesTableRow>
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

export default SubCategoriesDataPage;
