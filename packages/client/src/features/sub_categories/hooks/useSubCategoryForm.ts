import { useDialogStore } from "@/stores";
import { useGetSubCategory } from "../api/useGetSubCategory";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  SubCategoryFormSchema,
  type SubCategoryFormInput,
} from "../validation/subCategoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useCreateSubCategory } from "../api/useCreateSubCategory";
import { useUpdateSubCategory } from "../api/useUpdateSubCategory";
import { useGetCategories } from "../api/useGetCategories";

export const useSubCategoryForm = () => {
  const { openEditId, closeDialog } = useDialogStore();
  const { data, isLoading: isLoadingSubCategory } = useGetSubCategory(
    openEditId!
  );

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SubCategoryFormInput>({
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  useEffect(() => {
    if (data)
      reset({
        name: data?.data?.name,
        category: data?.data?.category?._id,
      });
  }, [data]);

  const { mutate: createSubCategory, isPending: isCreating } =
    useCreateSubCategory();
  const { mutate: updatedSubCategory, isPending: isUpdating } =
    useUpdateSubCategory();

  const onSubmit: SubmitHandler<SubCategoryFormInput> = (data) => {
    if (openEditId) {
      updatedSubCategory(
        { id: openEditId, data },
        {
          onSuccess: () => {
            closeDialog();
          },
        }
      );
    } else
      createSubCategory(data, {
        onSuccess: () => {
          closeDialog();
        },
      });
  };

  const sendForm = handleSubmit(onSubmit);

  return {
    sendForm,
    control,
    register,
    errors,
    closeDialog,
    isCreating,
    isUpdating,
    isLoadingSubCategory,
    openEditId,
    categories,
    isLoadingCategories,
  };
};
