import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: FormData) => post("/books", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
      toast.success("Book created");
    },
    onError: () => {
      toast.error("There has been an error creating the book");
    },
  });

  return mutation;
};
