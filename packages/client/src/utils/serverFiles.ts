import { config } from "@/config/env";

export const getFileUrl = (url?: string) => {
  if (!url) return "";
  return `${config.VITE_BASE_URL}${url}`;
};
