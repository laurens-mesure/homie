import { create } from "zustand";

// 🍎
interface IMacStore {
  macs: string[];
  setStore: (store: Partial<IMacStore>) => void;
}

export const useMacStore = create<IMacStore>((set) => ({
  macs: [],
  setStore: (store) => {
    set(store);
  },
}));
