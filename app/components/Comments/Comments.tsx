'use client'

import CommentItem from './CommentItem/CommentItem'
import CommentsSkeleton from './CommentsSkeleton/CommentsSkeleton'
import styles from './comments.module.css'
import useComments from "./hooks/useComments"
import useParentCommentId from './hooks/useParentCommentId'

export default function Comments() {
    const { comments, error, isLoading } = useComments()
    const { parentCommentId, setParentCommentId } = useParentCommentId()

    if (true) return <CommentsSkeleton />
    else if (error) return <div>Error</div>

    return (
        <div className={styles['container']}>
            {comments.length > 0 ? comments.map(comment => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                />
            )) : (
                <>
                    {parentCommentId && (
                        <div onClick={() => setParentCommentId(null)}>
                            GO BACK
                        </div>
                    )}
                    <div> Theres nothing </div>
                </>
            )}
        </div>
    )
}