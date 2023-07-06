import prismadbSpliceArr from "@/lib/prismaHelpers/prismadbSpliceArr";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import validateReq from "./validatReq";

type UserHack = {
    [key: string]: {
        push: string | undefined
    }
}

type PostHackIncr = {
    [key: string]: {
        increment: 1
    }
}

type PostHackDecr = {
    [key: string]: {
        decrement: 1
    }
}

export async function POST(
    req: Request,
    { param: { postGroup }}: { param: { postGroup: string }}
) {
    if (!isPostGroup(postGroup)) {
        return new Response(`Invalid post group. Expected: bookmarked || starred. Received: ${postGroup}`)
    }

    try {
        const res = await validateReq(req)
        if (res instanceof Response) return res
        const { method, data } = res
        const { userId, postId } = data 

        // To execute concurrently promises at the end
        const todos = []
        switch(method) {
            case 'POST': {
                // Create objs for dynamic args
                const userArg: UserHack = {}
                userArg[postGroup] = {
                    push: postId
                }

                const postArg: PostHackIncr = {}
                postArg[postGroup] = {
                    increment: 1
                }

                // Save to User.starred
                const userPromise = prismadb.user.update({
                    where: { id: userId },
                    data: userArg
                })
                // Increment Post.stars
                const postPromise = prismadb.post.update({
                    where: { id: postId },
                    data: postArg
                })

                todos.push(userPromise, postPromise)
                break;
            }
            case 'DELETE': {
                // Will splice for user; just do postArg as it will simply decrement
                const postArg: PostHackDecr = {}
                postArg[postGroup] = {
                    decrement: 1
                }

                const userPromise = prismadbSpliceArr(userId, postGroup, postId)
                const postPromise = prismadb.post.update({
                    where: { id: postId },
                    data: postArg
                })

                todos.push(userPromise, postPromise)
                break;
            }
            default: {
                return new Response(
                    `Unsupported HTTP method. Expected: POST || DELETE. Received: ${method}`, 
                    { status: 405 }
                )
            }
        }

        await Promise.all(todos)
        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

function isPostGroup(postGroup: string): postGroup is PostGroupParam {
    const validGroups = new Set(['bookmarked', 'starred'])
    return validGroups.has(postGroup)
}