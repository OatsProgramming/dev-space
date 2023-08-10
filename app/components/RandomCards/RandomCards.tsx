// import userEx from "@/app/utils/toyData/userEx"
import UserCard from "../UserCard/UserCard"
import styles from './randomCards.module.css'
import fetcher from "@/app/utils/fetchers/fetcher"
import baseUrl from "@/app/utils/baseUrl"
import PostCard from "../PostCard/PostCard"
import ProviderComment from "../Comments/CommentItem/ProviderComment/ProviderComment"
import CommentItem from "../Comments/CommentItem/CommentItem"

export default async function RandomCards({ category }: {
    category: RandomCategoryParam
}) {
    const items = await fetcher(`${baseUrl}/api/random/${category}`) as RandomCardType[typeof category]
    
    return (
        <div className={styles['container']}>
            {items.map(item => (
                category === 'posts'
                    ? <PostCard post={item as PostResponse} key={item.id}/> 
                    : category === 'users'
                        ? <UserCard user={item as UserResponse} key={item.id} />
                        // TODO: Consider whether or not to keep this. 
                        // Might be a hassle to refactor this for a different UI 
                        // to click to main post instead of just the replies...
                        : (
                            <ProviderComment
                                comment={item as CommentResponse}
                                key={item.id}
                            >
                                <CommentItem />
                            </ProviderComment>
                        )
            ))}
        </div>
    )
}