import Avatar from "@/app/components/Avatar/Avatar"
import MarkdownUI from "@/app/components/MarkdownUI/MarkdownUI"
import baseUrl from "@/lib/baseUrl"
import fetcher from "@/lib/fetchers/fetcher"
import getPostMetadata from "@/lib/getPostMetadata"
import postEx from "@/lib/toyData/postEx"
import Link from "next/link"
import styles from './page.module.css'
import PostStats from "./PostStats/PostStats"
import type { Metadata } from "next"
import type { Post } from "@prisma/client"
import FollowBtn from "@/app/components/FollowBtn/FollowBtn"
import ParentIdProvider from "@/app/components/ActionBar/ActionComment/ParentIdProvider"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// DONT USE CODE BELOW: apparently it causes session token to go null

// export const dynamic = 'force-static'
// export async function generateStaticParams({ params: { postId }}: {
//     params: { postId: string }
// }) { 
//     // const session = await getSesh()

//     let url = `${baseUrl}/api/posts`
//     // if (session) url = `${baseUrl}/api/posts?userId=${session.user.id}`

//     const posts = await fetcher(url) as (Post & GeneralUserInfo)[]
//     return posts.map(post => ({
//         params: { postId: post.id }
//     }))
// }

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
    // const [post, session] = await Promise.all([postPromise, sessionPromise])
    const post = await new Promise((resolve) => setTimeout(() => resolve(postEx.find(ex => ex.id === postId)), 10))
    if (!post) return <div>Not found</div>

    const { body, imgAlt, imgUrl, title, user, readTime, timeDiff, userId } = getPostMetadata(post as Post & GeneralUserInfo)
    const { username, image: userImg } = user

    return (
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
                <ParentIdProvider parentId={{ postId }}>
                    <PostStats />
                </ParentIdProvider>
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
        </main>
    )
}