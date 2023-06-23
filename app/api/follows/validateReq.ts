import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function validateReq(req: Request) {
    try {
        // Best to keep data structure for fetching consistent 
        // Not using "method" since itll always just be updating
        const bodyPromise = req.json() as Promise<{ data: FollowRequest }>
        const sessionPromise = getServerSession(authOptions)

        const [body, session] = await Promise.all([bodyPromise, sessionPromise])
        const { newFollows } = body.data

        if (!session) return new Response("User must sign in", { status: 401 })
        else if (!newFollows) return new Response("Missing new follow list", { status: 422 })

        return {
            data: {
                newFollows,
                userId: session.user.id,
            }
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}