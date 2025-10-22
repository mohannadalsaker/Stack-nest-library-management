import { post } from "@/api/mutator";
import { useMutation } from "@tanstack/react-query";
import type { LoginFormFields } from "../validation/LoginFormSchema";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const mutation = useMutation<
    { data: { token: string } },
    AxiosError<{ error: string }>,
    LoginFormFields
  >({
    mutationFn: (data: LoginFormFields) =>
      post<{ data: { token: string } }>(`/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onError: (err) => {
      toast.error(
        err?.response?.data.error || "There has been an error logging in"
      );
    },
  });
  return mutation;
};
