import userEx from "@/app/utils/toyData/userEx"
import UserCard from "../UserCard/UserCard"
import styles from './randomCards.module.css'
import fetcher from "@/app/utils/fetchers/fetcher"
import baseUrl from "@/app/utils/baseUrl"
import { areComments, arePosts, areUsers } from "./validators"
import PostCard from "../PostCard/PostCard"
import Comments from "../Comments/Comments"

export default async function RandomCards({ category }: {
    category: RandomCategoryParam
}) {
    const items = await fetcher(`${baseUrl}/api/random/${category}`) as RandomCardType[typeof category]

    if (arePosts(items)) {
        return (
            <div className={styles['container']}>
                {items.map((item) => (
                    <PostCard post={item} key={item.id} isSimple />
                ))}
            </div>
        )
    }

    else if (areUsers(items)) {
        return (
            <div className={styles['container']}>
                {items.map((item) => (
                    <UserCard user={item} key={item.id} />
                ))}
            </div>
        )
    }

    // TODO: Figure out if you're planning to use areComments
    // else if (areComments(items)) {
    //     return (
    //         <div className={styles['container']}>
    //             {items.map((item, i) => (
    //                 <Comments user={item} key={i} />
    //             ))}
    //         </div>
    //     )
    // }

    
    // const items = userEx

    else {
        return (
            <div className={styles['container']}>
                <div>Unknown category</div>
            </div>
        )
    }
}