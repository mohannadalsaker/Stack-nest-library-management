import type { ReactNode } from "react";
import { AArrowDown } from "lucide-react";

export type IconType = typeof AArrowDown;

export interface MainTableColumn<T> {
  key: keyof T;
  label: string;
  format?: (row: T) => ReactNode;
}

export interface MainTableAction {
  icon: IconType;
  type?: "normal" | "delete";
  action: (id: string) => void;
}

export interface QueryParams {
  q: string;
  skip: number;
}

export interface ApiResponse<T> {
  data: T;
}
export interface PaginatedApiResponse<T> {
  data: { data: T[]; total: number };
}

export enum UserRoles {
  admin = "ADMIN",
  dataEntry = "DATA ENTRY",
  archiver = "ARCHIVER",
}
