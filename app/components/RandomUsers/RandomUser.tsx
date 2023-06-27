import userEx from "@/lib/toyData/userEx"
import UserCard from "./UserCard/UserCard"
import styles from './randomUsers.module.css'

export default function RandomUsers({ username }: {
    username?: string
}) {
    return (
        <div className={styles['container']}>
            {userEx.map((user, i) => (
                <UserCard user={user} key={i}/>
            ))}
        </div>
    )
}