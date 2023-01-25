import { create } from "zustand";

interface IAlertStore {
  content: { key: string; value: string }[] | null;
  setStore: (
    partial:
      | IAlertStore
      | Partial<IAlertStore>
      | ((state: IAlertStore) => IAlertStore | Partial<IAlertStore>),
    replace?: boolean | undefined
  ) => void;
}

export const useAlertStore = create<IAlertStore>((set) => ({
  content: null,
  setStore: set,
}));
