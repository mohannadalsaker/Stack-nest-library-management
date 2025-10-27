import { UserRoles } from "@/shared/types";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  role: UserRoles | undefined;
  setRole: (value: UserRoles) => void;
  authenticate: () => void;
  unauthenticate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  role: undefined,
  setRole: (value: UserRoles | undefined) => {
    set(() => ({ role: value }));
  },
  authenticate: () => {
    set(() => ({ isAuthenticated: true }));
  },
  unauthenticate: () => {
    set(() => ({ isAuthenticated: false, role: undefined }));
  },
}));
