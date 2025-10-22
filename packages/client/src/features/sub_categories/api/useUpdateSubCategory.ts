import { put } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { SubCategoryFormInput } from "../validation/subCategoryFormSchema";

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubCategoryFormInput }) =>
      put(`/subCategory/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      toast.success("Sub category updated");
    },
    onError: () => {
      toast.error("There has been an error updating the sub category");
    },
  });

  return mutation;
};
