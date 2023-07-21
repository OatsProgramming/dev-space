import { create } from "zustand";

export type ParentCommentStore = {
    parentCommentId: string | null,
    setParentCommentId: (parentCommentId: ParentCommentStore['parentCommentId']) => void
}

// Simply to help determine which comment thread the user is on
// Set to 'null' to go back to 'post' thread
const useParentCommentId = create<ParentCommentStore>()((set) => ({
    parentCommentId: null,
    setParentCommentId: (parentCommentId) => set({ parentCommentId })
}))

export default useParentCommentId