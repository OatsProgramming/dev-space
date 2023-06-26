import prismadb from "@/lib/prismadb";
import simpleValidate from "@/lib/simpleValidate";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const username = searchParams.get('username')
        if (!username) return new Response("Username not given (/api/notifs)", { status: 422 })

        const user = await prismadb.user.findUnique({
            where: { username }
        })

        if (!user) return new Response("User not found (/api/notifs)", {status: 404 })
        const { notifs } = user

        return NextResponse.json(notifs)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const res = await simpleValidate<Required<NotifsReq>>(req)
        if (res instanceof Response) return res
        const { data, userId } = res
        const { notifs } = data
        if (!notifs) return new Response("New notifs list not given", { status: 422 })

        // cant just stringify the array...
        const stringifiedNotifs = []
        for (let item of notifs) {
            stringifiedNotifs.push(JSON.stringify(item))
        }

        await prismadb.user.update({
            where: { id: userId },
            data: {
                notifs: stringifiedNotifs,
            }
        })
        return NextResponse.json(notifs)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}