'use client'

import { AnimatePresence, LazyMotion } from 'framer-motion'

const loadFeatures = () =>
    import('@/lib/framer/domAnimation').then(mod => mod.default)

/**
 * To lazy load animations (Provides only the following: animations, variants, exit animations, and tap/hover/focus gestures).
 * @param children
 * @returns 
 */
export default function AnimationProvider({ children, mode = "sync" }: {
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