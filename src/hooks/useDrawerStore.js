import { create } from "zustand";

const useDrawerStore = create((set) => ({
  isOpen: false,
  data: {
    viewName: "",
  },
  openDrawer: (new_data) =>
    set((state) => ({
      isOpen: true,
      data: { ...state.data, ...new_data },
    })),
  updateDrawerData: (new_data) =>
    set((state) => ({
      data: { ...state.data, ...new_data },
    })),
  closeDrawer: () => set(() => ({ isOpen: false, data: {} })),
  clearDrawerStore: () => set(() => ({ data: {} })),
}));

export default useDrawerStore;
