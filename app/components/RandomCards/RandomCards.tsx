import userEx from "@/lib/toyData/userEx"
import UserCard from "../UserCard/UserCard"
import styles from './randomCards.module.css'
import fetcher from "@/lib/fetchers/fetcher"
import baseUrl from "@/lib/baseUrl"

// TODO: Associate to proper cardsz
export default async function RandomCards({ category }: {
    category: RandomCategoryParam
}) {
    // const items = await fetcher(`${baseUrl}/api/random/${category}`)
    const items = userEx
    return (
        <div className={styles['container']}>
            {items.map((item, i) => (
                <UserCard user={item} key={i} />
            ))}
        </div>
    )
}