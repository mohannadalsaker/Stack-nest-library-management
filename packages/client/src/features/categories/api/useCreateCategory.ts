import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CategoryFormInput } from "../validation/categoryFormSchema";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: CategoryFormInput) => post("/category", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Category created");
    },
    onError: () => {
      toast.error("There has been an error creating the category");
    },
  });

  return mutation;
};
