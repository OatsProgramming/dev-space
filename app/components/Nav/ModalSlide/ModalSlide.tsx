import { AnimatePresence, LazyMotion, m } from 'framer-motion'
import { leftSide, rightSide, backdrop } from './modalVariants'
import styles from './modalSlide.module.css'

const loadFeatures = () =>
    import('@/lib/framer/domAnimation').then(mod => mod.default)

export default function ModalSlide({ children, isOpen, isLeft }: {
    children: React.ReactNode,
    isOpen: boolean,
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
                                className={styles['backdrop']}
                                variants={backdrop}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                            />
                            <m.div
                                className={styles['slide']}
                                variants={slideSide}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                            >
                                {children}
                            </m.div>
                        </>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    )
}