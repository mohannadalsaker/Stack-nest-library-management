import {
  ImageUploadInput,
  SelectInput,
  TextAreaField,
  TextField,
} from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { Loader } from "@/shared/ui";
import { useBookForm } from "../hooks";
import { getFileUrl } from "@/utils";

const BooksForm = () => {
  const {
    sendForm,
    closeDialog,
    register,
    setValue,
    errors,
    isLoadingBook,
    isCreating,
    isUpdating,
    openEditId,
    categories,
    isLoadingCategories,
    isLoadingSubCategories,
    subCategories,
    control,
    data,
  } = useBookForm();

  if (isLoadingBook) return <Loader />;

  return (
    <form onSubmit={sendForm}>
      <div className="flex flex-col gap-6">
        <ImageUploadInput
          control={control}
          name="coverImage"
          setValue={setValue}
          label="Cover image"
          error={errors.coverImage?.message as string}
          defaultImage={getFileUrl(data?.coverImage)}
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <TextField
              label="Title"
              placeholder="Enter title"
              error={errors.title?.message}
              isRequired
              {...register("title")}
            />
            <TextField
              label="ISBN"
              placeholder="Enter isbn number"
              error={errors.isbn?.message}
              isRequired
              {...register("isbn")}
            />
          </div>
          <TextAreaField
            label="Description"
            placeholder="Enter description"
            error={errors.description?.message}
            rows={3}
            {...register("description")}
          />
          <div className="flex gap-6">
            <TextField
              label="Author"
              placeholder="Enter author"
              error={errors.author?.message}
              isRequired
              {...register("author")}
            />
            <TextField
              label="Rating"
              placeholder="Enter rating"
              error={errors.rating?.message}
              min={0}
              max={5}
              type="number"
              {...register("rating")}
            />
          </div>
          <div className="flex gap-6">
            <SelectInput
              options={categories!}
              isLoading={isLoadingCategories}
              disabled={isLoadingCategories}
              label="Category"
              placeholder="Select category"
              error={errors.category?.message}
              isRequired
              {...register("category")}
            />
            <SelectInput
              options={subCategories!}
              isLoading={isLoadingSubCategories}
              disabled={isLoadingSubCategories}
              label="Sub category"
              placeholder="Select sub category"
              error={errors.rating?.message}
              isRequired
              {...register("subCategory")}
            />
          </div>
          <div className="flex gap-6">
            <TextField
              label="Available quatnity"
              placeholder="Enter quantity"
              error={errors.availableQuantity?.message}
              isRequired
              type="number"
              {...register("availableQuantity")}
            />
            <TextField
              label="Total quatnity"
              placeholder="Enter quantity"
              error={errors.totalQuantity?.message}
              isRequired
              type="number"
              {...register("totalQuantity")}
            />
          </div>
          <div className="flex gap-6">
            <TextField
              label="Location"
              placeholder="Enter location"
              error={errors.location?.message}
              {...register("location")}
            />
            <TextField
              label="Notes"
              placeholder="Enter notes"
              error={errors.notes?.message}
              {...register("notes")}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <PrimaryButton
            title="Cancel"
            type="button"
            className="bg-white bg-[url('')] text-black border border-secondary-text"
            onClick={closeDialog}
          />
          <PrimaryButton
            title={openEditId ? "Edit Book" : "Add Book"}
            type="submit"
            className="text-white"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};

export default BooksForm;
