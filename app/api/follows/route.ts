import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import simpleValidate from "@/lib/simpleValidate";

export async function POST(req: Request) {
    const res = await simpleValidate<FollowRequest>(req)
    if (res instanceof Response) return res

    const { data, userId } = res
    const { newFollows } = data
    if (!newFollows) return new Response("New follows list not given", { status: 422 })

    try {
        await prismadb.user.update({
            where: { id: userId },
            data: {
                follows: newFollows
            }
        })
    
    return NextResponse.json({ newFollows })
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}