'use client'

import useParentCommentId from '../hooks/useParentCommentId'
import styles from './commentItem.module.css'

export default function CommentItem({ comment }: {
    comment: CommentResponse
}) {
    const { parentCommentId, setParentCommentId } = useParentCommentId()

    return (
        <div className={styles['container']}>
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
            </div>
        </div>
    )
}