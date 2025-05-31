import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  id: number;
};

type Action = {
  updateId: (id: State["id"]) => void;
};

const useStore = create<State & Action>()(
  persist(
    (set) => ({
      id: 0,
      updateId: (id: number) => set(() => ({ id })),
    }),
    { name: "persistent-store" } // Keep the store persistent on localStorage, a storage prop is optional (localStorage chosen by default)
  )
);

export default useStore;
