import type { Post } from "@prisma/client";
import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import getReadTime from "./getReadTime";
import parseImgUrl from "./parseImgUrl";

export default function getPostMetadata(post: (Post & GeneralUserInfo)) {
    const { createdAt, updatedAt, body, image, title } = post

    // Time related data
    const isUpdated = +createdAt !== +updatedAt

    let latest = createdAt
    if (isUpdated) latest = updatedAt
    const timeDiff = formatDistanceToNow(latest, { includeSeconds: true, addSuffix: true })
    const readTime = getReadTime(body)

    // Img related data
    let imgAlt = `Main img of ${title}`
    let imgUrl = image

    // Use the first img of the body to be considered as main (if there is one)
    if (!image) {
        const res = parseImgUrl(body)
        imgAlt = res.imgAlt || imgAlt
        imgUrl = res.imgUrl || null
    }

    return {
        id: post.id,
        title: post.title,
        body: post.body,
        user: post.user,
        imgAlt,
        imgUrl,
        timeDiff,
        readTime,
    }
}