import { SelectInput, TextField } from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { Loader } from "@/shared/ui";
import { useSubCategoryForm } from "../hooks";

const SubCategoryForm = () => {
  const {
    sendForm,
    closeDialog,
    register,
    errors,
    isLoadingSubCategory,
    isLoadingCategories,
    categories,
    isCreating,
    isUpdating,
    openEditId,
  } = useSubCategoryForm();

  if (isLoadingSubCategory) return <Loader />;

  return (
    <form onSubmit={sendForm}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <TextField
            label="Name"
            placeholder="Enter name"
            error={errors.name?.message}
            isRequired
            {...register("name")}
          />
          <SelectInput
            options={categories!}
            disabled={isLoadingCategories}
            label="Category"
            placeholder="Select category"
            error={errors.category?.message}
            isRequired
            {...register("category")}
          />
        </div>
        <div className="flex justify-end gap-3">
          <PrimaryButton
            title="Cancel"
            type="button"
            className="bg-white bg-[url('')] text-black border border-secondary-text"
            onClick={closeDialog}
          />
          <PrimaryButton
            title={openEditId ? "Edit Sub Category" : "Add Sub Category"}
            type="submit"
            className="text-white"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};

export default SubCategoryForm;
