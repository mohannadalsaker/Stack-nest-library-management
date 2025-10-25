import { put } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateBookStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      put(`/books/${id}/changeStatus`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
      toast.success("Book status updated");
    },
    onError: () => {
      toast.error("There has been an error updating the book status");
    },
  });

  return mutation;
};
