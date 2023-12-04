import {create} from "zustand";

const useNumberBaseStore = create()((set, get) => ({
  numberA : 0,
  numberB : 0,
  increaseNumberA : () =>
    set((state) => ({
      numberA : state.numberA + 1,
    })),
  increaseNumberB : (value) =>
    set({
      numberB : get().numberB + value,
    }),
}))

export default useNumberBaseStore;