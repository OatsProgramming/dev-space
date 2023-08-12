'use client'

import { createContext, useContext } from "react";

const ContextComment = createContext<CommentResponse | null>(null)

export default function ProviderComment({ comment, children }: {
    comment: CommentResponse,
    children: React.ReactNode
}) {
    return (
        <ContextComment.Provider value={comment}>
            {children}
        </ContextComment.Provider>
    )
}

export function getCommentContext() {
    return useContext(ContextComment)
}