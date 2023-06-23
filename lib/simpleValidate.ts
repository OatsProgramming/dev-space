import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import isEmpty from "lodash/isEmpty"
import { getServerSession } from "next-auth"

/**
 * For simple req body extraction and auth.
 * You must check for missing data properties outside of this fn.
 * @param req 
 * @returns 
 */
export default async function simpleValidate<T>(req: Request) {
    const bodyPromise = req.json() as Promise<ReqBody<T>>
    const sessionPromise = 
        // getServerSession(authOptions)
        Promise.resolve({ user: { id: "649534b00c8edaf5088712a5" }})

    const [body, session] = await Promise.all([bodyPromise, sessionPromise])

    if (!session) return new Response("User must sign in", { status: 401 })
    else if (!body.data || isEmpty(body.data)) {
        return new Response("No data was given", { status: 422 })
    }
    return { 
        data: body.data,
        userId: session.user.id,
        method: body.method || undefined
    }
}