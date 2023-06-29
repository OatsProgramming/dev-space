import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import validateReq from "./validateReq"
import deleteComments from "@/lib/prismaHelpers/deleteComments"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('postId')
    const commentId = searchParams.get('commentId')

    if (!postId && !commentId) return NextResponse.json("Given neither post nor comment ID for comments (api/comment)", { status: 422 })

    const comments = await prismadb.comment.findMany({
        where: {
            OR: [{ postId }, { id: commentId! }]
         },
        include: {
            user: {
                select: {
                    username: true,
                    image: true,
                    name: true,
                }
            },
            replies: true
        }
    })

    return NextResponse.json(comments)
}

export async function POST(req: Request) {
    try {
        const res = await validateReq(req)
        if (res instanceof Response) return res

        const { method, data } = res
        switch (method) {
            case 'DELETE': {
                const { commentId } = data

                const comment = await prismadb.comment.findUnique({
                    where: { id: commentId }
                })

                if (!comment) return new Response(`Comment not found. ID: ${commentId}`, { status: 404 })

                await deleteComments([comment])

                break;
            }
            case 'PATCH': {
                const { commentId, body } = data
                await prismadb.comment.update({
                    where: { id: commentId },
                    data: { body }
                })
                break;
            }
            case 'POST': {
                // Determine whether comment is meant for a post
                // Or as a reply to a comment
                await prismadb.comment.create({
                    data: {
                        body: data.body,
                        userId: data.userId!,
                        postId: 'postId' in data
                            ? data.postId
                            : undefined,
                        parentCommentId: 'parentCommentId' in data
                            ? data.parentCommentId
                            : undefined
                    }
                })
                break;
            }
            default: {
                throw new Error("Unknown Method")
            }
        }

        if ('userId' in data) delete data.userId
        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}