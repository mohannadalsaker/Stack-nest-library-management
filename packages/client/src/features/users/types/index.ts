export interface UsersData {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersTableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleUserData extends UsersData {}
