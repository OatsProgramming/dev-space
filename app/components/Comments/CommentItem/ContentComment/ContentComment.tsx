'use client'

import { getSesh } from "@/app/components/SessionProviderC/SessionProviderC"
import useParentCommentId from "../../hooks/useParentCommentId"
import { getCommentContext } from "../ProviderComment/ProviderComment"
import styles from './contentComment.module.css'

export default function ContentComment({ setIsEditing }: {
    setIsEditing: (isEditing: boolean) => void,
}) {
    const { parentCommentId, setParentCommentId } = useParentCommentId()
    const comment = getCommentContext()
    const sesh = getSesh()

    if (!comment) throw new Error("Comment is null (this should never occur)")

    const isCreator = sesh?.user.id === comment.userId

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
                <div>
                    {/* TODO: only give the creator access to edit buttons */}
                    isCreator: {`${isCreator}`}
                </div>
                <div onClick={() => setIsEditing(true)}>
                    Edit
                </div>
            </div>
        </>
    )
}