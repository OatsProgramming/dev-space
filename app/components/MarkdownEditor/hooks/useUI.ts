import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UIStore = {
    text: string,
    selectedText: string,
    isPreview: boolean,
    setText: (text: string) => void,
    setSelectedText: (selectedText: string) => void,
    setIsPreview: (arg: boolean) => void,
}

const useUI = create<UIStore>()(
    persist((set) => ({
        text: "",
        selectedText: "",
        isPreview: false,
        setText: (text) => set({ text }),
        setSelectedText: (selectedText) => set({ selectedText }),
        setIsPreview: (isPreview) => set({ isPreview }),
    }), {
        name: 'UI-Store',
        storage: createJSONStorage(() => sessionStorage)
    })
)

export default useUI