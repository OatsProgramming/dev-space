import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styles from './postCard.module.css'
import type { Post } from '@prisma/client'
import getReadTime from '@/lib/getReadTime'
import Avatar from '../Avatar/Avatar'
import Link from 'next/link'
import parseImgUrl from '@/lib/parseImgUrl'

export default function PostCard({ post, isSimple }: {
    post: Post & GeneralUserInfo,
    isSimple?: true
}) {

    const { title, body, createdAt, updatedAt, id, image, user } = post
    const { username, image: userImg, name } = user

    let imgAlt = "Cool image"
    let imgUrl = image
    if (!image) {
        const res = parseImgUrl(body)
        imgAlt = res.imgAlt || imgAlt
        imgUrl = res.imgUrl || null
    }

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
                    <Avatar username={username} image={userImg} />
                    <div>
                        <Link href={`/profile/${username}`}>
                            {username}
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
                        {(!isSimple && imgUrl) && (
                            <img
                                loading='lazy'
                                src={imgUrl}
                                alt="Cool Image"
                                width={100}
                            />
                        )}
                    </div>
                    {isSimple && (
                        <div className={styles['metadata']}>
                            <div>{username} ・ {timeDiff}</div>
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