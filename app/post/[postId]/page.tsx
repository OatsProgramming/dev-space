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
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function generateMetadata({ params: { postId }}: {
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
    // const sessionPromise = getServerSession(authOptions)
    // const [post, session] = await Promise.all([postPromise, sessionPromise])

    const { body, imgAlt, imgUrl, title, user, readTime, timeDiff, userId } = getPostMetadata(postEx[2])
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
                            ・
                            <div>
                                Follow
                            </div>
                        </div>
                        <span>{readTime} ・ {timeDiff}</span>
                    </div>
                </div>
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
        </main>
    )
}