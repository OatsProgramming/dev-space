import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import simpleValidate from "@/lib/simpleValidate"

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
        const res = await simpleValidate<CommentReqPartial>(req)
        if (res instanceof Response) return res
        const { data, method, userId } = res

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
                    else if (comment.userId !== userId) {
                        message = "Can't make updates to a comment that's not of the same creator"
                        status = 401
                    }
                }
                break;
            }
            case 'POST': {
                const { postId, body, parentCommentId } = data
                if ((!postId && !parentCommentId) || !body) {
                    message =
                        `Is missing...
                        Either post ID or parent comment ID?       ${!postId && !parentCommentId}
                        Comment body?                              ${!body}
                        (Method: ${method})`
                    status = 422
                }

                data.userId = userId
                break;
            }
            default: {
                message = 'Method not given or unknown.\n(Hint:\n{method: "ENTER_METHOD", data: { "ENTER_DATA" }}'
                status = 422
                break;
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