import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export default async function validateReq(req: Request) {
    try {
        const bodyPromise = req.json()
        const sessionPromise = getServerSession(authOptions)

        const [body, session] = await Promise.all([bodyPromise, sessionPromise])
        const { data } = body as { data: BlockedUsersReq }

        if (!session) return new Response("User must sign in", { status: 401 })
        else if (!data.blockedUsers) {
            return new Response("Blocked User List not given", { status: 422 })
        }

        return {
            data: { ...data },
            userId: session.user.id
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}