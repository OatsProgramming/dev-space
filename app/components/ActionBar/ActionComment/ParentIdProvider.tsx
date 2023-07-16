'use client'

import { createContext, useContext } from "react";
import { ActionCommentParam } from "./ActionComment";

const ParentIdContext = createContext<ActionCommentParam['parentId'] | null>(null)

export default function ParentIdProvider({ parentId, children }: {
    parentId: ActionCommentParam['parentId'],
    children: React.ReactNode
}) {
    return (
        <ParentIdContext.Provider value={parentId}>
            {children}
        </ParentIdContext.Provider>
    )
}

export function getParentId() {
    return useContext(ParentIdContext)
}