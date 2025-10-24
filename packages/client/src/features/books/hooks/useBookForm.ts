import { useDialogStore } from "@/stores";
import {
  useCreateBook,
  useGetBook,
  useGetCategories,
  useGetSubCategoriesByCategory,
  useUpdateBook,
} from "../api";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { bookSchema, type BookInput } from "../validation/bookFormSchema";

export const useBookForm = () => {
  const { openEditId, closeDialog } = useDialogStore();
  const { data, isLoading: isLoadingBook } = useGetBook(openEditId!);

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm<BookInput>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      author: "",
      availableQuantity: "0",
      category: "",
      isbn: "",
      description: "",
      location: "",
      notes: "",
      rating: "0",
      subCategory: "",
      title: "",
      totalQuantity: "0",
      isDeleteImage: "0",
    },
  });

  const { data: subCategories, isLoading: isLoadingSubCategories } =
    useGetSubCategoriesByCategory(watch("category"));

  useEffect(() => {
    if (data)
      reset({
        author: data.author,
        availableQuantity: String(data.availableQuantity),
        category: data.category._id,
        isbn: data.isbn,
        description: data.description,
        location: data.location,
        notes: data.notes,
        rating: String(data.rating),
        subCategory: data.subCategory._id,
        title: data.title,
        totalQuantity: String(data.totalQuantity),
        isDeleteImage: "0",
      });
  }, [data]);

  const { mutate: createBook, isPending: isCreating } = useCreateBook();
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBook();

  const onSubmit: SubmitHandler<BookInput> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (openEditId) {
      updateBook(
        { id: openEditId, data: formData },
        {
          onSuccess: () => {
            closeDialog();
          },
        }
      );
    } else {
      formData.delete("isDeleteImage");
      createBook(formData, {
        onSuccess: () => {
          closeDialog();
        },
      });
    }
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
    isLoadingBook,
    openEditId,
    subCategories,
    categories,
    isLoadingCategories,
    isLoadingSubCategories,
  };
};
