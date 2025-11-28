import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isSidebarOpen: true,
  data: {},
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

export default useSidebarStore;
