import Link from 'next/link'
import Avatar from '../../Avatar/Avatar'
import styles from './userCard.module.css'

export default function UserCard({ user }: {
    user: RandomUserResponse
}) {
    const { followers, follows, name, postsMade, username, image, userId } = user
    return (
        <Link href={`/profile/${userId}`}>
            <div className={styles['container']}>
                <div className={styles['userInfo']}>
                    <Avatar username={username} image={image} removeLink />
                    <div>
                        <h1>{username}</h1>
                        <p>{name}</p>
                    </div>
                </div>
                <div className={styles['userStats']}>
                    <span>
                        Followers: <span>{followers.length}</span>
                    </span>
                    <hr />
                    <span>
                        Follows: <span>{follows.length}</span>
                    </span>
                    <hr />
                    <span>
                        Posts: <span>{postsMade}</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}