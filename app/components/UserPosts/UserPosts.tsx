import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import fetcher from "../../utils/fetchers/fetcher";
import baseUrl from "../../utils/baseUrl";
import PostCard from "../PostCard/PostCard";

export default async function UserPosts() {
    const sesh = await getServerSession(authOptions)

    if (!sesh) {
        return <></>
    }

    const userPosts = await fetcher(`${baseUrl}/api/posts?userId=${sesh.user.id}`) as PostResponse[]

    return (
        <>
            {userPosts.map(post => (
                <PostCard post={post} key={post.id} isSimple />
            ))}
        </>
    )
}