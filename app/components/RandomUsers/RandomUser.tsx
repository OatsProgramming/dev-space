import userEx from "@/lib/toyData/userEx"
import UserCard from "./UserCard/UserCard"
import styles from './randomUsers.module.css'
import fetcher from "@/lib/fetchers/fetcher"
import baseUrl from "@/lib/baseUrl"

export default async function RandomUsers({ username }: {
    username?: string
}) {
    const users = await fetcher(`${baseUrl}/api/randomUsers`) as UserResponseSML[]
    
    return (
        <div className={styles['container']}>
            {users.map((user, i) => (
                <UserCard user={user} key={i}/>
            ))}
        </div>
    )
}