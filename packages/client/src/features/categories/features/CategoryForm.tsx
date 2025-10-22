import { TextField } from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { Loader } from "@/shared/ui";
import { useCategoryForm } from "../hooks";

const CategoryForm = () => {
  const {
    sendForm,
    closeDialog,
    register,
    errors,
    isLoadingCategory,
    isCreating,
    isUpdating,
    openEditId,
  } = useCategoryForm();

  if (isLoadingCategory) return <Loader />;

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
        </div>
        <div className="flex justify-end gap-3">
          <PrimaryButton
            title="Cancel"
            type="button"
            className="bg-white bg-[url('')] text-black border border-secondary-text"
            onClick={closeDialog}
          />
          <PrimaryButton
            title={openEditId ? "Edit Category" : "Add Category"}
            type="submit"
            className="text-white"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
