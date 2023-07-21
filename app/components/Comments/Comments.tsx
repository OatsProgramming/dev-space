'use client'

import styles from './comments.module.css'
import useComments from "./hooks/useComments"
import useParentCommentId from './hooks/useParentCommentId'

export default function Comments() {
    const { comments, error, isLoading } = useComments()
    const { setParentCommentId } = useParentCommentId()

    if (isLoading) return <div>Loading</div>
    else if (error) return <div>Error</div>

    return (
        <div className={styles['container']}>
            {comments.length > 0 ? comments.map(comment => (
                <div key={comment.id}>
                    {/* TODO: THIS WILL MAKE AN INFINITE AMNT OF THREADS. PREVENT THIS */}
                    <div onClick={() => setParentCommentId(comment.id)}>
                        SET
                    </div>
                    <div onClick={() => setParentCommentId(null)}>
                        GO BACK
                    </div>
                    {comment.body}
                </div>
            )) : (
                <>
                    <div onClick={() => setParentCommentId(null)}>
                        GO BACK
                    </div>
                    <div> Theres nothing </div>
                </>
            )}
        </div>
    )
}