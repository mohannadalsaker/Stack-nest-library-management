import { fetcher } from "@/api/fetcher";
import type { SingleUserData } from "@/features/users/types";
import type { ApiResponse } from "@/shared/types";
import { useAuthStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const { setRole } = useAuthStore();
  const query = useQuery<ApiResponse<SingleUserData>, Error, SingleUserData>({
    queryKey: ["profile"],
    queryFn: () =>
      fetcher<ApiResponse<SingleUserData>>("/users/profile").then((res) => {
        setRole(res.data.role);
        return res;
      }),
    select: (res) => res?.data,
    staleTime: Infinity,
  });

  return { query };
};
