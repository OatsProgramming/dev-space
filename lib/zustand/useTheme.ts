import { create } from "zustand";

type ThemeStore = {
    isLight: boolean,
    setIsLight: (isLight: boolean) => void,
}

const useTheme = create<ThemeStore>()((set) => ({
    isLight: false,
    setIsLight: (isLight) => set({ isLight })
}))

export default useTheme