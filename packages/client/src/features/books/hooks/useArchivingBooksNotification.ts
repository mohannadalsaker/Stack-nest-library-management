import { useEffect } from "react";
import { useGetArchivingBooks } from "../api";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { useAuthStore } from "@/stores";
import { UserRoles } from "@/shared/types";

export const useArchivingBooksNotification = () => {
  const { role } = useAuthStore();
  const { data, refetch } = useGetArchivingBooks();

  const debouncedRefetch = debounce(refetch, 1000);

  useEffect(() => {
    if (data && data.length > 0 && role !== UserRoles.dataEntry) {
      debounce(() => {
        toast.info(`📋 ${data.length} books need archiving`, {
          position: "top-right",
          autoClose: 8000,
        });
      }, 500)();
    }
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(debouncedRefetch, 60000);
    return () => {
      clearInterval(intervalId);
      debouncedRefetch.cancel();
    };
  }, [debouncedRefetch]);

  return data;
};
