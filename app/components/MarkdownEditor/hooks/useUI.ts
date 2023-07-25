import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UIStore = {
    text: string,
    selectedText: string,
    isDark: boolean,
    isPreview: boolean,
    setText: (text: string) => void,
    setSelectedText: (selectedText: string) => void,
    setIsDark: (arg: boolean) => void,
    setIsPreview: (arg: boolean) => void,
}

const useUI = create<UIStore>()(
    persist((set) => ({
        text: "",
        selectedText: "",
        isDark: true,
        isPreview: true,
        setText: (text) => set({ text }),
        setSelectedText: (selectedText) => set({ selectedText }),
        setIsDark: (isDark) => set({ isDark }),
        setIsPreview: (isPreview) => set({ isPreview }),
    }), {
        name: 'UI-Store',
        storage: createJSONStorage(() => sessionStorage)
    })
)

export default useUI