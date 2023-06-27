import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styles from './postCard.module.css'
import type { Post } from '@prisma/client'
import getReadTime from '@/lib/getReadTime'
import NoAvatar from '../NoAvatar/NoAvatar'
import Link from 'next/link'

export default function PostCard({ post, isSimple }: {
    post: Post,
    isSimple?: true
}) {
    const { title, body, createdAt, updatedAt, createdBy, id } = post
    const isUpdated = +createdAt !== +updatedAt

    let latest = createdAt
    if (isUpdated) latest = updatedAt

    const timeDiff = formatDistanceToNow(latest, { includeSeconds: true, addSuffix: true })
    const readTime = getReadTime(body)

    return (
        // Simpler to just do this instead of creating a grid
        <div>
            {!isSimple && (
                <div className={styles['complexMeta']}>
                    <NoAvatar username={createdBy} />
                    <div>
                        <Link href={`/profile/${createdBy}`}>
                            {createdBy}
                        </Link> 
                        <span>
                            &nbsp;・ {timeDiff}
                        </span>
                    </div>
                </div>
            )}
            <Link href={`/post/${id}`}>
                <div className={styles[isSimple ? 'container' : 'complexContainer']}>
                    <div className={styles['content']}>
                        <div>
                            <h2>{title}</h2>
                            <div>{body}</div>
                        </div>
                        {!isSimple && <div>IMG</div>}
                    </div>
                    {isSimple && (
                        <div className={styles['metadata']}>
                            <div>{createdBy} ・ {timeDiff}</div>
                        </div>
                    )}
                    <div className={styles['readTime']}>
                        Read : {readTime}
                    </div>
                </div>
            </Link>
        </div>
    )
}