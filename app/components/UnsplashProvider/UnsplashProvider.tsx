'use client'

import { useRef } from "react"
import toggleDialog from "@/lib/toggleDialog"
import dynamic from "next/dynamic"

// Dont give it a loader (?)
const UnsplashDialog = dynamic(() => 
    import("./Dialog/UnsplashDialog")
)

export default function UnsplashProvider() {
    const dialogRef = useRef<HTMLDialogElement>(null)

    return (
        <div>
            <div onPointerDown={() => toggleDialog(dialogRef)}>
                Open
            </div>
            <UnsplashDialog dialogRef={dialogRef} />
        </div>
    )
}