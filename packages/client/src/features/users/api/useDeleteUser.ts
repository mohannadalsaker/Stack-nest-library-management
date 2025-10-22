import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => del(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User deleted");
    },
    onError: () => {
      toast.error("There has been an error deleting the user");
    },
  });

  return mutation;
};
