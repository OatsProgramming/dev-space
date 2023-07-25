'use client'

import AnimationProvider from "@/app/components/context/AnimationProvider/AnimationProvider"
import { useParams } from "next/navigation"
import { m } from "framer-motion"
import type { Variants } from 'framer-motion'
import { Params } from "./layout"

// IT WORKS; however, it stutters. Check this component and contents in children comp 
// when not sleepy
const anim: Variants = {
    init: {
        opacity: 0,
    },
    anim: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

export default function Test({ children }: {
    children: React.ReactNode
}) {
    const params = useParams() as Params
    return (
        <AnimationProvider mode='wait'>
            <m.div
                key={params.userCategory}
                variants={anim}
                initial='init'
                animate='anim'
                exit='exit'
            // transition={{ duration: 1 }}
            >
                {children}
            </m.div>
        </AnimationProvider>
    )
}