import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => del(`/subCategory/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      toast.success("Sub category deleted");
    },
    onError: () => {
      toast.error("There has been an error deleting the sub category");
    },
  });

  return mutation;
};
