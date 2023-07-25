import Link from "next/link"
import type { Metadata } from "next"
import styles from './layout.module.css'
import userEx from "@/app/utils/toyData/userEx"
import Avatar from "@/app/components/Avatar/Avatar"
import Test from "./test"

export type Params = {
    userId: string,
    userCategory: "posts" | "followers" | "follows"
}

// // TODO: Maybe integrate bio?
export async function generateMetadata({ params: { userId } }: {
    params: Params
}): Promise<Metadata> {
    // const user = await fetcher(`${baseUrl}/api/user?userId=${userId}`) as UserResponse
    const user = await new Promise((resolve) => setTimeout(() => resolve(userEx[0]), 100)) as UserResponse
    const { username, bio } = user

    return {
        title: `${username}'s Profile`,
        description: bio
    }
}

// Note to self abt Link href (only): 
// apparently having a "/" at the start means from root
// and having no "/" means from current url position
export default async function Layout({ children, params: { userId } }: {
    children: React.ReactNode,
    params: {
        userId: string,
    }
}) {
    const user = await new Promise((resolve) => setTimeout(() => resolve(userEx[0]), 0)) as UserResponse
    const { username, image, name, postsCount, followersCount, followsCount } = user

    return (
        <div className={styles['container']}>
            <section className={styles['userInfo']}>
                <div className={styles['avatar']}>
                    <Avatar
                        username={username}
                        image={image}
                        userId={userId}
                        size="lrg"
                        removeLink
                    />
                </div>
                <div className={styles['username']}>
                    <div>
                        <h1>{username}</h1>
                        <h3>{name}</h3>
                    </div>
                </div>
                <div className={styles['bio']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis arcu purus, ullamcorper pellentesque felis posuere id. Aliquam erat dui, tempor et facilisis et, vestibulum sit amet lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec efficitur varius hendrerit. Donec euismod hendrerit velit id hendrerit. Suspendisse convallis cursus urna, ut molestie turpis. Proin eget nisi dolor. Curabitur ac risus in magna finibus faucibus a id ex. Morbi ultrices orci arcu, id bibendum massa bibendum at. Phasellus sed fringilla diam. Suspendisse sed malesuada turpis. Vivamus in fermentum dolor. Mauris dignissim in enim ac eleifend. Nam sit amet velit ligula.
                </div>
                <div className={styles['actionBtns']}>
                    <div>
                        Follow
                    </div>
                    <div>
                        Share
                    </div>
                </div>
                <div className={styles['links']}>
                    <Link href={`/profile/${userId}/posts`}>
                        <span>
                            Posts
                        </span>
                        <span>
                            {postsCount}
                        </span>
                    </Link>
                    <Link href={`/profile/${userId}/followers`}>
                        <span>
                            Followers
                        </span>
                        <span>
                            {followersCount}
                        </span>
                    </Link>
                    <Link href={`/profile/${userId}/follows`}>
                        <span>
                            Follows
                        </span>
                        <span>
                            {followsCount}
                        </span>
                    </Link>
                </div>
            </section>
            <Test>
                {children}
            </Test>
        </div>
    )
}