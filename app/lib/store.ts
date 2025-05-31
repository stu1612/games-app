import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  id: number;
  hydrated: boolean;
};

type Action = {
  updateId: (id: State["id"]) => void;
  setHydrated: () => void;
};

const useStore = create<State & Action>()(
  persist(
    (set) => ({
      id: 0,
      hydrated: false,
      updateId: (id: number) => set(() => ({ id })),
      setHydrated: () => set(() => ({ hydrated: true })),
    }),
    {
      name: "persistent-store",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export default useStore;
