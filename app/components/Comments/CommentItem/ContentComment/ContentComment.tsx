'use client'

import useParentCommentId from "../../hooks/useParentCommentId"
import { getCommentContext } from "../ProviderComment/ProviderComment"
import styles from './contentComment.module.css'
import ModalComment from "../ModalComment/ModalComment"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export default function ContentComment({ setIsEditing }: {
    setIsEditing: (isEditing: boolean) => void,
}) {
    const arrows = [1, 2, 3]
    const comment = getCommentContext()
    const { parentCommentId, setParentCommentId } = useParentCommentId()

    if (!comment) throw new Error("Comment is null (this should never occur)")

    const createdAt = new Date(comment.createdAt)
    const updatedAt = new Date(comment.updatedAt)

    // Check if it has been updated
    const isUpdated = (+updatedAt - +createdAt) > 0

    // Determine which date to use 
    const timeDiff = formatDistanceToNow(
        isUpdated 
            ? updatedAt 
            : createdAt,
        { 
            includeSeconds: true, 
            addSuffix: true 
        }
    )

    return (
        <>
            <div className={styles['content']}>

                <div className={styles['metadata']}>
                    <span>
                        {comment.user.name} ::&nbsp;
                    </span>
                    <span>
                        {isUpdated
                            ? `Updated ${timeDiff}`
                            : timeDiff
                        }
                    </span>
                </div>
                <div className={styles['body']}>
                    {comment.body}
                </div>
            </div>

            <div className={styles['actions']}>
                {/* Prevent user from going down an infinite thread */}
                {!parentCommentId && (
                    <div onClick={() => setParentCommentId(comment.id)}>
                        {comment.replyCount > 1 ? `See all ${comment.replyCount} replies` : "See replies"}
                        &nbsp;
                        {/* TODO: set a hover animation for this */}
                        {arrows.map(arrow => (
                            <span key={arrow}>
                                ▹
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <ModalComment
                setIsEditing={setIsEditing}
            />
        </>
    )
}