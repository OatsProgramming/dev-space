import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import simpleValidate from "@/lib/simpleValidate";

// Not adding this to sesssion:
// Needs to be revalidated at certain times and events
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const username = searchParams.get('username')
        if (!username) return new Response("Username not given (/api/followers)", { status: 422 })

        const user = await prismadb.user.findUnique({
            where: { username }
        })

        if (!user) return new Response("User not found (/api/followers)", { status: 404 })

        const followers = user.followers
        return NextResponse.json(followers)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const res = await simpleValidate<FollowerRequest>(req)
        if (res instanceof Response) return res
        const { data, userId } = res
        const { newFollowers } = data
        
        if (!newFollowers) return new Response("New follows list not given", { status: 422 })

        await prismadb.user.update({
            where: { id: userId },
            data: {
                followers: newFollowers,
            }
        })

        return NextResponse.json(newFollowers)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}