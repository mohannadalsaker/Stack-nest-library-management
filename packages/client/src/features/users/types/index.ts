import type { UserRoles } from "@/shared/types";

export interface UsersData {
  _id: string;
  username: string;
  email: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
}

export interface UsersTableRow {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
}

export interface SingleUserData {
  user: UsersData;
}
