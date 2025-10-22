import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserFormInput } from "../validation/userFormSchema";
import { post } from "@/api/mutator";
import { toast } from "react-toastify";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UserFormInput) => post("/users", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User created");
    },
    onError: () => {
      toast.error("There has been an error creating the user");
    },
  });

  return mutation;
};
