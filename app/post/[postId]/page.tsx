import Avatar from "@/app/components/Avatar/Avatar"
import MarkdownUI from "@/app/components/MarkdownUI/MarkdownUI"
import baseUrl from "@/lib/baseUrl"
import fetcher from "@/lib/fetchers/fetcher"
import getPostMetadata from "@/lib/getPostMetadata"
import postEx from "@/lib/toyData/postEx"
import Link from "next/link"
import styles from './page.module.css'
import PostStats from "./PostStats/PostStats"

export default async function Page({ params: { postId } }: {
    params: { postId: string }
}) {
    // const post = await fetcher(`${baseUrl}/api/post?postId=${postId}`) as Post & GeneralUserInfo
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