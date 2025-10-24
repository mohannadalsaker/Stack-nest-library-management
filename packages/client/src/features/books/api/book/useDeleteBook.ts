import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => del(`/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
      toast.success("Book deleted");
    },
    onError: () => {
      toast.error("There has been an error deleting the book");
    },
  });

  return mutation;
};
