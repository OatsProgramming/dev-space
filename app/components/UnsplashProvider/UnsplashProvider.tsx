'use client'

import { useState } from "react"
import dynamic from "next/dynamic"

// Dont give it a loader (?)
const UnsplashDialog = dynamic(() =>
    import("./Dialog/UnsplashDialog")
)

export default function UnsplashProvider() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div onPointerDown={() => setIsOpen(true)}>
                Open
            </div>
            {isOpen && (
                <UnsplashDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </div>
    )
}