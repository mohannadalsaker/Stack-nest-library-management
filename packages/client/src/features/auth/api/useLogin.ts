import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginFormFields } from "../validation/LoginFormSchema";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { UserRoles } from "@/shared/types";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    { data: { token: string; user: { _id: string; role: UserRoles } } },
    AxiosError<{ error: string }>,
    LoginFormFields
  >({
    mutationFn: (data: LoginFormFields) =>
      post<{ data: { token: string; user: { _id: string; role: UserRoles } } }>(
        `/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data.error || "There has been an error logging in"
      );
    },
  });
  return mutation;
};
