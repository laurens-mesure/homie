import { create } from "zustand";

export type IScanRes = { name: string; ip: string; mac: string };
export type SavedMacs = { index: string; name: string; mac: string }[];
export type Homie = { name: string; mac: string; ghost: boolean; createdAt: Date; updatedAt: Date };

// 🍎
interface IMacStore {
  macs: string[];
  saves: SavedMacs;
  homies: Homie[];
  seedLoading: boolean;
  setStore: (
    partial:
      | IMacStore
      | Partial<IMacStore>
      | ((state: IMacStore) => IMacStore | Partial<IMacStore>),
    replace?: boolean | undefined
  ) => void;
}

export const useMacStore = create<IMacStore>((set) => ({
  macs: [],
  saves: [],
  homies: [],
  seedLoading: false,
  setStore: set,
}));
