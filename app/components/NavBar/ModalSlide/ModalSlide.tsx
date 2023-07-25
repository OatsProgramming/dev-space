import { m } from 'framer-motion'
import { leftSide, rightSide, backdrop } from './modalVariants'
import styles from './modalSlide.module.css'
import AnimationProvider from '../../context/AnimationProvider/AnimationProvider'

export default function ModalSlide({ children, isOpen, setIsOpen, isLeft }: {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    isLeft?: true
}) {
    const slideSide = isLeft ? leftSide : rightSide
    return (
        <div className={styles['container']}>
            <AnimationProvider>
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
            </AnimationProvider>
        </div>
    )
}