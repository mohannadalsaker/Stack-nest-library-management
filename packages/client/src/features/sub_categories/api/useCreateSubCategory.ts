import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubCategoryFormInput } from "../validation/subCategoryFormSchema";
import { post } from "@/api/mutator";
import { toast } from "react-toastify";

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: SubCategoryFormInput) => post("/subCategory", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      toast.success("Sub category created");
    },
    onError: () => {
      toast.error("There has been an error creating the sub category");
    },
  });

  return mutation;
};
