'use client'

import { AnimatePresence, LazyMotion, m } from "framer-motion"
import type { Variants } from 'framer-motion'

const loadFeatures = () =>
    import('@/lib/framer/domAnimation').then(mod => mod.default)

const variant: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: { 
        opacity: 0,
    }
}   

export default function Page({ params: { userCategory, userId } }: {
    params: {
        userCategory: "posts" | "follows" | "followers",
        userId: string,
    }
}) {

    return (
        <LazyMotion features={loadFeatures}>
            <AnimatePresence>
                <m.main
                    variants={variant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    Hola nino.
                </m.main>
            </AnimatePresence>
        </LazyMotion>
    )
}