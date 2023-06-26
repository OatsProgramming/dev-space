import { AnimatePresence, LazyMotion, m } from 'framer-motion'
import { leftSide, rightSide, backdrop } from './modalVariants'
import styles from './modalSlide.module.css'

const loadFeatures = () =>
    import('@/lib/framer/domAnimation').then(mod => mod.default)

export default function ModalSlide({ children, isOpen, setIsOpen, isLeft }: {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    isLeft?: true
}) {
    const slideSide = isLeft ? leftSide : rightSide
    return (
        <div className={styles['container']}>
            <LazyMotion features={loadFeatures}>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <m.div
                                onClick={() => setIsOpen(false)}
                                className={styles['backdrop']}
                                variants={backdrop}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                            />
                            <m.div
                                className={`
                                    ${styles['slide']}
                                    ${isLeft && styles['softRight']}
                                `}
                                variants={slideSide}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                transition={{
                                    duration: 0.5,
                                    ease: 'circOut',
                                }}
                            >
                                <div onPointerDown={() => setIsOpen(false)} className={styles['close']}>
                                    X
                                </div>
                                {children}
                            </m.div>
                        </>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    )
}