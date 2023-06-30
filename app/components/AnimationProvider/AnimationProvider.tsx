'use client'

import { AnimatePresence, LazyMotion } from 'framer-motion'

const loadFeatures = () =>
    import('@/lib/framer/domAnimation').then(mod => mod.default)

/**
 * To lazy load animations
 * @param children
 * @returns 
 */
export default function AnimationProvider({ children }: {
    children: React.ReactNode,
}) {

    return (
        <LazyMotion features={loadFeatures}>
            <AnimatePresence>
                {children}
            </AnimatePresence>
        </LazyMotion>
    )
}