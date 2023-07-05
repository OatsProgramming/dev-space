import { m } from "framer-motion";
import { modalContainer, modalItems } from "../variants";
import styles from './extraAction.module.css'
import AnimationProvider from "../../AnimationProvider/AnimationProvider";

export default function ExtraActions({ isOpen }: {
    isOpen: boolean
}) {
    return (
        <AnimationProvider>
            {isOpen && (
                <m.div
                    className={styles['modal']}
                    variants={modalContainer}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                >
                    <m.div
                        variants={modalItems}
                    >
                        Share
                    </m.div>
                    <m.hr
                        variants={modalItems}
                    />
                    <m.div
                        variants={modalItems}
                    >
                        Block
                    </m.div>
                    <m.hr
                        variants={modalItems}
                    />
                    <m.div
                        variants={modalItems}
                    >
                        Report
                    </m.div>
                </m.div>
            )}
        </AnimationProvider>
    )
}