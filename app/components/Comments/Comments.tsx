import baseUrl from "@/lib/baseUrl"
import fetcher from "@/lib/fetchers/fetcher"
import { ActionCommentParam } from "../ActionBar/ActionComment/ActionComment"
import styles from './comments.module.css'

export default async function Comments({ parentId }: {
    parentId: ActionCommentParam['parentId']
}) {
    let url;
    if ('postId' in parentId) {
        url = `${baseUrl}/api/comment?postId=${parentId.postId}`
    }

    else if ('parentCommentId' in parentId) {
        url = `${baseUrl}/api/comment?commentId=${parentId.parentCommentId}`
    }

    else {
        throw new Error('Parent ID not given for comments section')  
    }

    const comments = await fetcher(url) as CommentResponse[]
    return (
        <div className={styles['container']}>
            {comments.map(comment => (
                <div key={comment.id}>
                    {comment.body}
                </div>
            ))}
        </div>
    )
}