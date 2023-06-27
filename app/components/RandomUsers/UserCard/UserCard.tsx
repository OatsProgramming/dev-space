import Link from 'next/link'
import NoAvatar from '../../NoAvatar/NoAvatar'
import styles from './userCard.module.css'

export default function UserCard({ user }: {
    user: RandomUserResponse
}) {
    const { followers, follows, name, postsMade, username, image } = user
    return (
        <Link href={`/profile/${username}`}>
            <div className={styles['container']}>
                <div className={styles['userInfo']}>
                    {image ? (
                        <div>IMG</div>
                    ) : (
                        <NoAvatar username={username} removeLink/>
                    )}
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