'use client'

import useParentCommentId from "../../hooks/useParentCommentId"
import { getCommentContext } from "../ProviderComment/ProviderComment"
import styles from './contentComment.module.css'
import ModalComment from "../ModalComment/ModalComment"

export default function ContentComment({ setIsEditing }: {
    setIsEditing: (isEditing: boolean) => void,
}) {
    const comment = getCommentContext()
    const { parentCommentId, setParentCommentId } = useParentCommentId()

    if (!comment) throw new Error("Comment is null (this should never occur)")

    return (
        <>
            <div className={styles['body']}>
                {comment.body}
            </div>
            <div className={styles['actions']}>
                {/* Prevent user from going down an infinite thread */}
                {!parentCommentId && (
                    <div onClick={() => setParentCommentId(comment.id)}>
                        {comment.replyCount > 1 ? `See all ${comment.replyCount} replies` : "See replies"}
                    </div>
                )}
                <div onClick={() => setParentCommentId(null)}>
                    GO BACK
                </div>
                <ModalComment
                    setIsEditing={setIsEditing}
                />
            </div>
        </>
    )
}