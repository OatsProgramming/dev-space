'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './notif.module.css'
import { AnimatePresence, m, LazyMotion } from 'framer-motion'
import { container, item } from './notifVariants'
import NotifCard from './NotifCard/NotifCard'
import textEX from '@/lib/toyData/textEx'

const loadFeatures = () =>
    import('@/lib/framer/domAnimation').then(mod => mod.default)

export default function Notif() {
    const [isOpen, setIsOpen] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClose(e: PointerEvent) {
            const div = divRef.current
            if (!div) return
            
            const clickedEl = e.target as HTMLElement
            if (!div.contains(clickedEl)) setIsOpen(false)
        }

        document.body.addEventListener('pointerdown', handleClose)
        return () => {
            document.body.removeEventListener('pointerdown', handleClose)
        }
    }, [divRef])

    return (
        <div ref={divRef} className={styles['container']}>
            <div className='svgContainer' onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
            </div>
            <LazyMotion features={loadFeatures}>
                <AnimatePresence>
                    {isOpen && (
                        <m.div
                            className={styles['modal']}
                            variants={container}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                        >
                            <div>
                                {textEX.map((ex, idx) => (
                                    <m.div
                                        key={idx}
                                        variants={item}
                                    >
                                        <NotifCard notif={ex} />
                                    </m.div>
                                ))}
                            </div>
                            <button onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    )
}