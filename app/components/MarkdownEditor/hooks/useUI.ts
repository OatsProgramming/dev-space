import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UIStore = {
    formData: {
        title: string,
        body: string,
    },
    /**
     * Only to be used in textarea
     */
    selectedText: string,
    isPreview: boolean,
    setFormData: (formData: Partial<UIStore['formData']>) => void,
    /**
     * Only to be used in textarea
     * @param selectedText 
     * @returns 
     */
    setSelectedText: (selectedText: string) => void,
    setIsPreview: (arg: boolean) => void,
}

const useUI = create<UIStore>()(
    persist((set, get) => ({
        formData: {
            title: "",
            body: ""
        },
        selectedText: "",
        isPreview: false,
        setFormData: (formData) => {
            if (
                'title' in formData
                && formData.title 
                && !formData.title.startsWith('#')
            ) {
                // Make sure that it will always be the main heading
                formData.title = `# ${formData.title}`
            }

            else if ('body' in formData && formData.body) {
                formData.body = formData.body
            }

            set({
                formData: {
                    ...get().formData,
                    ...formData
                }
            })
        },
        setSelectedText: (selectedText) => set({ selectedText }),
        setIsPreview: (isPreview) => set({ isPreview }),
    }), {
        name: 'UI-Store',
        storage: createJSONStorage(() => sessionStorage),
        // Only store formData in sessionStorage
        partialize: (state) => ({ formData: state.formData })
    })
)

export default useUI