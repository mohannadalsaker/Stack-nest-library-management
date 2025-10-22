import { create } from "zustand";

type DialogStore = {
  isOpenAdd: boolean;
  openEditId: string | null;
  openDeleteId: string | null;
  toggleOpenAdd: () => void;
  changeOpenEdit: (id: string | null) => void;
  changeOpenDelete: (id: string | null) => void;
  closeDialog: () => void;
};

export const useDialogStore = create<DialogStore>((set) => ({
  isOpenAdd: false,
  openEditId: null,
  openDeleteId: null,
  toggleOpenAdd: () => {
    set((state) => ({
      isOpenAdd: !state.isOpenAdd,
    }));
  },
  changeOpenDelete: (id: string | null) => {
    set(() => ({
      openDeleteId: id,
    }));
  },
  changeOpenEdit: (id: string | null) => {
    set(() => ({
      openEditId: id,
    }));
  },
  closeDialog: () => {
    set(() => ({
      openEditId: null,
      openDeleteId: null,
      isOpenAdd: false,
    }));
  },
}));
