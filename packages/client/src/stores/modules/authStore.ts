import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  authenticate: () => void;
  unauthenticate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  authenticate: () => {
    set(() => ({ isAuthenticated: true }));
  },
  unauthenticate: () => {
    set(() => ({ isAuthenticated: false }));
  },
}));
