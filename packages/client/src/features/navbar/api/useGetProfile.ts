import { fetcher } from "@/api/fetcher";
import type { SingleUserData } from "@/features/users/types";
import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const query = useQuery<ApiResponse<SingleUserData>, Error, SingleUserData>({
    queryKey: ["profile"],
    queryFn: () => fetcher("/users/profile"),
    select: (res) => res?.data,
  });

  return { query };
};
