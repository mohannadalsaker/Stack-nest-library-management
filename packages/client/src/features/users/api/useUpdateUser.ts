import { put } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { UserFormInput } from "../validation/userFormSchema";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormInput }) =>
      put(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated");
    },
    onError: () => {
      toast.error("There has been an error updating the user");
    },
  });

  return mutation;
};
