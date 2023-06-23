import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import isEmpty from "lodash/isEmpty";
import prismadb from "@/lib/prismadb";

type Essential = {
    userId?: string,
}

type PATCH = {
    method: 'PATCH',
    data: PostReq<'PATCH'>

}

type DELETE = {
    method: 'DELETE',
    data: PostReq<'DELETE'>

}

// delete wont work unless the property is optional
type POST = {
    method?: 'POST'
    data: PostReq<'POST'> & Essential
} 

export default async function validateReq<T extends DELETE | PATCH | POST>(req: Request) {
    try {
        const bodyPromise = req.json()
        const sessionPromise = getServerSession(authOptions)

        const [body, session] = await Promise.all([bodyPromise, sessionPromise])

        if (!session) return NextResponse.json("User must sign in", { status: 401 })

        const { method, data } = body as ReqBody<PostReqPartial>

        let message;
        let status;
        switch (method) {
            case 'DELETE': 
            case 'PATCH': {
                const { postId, newInfo } = data
                // Check for missing properties (DELETE & PATCH)
                if (!postId) {
                    message = `Missing post ID (Method: ${method})`
                    status = 422
                }
                // Missing props (PATCH)
                else if (method === 'PATCH' && (!newInfo || isEmpty(newInfo))) {
                    message = `Missing new info for post route (Method: ${method})`
                    status = 422
                }
                else {
                    // Check if authorized
                    const post = await prismadb.post.findUnique({
                        where: { id: postId }
                    })

                    if (!post) {
                        message = 'Post not found'
                        status = 404
                    }
                    else if (post.userId !== session.user.id) {
                        message = `Can't mutate a post thats not of the creator's`
                        status = 401
                    } 
                }
                break;
            }
            case 'POST': {
                const { title, body } = data
                if (!title || !body) {
                    message = 
                        `Missing properties:
                        Title?      ${!title}
                        Body?       ${!body}`
                    status = 422
                }
                
                // Append userId for creation
                data.userId = session.user.id
                break;
            }
            default: {
                throw new Error(`Unknown method: ${method}`)
            }
        }
        if (message && status) return NextResponse.json(message, { status })
        return {
            data: {...data},
            method
        } as T
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}