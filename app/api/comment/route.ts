import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import validateReq from "./validateReq"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('postId')

    if (!postId) return NextResponse.json("Post ID not given for comments", { status: 422 })

    const comments = await prismadb.comment.findMany({
        where: { postId }
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
                await prismadb.comment.delete({
                    where: { id: commentId }
                })
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
                console.log(data)
                // Determine whether comment is meant for a post
                // Or as a reply to a comment
                await prismadb.comment.create({
                    data: { 
                        body: data.body,
                        userId: data.userId!,
                        postId: 'postId' in data 
                            ? data.postId 
                            : undefined,
                        repliedTo: 'repliedTo' in data 
                            ? data.repliedTo 
                            : undefined,
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