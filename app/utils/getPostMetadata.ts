import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import getReadTime from "./getReadTime";
import parseImgUrl from "./parseImgUrl";

export default function getPostMetadata(post: PostResponse) {
    const { body, title } = post

    let { createdAt, updatedAt } : {
        createdAt: string | Date, // Union for conversion to Date
        updatedAt: string | Date
    } = post

    createdAt = new Date(createdAt)
    updatedAt = new Date(updatedAt)

    // Time related data
    const isUpdated = +createdAt !== +updatedAt

    let latest = createdAt
    if (isUpdated) latest = updatedAt
    const timeDiff = formatDistanceToNow(latest, { includeSeconds: true, addSuffix: true })
    const readTime = getReadTime(body)


    // Use the first img of the body to be considered as main (if there is one)
    const res = parseImgUrl(body)
    const imgAlt = res.imgAlt
    const imgUrl = res.imgUrl

    return {
        id: post.id,
        title: title.slice(2), // Remove the hashtag
        body: post.body,
        user: post.user,
        userId: post.userId,
        imgAlt,
        imgUrl,
        timeDiff,
        readTime,
    }
}