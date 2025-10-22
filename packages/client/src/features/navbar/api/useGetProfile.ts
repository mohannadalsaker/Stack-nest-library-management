import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetcher("/users/profile"),
    select: (res) => res?.data?.user,
  });

  return { query };
};
