import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export default async function validateReq(req: Request) {
    try {
        // Best to keep data structure for fetching consistent 
        // Not using "method" since itll always just be updating
        const bodyPromise = req.json() as Promise<{ data: FollowerRequest }>
        const sessionPromise = getServerSession(authOptions)

        const [body, session] = await Promise.all([bodyPromise, sessionPromise])
        const { newFollowers } = body.data

        if (!session) return new Response("User must sign in", { status: 401 })
        else if (!newFollowers) {
            return new Response("New followers list not given", { status: 422 })
        }

        return {
            data: {
                newFollowers,
                userId: session.user.id,
            }
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}