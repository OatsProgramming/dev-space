'use client'

import styles from './comments.module.css'
import styles2 from './CommentItem/commentItem.module.css'

import CommentItem from './CommentItem/CommentItem'
import ProviderComment from './CommentItem/ProviderComment/ProviderComment'
import CommentsSkeleton from './CommentsSkeleton/CommentsSkeleton'
import useComments from "./hooks/useComments"
import useParentCommentId from './hooks/useParentCommentId'
import ArrowAnim from './ArrowAnim/ArrowAnim'

export default function Comments() {
    const { comments, error, isLoading } = useComments()
    const { parentCommentId, setParentCommentId } = useParentCommentId()

    if (isLoading) return <CommentsSkeleton />
    // TODO: show a proper error message
    else if (error) {
        console.error(error)
        return (
            <div className={styles2['container']}>
                System: failed to load comments. See log for more info.
            </div>
        )
    }

    return (
        <div className={styles['container']}>

            {/* If user is in a comment thread */}
            {parentCommentId && (
                <ArrowAnim isLeft onClick={() => setParentCommentId(null)}>
                    GO BACK
                </ArrowAnim>
            )}

            {comments.length > 0 ? comments.map(comment => (
                <ProviderComment
                    key={comment.id}
                    comment={comment}
                >
                    <CommentItem />
                </ProviderComment>
            )) : (
                <div> Theres nothing </div>
            )}
        </div>
    )
}