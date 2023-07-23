'use client'

import useTheme from "@/lib/zustand/useTheme"
import { useEffect, useRef } from "react"

// Created this fn to deal w/ fillColor issue w/ base64 imgs
export default function Icon({ img, alt, safeDimensions = { width: 100, height: 100 } }: {
    img: string,
    alt: string,
    safeDimensions?: {
        width?: number,
        height?: number,
    }
}) {
    const imgRef = useRef<HTMLImageElement>(null)
    const { isLight } = useTheme()

    useEffect(() => {
        const img = imgRef.current
        if (!img) return 
        else if (isLight) img.style.filter = ''
        else img.style.filter = 'invert(1)'

    }, [imgRef.current, isLight])

    return (
        <img
            loading='lazy'
            src={img}
            alt={alt}
            width={safeDimensions.width}
            height={safeDimensions.height}
            ref={imgRef}
        />
    )
}