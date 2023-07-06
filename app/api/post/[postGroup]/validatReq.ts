import isEmpty from "lodash/isEmpty"
import { NextResponse } from "next/server"

// Nothing special for ops
type Essential = {
    method: "POST" | "DELETE",
    data: {
        userId: string,
        postId: string
    }
}

export default async function validateReq(req: Request) {
    const hint = "Hint: expected req.body: { \nmethod: HTTP, data:\n { userId: string, postId: string\n}} "
    try {
        const { data, method } = await req.json() as Essential
        if (!method) {
            return new Response(
                `Method not given (api/post/[postGroup]). ${hint}`, 
                { status: 422 }
            )
        }
        else if (method !== 'DELETE' && method !== 'POST') {
            return new Response(`Unsupported method. Expected: DELETE || POST. Received: ${method}`, { status: 405 })
        }
        else if (isEmpty(data)) {
            return new Response(`Data not given (api/post/[postGroup]. ${hint}`, { status: 422 })
        }
        else if (!data.postId || !data.userId) {
            return new Response(
                `Is missing...
                Post ID?    ${!data.postId}
                User ID?    ${!data.userId}`,
                { status: 422 }
            )
        }

        return {
            method,
            data
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}