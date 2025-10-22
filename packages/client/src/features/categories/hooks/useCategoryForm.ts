import { useForm, type SubmitHandler } from "react-hook-form";
import {
  CategoryFormSchema,
  type CategoryFormInput,
} from "../validation/categoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "../api/useCreateCategory";
import { useUpdateCategory } from "../api/useUpdateCategory";
import { useGetCategory } from "../api/useGetCategory";
import { useEffect } from "react";
import { useDialogStore } from "@/stores";

export const useCategoryForm = () => {
  const { openEditId, closeDialog } = useDialogStore();
  const { data, isLoading: isLoadingCategory } = useGetCategory(openEditId!);

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CategoryFormInput>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data)
      reset({
        name: data?.data?.name,
      });
  }, [data]);

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updatedCategory, isPending: isUpdating } =
    useUpdateCategory();

  const onSubmit: SubmitHandler<CategoryFormInput> = (data) => {
    if (openEditId) {
      updatedCategory(
        { id: openEditId, data },
        {
          onSuccess: () => {
            closeDialog();
          },
        }
      );
    } else
      createCategory(data, {
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
    isLoadingCategory,
    openEditId,
  };
};
