import styles from './postCard.module.css'
import Avatar from '../Avatar/Avatar'
import Link from 'next/link'
import getPostMetadata from '@/app/utils/getPostMetadata'
import ProfileLink from '../ProfileLink/ProfileLink'

export default function PostCard({ post, isSimple }: {
    post: PostResponse,
    isSimple?: true
}) {

    const { title, body, id, user, readTime, timeDiff, imgAlt, imgUrl, userId } = getPostMetadata(post)
    const { username, image: userImg } = user

    return (
        // Simpler to just do this instead of creating a grid
        <div>
            {!isSimple && (
                <div className={styles['complexMeta']}>
                    <Avatar username={username} userId={userId} image={userImg} />
                    <div>
                        <ProfileLink userId={userId}>
                            <span>{username}</span>
                        </ProfileLink>
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