'use client'

import { useState } from 'react'
import styles from './actionBar.module.css'
import { m } from 'framer-motion'
import { container } from './variants'
import dynamic from 'next/dynamic'
import AnimationProviderMAX from '../AnimationProvider/AnimationProviderMAX'
import SVGAnims from '../SVGAnims/SVGAnims'

const ActionComment = dynamic(() =>
    import('./ActionComment/ActionComment')
)

export default function ActionBar({ inView }: {
    inView: boolean
}) {
    const [isCommenting, setIsCommenting] = useState(false)

    return (
        <AnimationProviderMAX>
            {!inView && (
                <m.div
                    className={styles['container']}
                    variants={container}
                    animate='animate'
                    exit='exit'
                    // TODO: Figure out a way to properly animate "scale" to no longer need preserve-aspect
                    transition={{
                        type: 'spring',
                        bounce: 0.5,
                        layout: {
                            type: 'spring',
                            duration: 0.7,
                            bounce: 0.4,
                        }
                    }}
                    layout='preserve-aspect'
                    layoutDependency={isCommenting}
                >
                    {!isCommenting ? (
                        <SVGAnims setIsCommenting={setIsCommenting} />
                    ) : (
                        <ActionComment setIsCommenting={setIsCommenting} />
                    )}
                </m.div>
            )}
        </AnimationProviderMAX>
    )
}