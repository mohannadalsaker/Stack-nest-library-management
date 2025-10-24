import { put } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      put(`/books/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
      toast.success("Book updated");
    },
    onError: () => {
      toast.error("There has been an error updating the book");
    },
  });

  return mutation;
};
