'use client'

import { useInView } from "framer-motion"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import styles from './postStat.module.css'
import SVGAnims from "@/app/components/SVGAnims/SVGAnims"

const ActionBar = dynamic(() =>
    import('@/app/components/ActionBar/ActionBar')
)

const CommentIsland = dynamic(() =>
    import('./CommentIsland')
)

export default function PostStats() {
    const divRef = useRef<HTMLDivElement>(null)
    const [isCommenting, setIsCommenting] = useState(false)
    const inView = useInView(divRef, {
        margin: '200px'
    })

    useEffect(() => {
        if (!inView) setIsCommenting(false)
    }, [inView])

    return (
        <div
            ref={divRef}
            className={styles['container']}
        >
            <ActionBar inView={inView} />
            <SVGAnims setIsCommenting={setIsCommenting} />
            <CommentIsland 
                isCommenting={isCommenting}
                setIsCommenting={setIsCommenting}
            />
        </div>
    )
}