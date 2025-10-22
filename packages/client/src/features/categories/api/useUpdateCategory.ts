import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryFormInput } from "../validation/categoryFormSchema";
import { put } from "@/api/mutator";
import { toast } from "react-toastify";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormInput }) =>
      put(`/category/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Category updated");
    },
    onError: () => {
      toast.error("There has been an error updating the category");
    },
  });

  return mutation;
};
