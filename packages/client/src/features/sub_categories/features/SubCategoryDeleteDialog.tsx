import { useDialogStore } from "@/stores";
import { DeleteDialogCard, Loader } from "@/shared/ui";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { useGetSubCategory } from "../api/useGetSubCategory";
import { useDeleteSubCategory } from "../api/useDeleteSubCategory";

const SubCategoryDeleteDialog = () => {
  const { openDeleteId, changeOpenDelete, closeDialog } = useDialogStore();
  const { data, isLoading } = useGetSubCategory(openDeleteId!);
  const { mutate: deleteCategory, isPending } = useDeleteSubCategory();

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      <DeleteDialogCard name={data?.data?.name!} />
      <div className="flex justify-end gap-3">
        <PrimaryButton
          title="Cancel"
          className="bg-white text-black bg-[url('')] border border-secondary-text"
          onClick={() => changeOpenDelete(null)}
        />
        <PrimaryButton
          title="Delete Product"
          className="text-white bg-[url('')] bg-red-500"
          isLoading={isPending}
          onClick={() =>
            deleteCategory(openDeleteId!, {
              onSuccess: () => {
                closeDialog();
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default SubCategoryDeleteDialog;
