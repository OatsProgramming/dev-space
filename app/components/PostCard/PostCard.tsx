import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styles from './postCard.module.css'
import type { Post } from '@prisma/client'
import getReadTime from '@/lib/getReadTime'

export default function PostCard({ post, isSimple }: {
    post: Post,
    isSimple?: true
}){
    const { title, body, createdAt, updatedAt, createdBy } = post
    const isUpdated = +createdAt !== +updatedAt

    let latest = createdAt
    if (isUpdated) latest = updatedAt

    const timeDiff = formatDistanceToNow(latest, { includeSeconds: true, addSuffix: true })
    const readTime = getReadTime(body)

    return (
        <div className={styles['container']}>
            <div className={styles['content']}>
                <h2>{title}</h2>
                <div>{body}</div>
            </div>
            <div className={styles['metadata']}>
                <div>Read : {readTime}</div>
                <div>{createdBy} ・ {timeDiff}</div>
            </div>
        </div>
    )
}