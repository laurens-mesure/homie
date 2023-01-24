import { create } from "zustand";
import { SavedMacs } from "../pages/_app";

// 🍎
interface IMacStore {
  macs: string[];
  saves: SavedMacs;
  homies: string[];
  setStore: (store: Partial<IMacStore>) => void;
}

export const useMacStore = create<IMacStore>((set) => ({
  macs: [],
  saves: [],
  homies: [],
  setStore: (store) => {
    set(store);
  },
}));
