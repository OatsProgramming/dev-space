import { createContext, useContext, useEffect, useState } from "react";
import type { RefObject } from "react";

const TextareaContext = createContext<HTMLTextAreaElement | null>(null)

export default function TextareaProvider({ textareaRef, children }: {
    textareaRef: RefObject<HTMLTextAreaElement>,
    children: React.ReactNode
}) {
    const [textarea, setTextarea] = useState(textareaRef.current)
    
    useEffect(() => {
        setTextarea(textareaRef.current)
    }, [textareaRef.current])

    return (
        <TextareaContext.Provider value={textarea}>
            {children}
        </TextareaContext.Provider>
    )
}

export function getTextarea() {
    return useContext(TextareaContext)
}