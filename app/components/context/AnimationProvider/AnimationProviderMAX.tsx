'use client'

import { AnimatePresence, LazyMotion } from 'framer-motion'

const loadFeatures = () =>
    import('@/lib/framer/domMax').then(mod => mod.default)

/**
 * To lazy load animations (Provides all of the features of Framer Motion)
 * @param children
 * @returns 
 */
export default function AnimationProviderMAX({ children, mode = "sync" }: {
    children: React.ReactNode,
    mode?: "wait" | "popLayout" | "sync"
}) {

    return (
        <LazyMotion features={loadFeatures}>
            <AnimatePresence mode={mode}>
                {children}
            </AnimatePresence>
        </LazyMotion>
    )
}