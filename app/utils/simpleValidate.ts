import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import isEmpty from "lodash/isEmpty"
import { getServerSession } from "next-auth"
import tempUserId from "./toyData/tempUserId"
import getTempServerSession from "./toyData/getTempServerSession"
// TODO: convert all session back to normal (remove Promise.resolve())


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
        getTempServerSession()

    const [body, session] = await Promise.all([bodyPromise, sessionPromise])
    if (!session) return new Response("User must sign in", { status: 401 })
    else if (!body || (body.data && isEmpty(body.data))) {
        return new Response("No data was given", { status: 422 })
    }
    else if (!body.data) {
        return new Response(
            "Please send requests as the following:\n{ data: { INSERT_JSON_DATA }, method?: DELETE || PATCH || POST }\nWill go back to normal once NextJS HTTP issues have resolved.",
            { status: 422 }
        )
    }

    return {
        data: body.data,
        userId: session.user.id,
        username: session.user.name,
        method: body.method || undefined
    }
}