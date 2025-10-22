import { useDialogStore } from "@/stores";
import { useGetUser } from "../api/useGetUser";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  UserFormSchema,
  type UserFormInput,
} from "../validation/userFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useUpdateUser } from "../api/useUpdateUser";
import { useCreateUser } from "../api/useCreateUser";

export const useUserForm = () => {
  const { openEditId, closeDialog } = useDialogStore();
  const { data, isLoading: isLoadingCategory } = useGetUser(openEditId!);

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UserFormInput>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  useEffect(() => {
    if (data)
      reset({
        username: data.data.username,
        email: data.data.email,
        role: undefined,
      });
  }, [data]);

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updatedUser, isPending: isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<UserFormInput> = (data) => {
    if (openEditId) {
      updatedUser(
        { id: openEditId, data },
        {
          onSuccess: () => {
            closeDialog();
          },
        }
      );
    } else
      createUser(data, {
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
