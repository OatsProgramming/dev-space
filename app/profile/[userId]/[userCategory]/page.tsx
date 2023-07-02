'use client'

import type { Post } from "@prisma/client"
import UserCard from "@/app/components/RandomUsers/UserCard/UserCard"
import PostCard from "@/app/components/PostCard/PostCard"
import styles from './page.module.css'
import AnimationProvider from "@/app/components/AnimationProvider/AnimationProvider"
import { m } from "framer-motion"
import { container, item } from "./pageVariants"
import useUserMetrics from "../../useUserMetrics"
import { useEffect } from "react"

type UserMetrics = (Post & GeneralUserInfo)[] | UserResponse[]

function areUsers(metrics: UserMetrics): metrics is UserResponse[] {
    return 'postsCount' in metrics[0]
}

export default function Page({ params: { userCategory, userId } }: {
    params: {
        userCategory: "posts" | "follows" | "followers",
        userId: string,
    }
}) {

    const { userMetrics, isLoading, error, controller } = useUserMetrics({ userCategory, userId })

    useEffect(() => {
        return () => {
            controller.abort()
        }
    }, [])

    if (isLoading) return <div>LOADING...</div>
    else if (error) throw error

    return (
        <AnimationProvider>
            <m.main
                className={styles['container']}
                variants={container}
                initial='initial'
                animate='animate'
            >
                {userMetrics.length > 0 ? (
                    areUsers(userMetrics) ? (
                        userMetrics.map(user => (
                            <m.div
                                key={user.id}
                                variants={item}
                            >
                                <UserCard user={user} />
                            </m.div>
                        ))
                    ) : (
                        userMetrics.map(post => (
                            <m.div
                                key={post.id}
                                variants={item}
                            >
                                <PostCard post={post} />
                            </m.div>
                        ))
                    )
                ) : (
                    <m.div>
                        Empty: {userCategory}
                    </m.div>
                )}
            </m.main>
        </AnimationProvider>
    )
}