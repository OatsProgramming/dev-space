import styles from './postCard.module.css'
import type { Post } from '@prisma/client'
import Avatar from '../Avatar/Avatar'
import Link from 'next/link'
import parseImgUrl from '@/lib/parseImgUrl'
import getPostMetadata from '@/lib/getPostMetadata'

export default function PostCard({ post, isSimple }: {
    post: Post & GeneralUserInfo,
    isSimple?: true
}) {

    const { title, body, id, user, readTime, timeDiff, imgAlt, imgUrl } = getPostMetadata(post)
    const { username, image: userImg } = user

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
                                alt={imgAlt}
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