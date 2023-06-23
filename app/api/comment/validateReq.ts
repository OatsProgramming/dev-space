import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

type Essential = {
    userId?: string,
    createdBy: string,
}

type PATCH = {
    method: 'PATCH',
    data: Essential & CommentReq<'PATCH'>
}

type DELETE = {
    method: 'DELETE',
    data: Essential & CommentReq<'DELETE'>
}

// delete wont work unless the property is optional
type POST = {
    method?: 'POST'
    data: Essential & CommentReq<'POST'>
}

export default async function validateReq<T extends DELETE | PATCH | POST>(req: Request) {
    try {
        const bodyPromise = req.json() as Promise<ReqBody<CommentReqPartial>>
        const sessionPromise = getServerSession(authOptions)

        const [body, session] = await Promise.all([bodyPromise, sessionPromise])
        const { method, data } = body

        if (!session) return NextResponse.json("User must sign in", { status: 401 })

        let message;
        let status;

        switch (method) {
            case 'DELETE':
            case 'PATCH': {
                const { commentId, body } = data
                // Missing props for both
                if (!commentId) {
                    message = `Missing Comment ID (Method: ${method})`
                    status = 422
                }
                // Missing props for PATCH only
                else if (method === 'PATCH' && !body) {
                    message = "Missing comment body to update"
                    status = 422
                }
                // Verify for authorization
                else {
                    const comment = await prismadb.comment.findUnique({
                        where: { id: commentId }
                    })
                    if (!comment) {
                        message = "Comment not found",
                            status = 404
                    }
                    else if (comment.userId !== session.user.id) {
                        message = "Can't make updates to a comment that's not of the same creator"
                        status = 401
                    }
                }
                break;
            }
            case 'POST': {
                const { postId, body, repliedTo } = data
                if ((!postId && !repliedTo) || !body) {
                    message =
                        `Is missing...
                        Either Post ID or Comment ID (for repliedTo)?       ${!postId && !repliedTo}
                        Comment Body?                                       ${!body}
                        (Method: ${method})`
                    status = 422
                }

                data.userId = session.user.id
                break;
            }
            default: {
                throw new Error("Unknown Method")
            }
        }

        if (message && status) return NextResponse.json(message, { status })

        return { 
            data: { ...data },
            method
        } as T

    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}