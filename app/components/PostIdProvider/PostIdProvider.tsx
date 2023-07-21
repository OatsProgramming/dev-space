'use client'

import { createContext, useContext } from "react";

const PostIdContext = createContext<string | null>(null)

export default function PostIdProvider({ postId, children }: {
    postId: string,
    children: React.ReactNode
}) {
    return (
        <PostIdContext.Provider value={postId}>
            {children}
        </PostIdContext.Provider>
    )
}

export function getPostId() {
    return useContext(PostIdContext)
}