import baseUrl from "@/lib/baseUrl"
import fetcher from "@/lib/fetchers/fetcher"
import Link from "next/link"


// Note to self abt Link href: 
// apparently having a "/" at the start means from root
// and having no "/" means from current url position
export default async function Layout({ children, params: { userId, userCategory } }: {
    children: React.ReactNode,
    params: {
        userId: string,
        userCategory: "posts" | "followers" | "follows"
    }
}) {

    let url = `${baseUrl}/api/user/${userCategory}?userId=${userId}`
    if (userCategory === 'posts') url = `${baseUrl}/api/posts?userId=${userId}`

    const items = ["eve"]

    return (
        <div>
            <Link href={`/profile/${userId}/posts`}>
                Posts
            </Link>
            <Link href={`/profile/${userId}/followers`}>
                Followers
            </Link>
            <Link href={`/profile/${userId}/follows`}>
                Follows
            </Link>
            <div>
                {userCategory}
                {JSON.stringify(items)}
            </div>
            {children}
        </div>
    )
}