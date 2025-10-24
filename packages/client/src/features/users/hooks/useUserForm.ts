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
import { UserRoles } from "@/shared/types";

export const useUserForm = () => {
  const { openEditId, closeDialog } = useDialogStore();
  const { data, isLoading: isLoadingCategory } = useGetUser(openEditId!);

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = useForm<UserFormInput>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: UserRoles.dataEntry,
    },
  });

  useEffect(() => {
    if (data)
      reset({
        username: data.username,
        email: data.email,
        role: data.role,
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
    } else {
      if (!data.password) {
        setError("password", {
          message: "Password must be at least 8 characters",
        });
      }
      createUser(data, {
        onSuccess: () => {
          closeDialog();
        },
      });
    }
  };

  const sendForm = handleSubmit(onSubmit);

  const rolesOptions = [
    {
      label: "Admin",
      value: UserRoles.admin,
    },
    {
      label: "Data Entry",
      value: UserRoles.dataEntry,
    },
    {
      label: "Archiver",
      value: UserRoles.archiver,
    },
  ];

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
    rolesOptions,
  };
};
