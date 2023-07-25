import ActionComment from "@/app/post/components/ActionBar/ActionComment/ActionComment";
import { container } from "@/app/post/components/ActionBar/variants";
import AnimationProvider from "@/app/components/context/AnimationProvider/AnimationProvider";
import { m } from "framer-motion";
import styles from './postStat.module.css'

/**
 * Note: not to be reused anywhere. 
 * This component exists primarily to be lazy loaded for PostStats.
 */
export default function CommentIsland({ isCommenting, setIsCommenting }: {
    isCommenting: boolean,
    setIsCommenting: (isCommenting: boolean) => void
}) {
    return (
        <AnimationProvider>
            {isCommenting && (
                <m.div
                    className={styles['comment']}
                    variants={container}
                    animate='animate'
                    exit='exit'
                >
                    <ActionComment setIsCommenting={setIsCommenting} />
                </m.div>
            )}
        </AnimationProvider>
    )
}