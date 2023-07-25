import Avatar from "@/app/components/Avatar/Avatar"
import MarkdownUI from "@/app/components/MarkdownUI/MarkdownUI"
import baseUrl from "@/app/utils/baseUrl"
import fetcher from "@/app/utils/fetchers/fetcher"
import getPostMetadata from "@/app/utils/getPostMetadata"
import postEx from "@/app/utils/toyData/postEx"
import Link from "next/link"
import styles from './page.module.css'
import PostStats from "../components/PostStats/PostStats"
import type { Metadata } from "next"
import type { Post } from "@prisma/client"
import FollowBtn from "@/app/components/FollowBtn/FollowBtn"
import PostIdProvider from "@/app/post/[postId]/context/PostIdProvider"
import dynamic from "next/dynamic"
import Loader from "@/app/components/Loader/Loader"

// Lazy load since no one reads the comments till the end (most of the time)
const Comments = dynamic(() =>
    import("@/app/components/Comments/Comments"), {
    loading: () => (
        <div className="defaultLoader">
            <Loader />
        </div>
    )
}
)

export async function generateMetadata({ params: { postId } }: {
    params: { postId: string }
}): Promise<Metadata> {
    const post = await fetcher(`${baseUrl}/api/post?postId=${postId}`) as Post & GeneralUserInfo

    return {
        title: post.title,
        creator: `${post.user.username} :: ${post.user.name}`,
        description: `By: ${post.user.username}. Created at: ${post.createdAt}. Last touched: ${post.updatedAt}`,
    }
}

export default async function Page({ params: { postId } }: {
    params: { postId: string }
}) {
    // const postPromise = fetcher(`${baseUrl}/api/post?postId=${postId}`) as Promise<Post & GeneralUserInfo>
    const post = await new Promise((resolve) => setTimeout(() => resolve(postEx.find(ex => ex.id === postId)), 10))
    if (!post) return <div>Not found</div>

    const { body, imgAlt, imgUrl, title, user, readTime, timeDiff, userId } = getPostMetadata(post as Post & GeneralUserInfo)
    const { username, image: userImg } = user
    return (
        <PostIdProvider postId={postId}>
            <main className={styles['container']}>
                <div className={styles['metadata']}>
                    <h1>{title}</h1>
                    <div className={styles['author']}>
                        <Avatar username={username} userId={userId} image={userImg} />
                        <div>
                            <div>
                                <Link href={`/profile/${username}`} className="userLink">
                                    <h3>{username}</h3>
                                </Link>
                                <FollowBtn userId={userId} />
                            </div>
                            <span>{readTime} ・ {timeDiff}</span>
                        </div>
                    </div>
                    {/* Uses parentId */}
                    <PostStats />
                    <div>
                        {imgUrl && (
                            <img
                                src={imgUrl}
                                alt={imgAlt}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <MarkdownUI text={body} />
                </div>
                {/* Uses parentId */}
                <Comments />
            </main>
        </PostIdProvider>
    )
}