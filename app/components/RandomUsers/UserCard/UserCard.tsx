import Link from 'next/link'
import Avatar from '../../Avatar/Avatar'
import styles from './userCard.module.css'

export default function UserCard({ user }: {
    user: UserResponseSML
}) {
    const { followersCount, followsCount, name, postsCount, username, image, id: userId } = user
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
                        Followers: <span>{followersCount}</span>
                    </span>
                    <hr />
                    <span>
                        Follows: <span>{followsCount}</span>
                    </span>
                    <hr />
                    <span>
                        Posts: <span>{postsCount}</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}