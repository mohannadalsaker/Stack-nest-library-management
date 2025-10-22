import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => del(`/category/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Category deleted");
    },
    onError: () => {
      toast.error("There has been an error deleting the category");
    },
  });

  return mutation;
};
