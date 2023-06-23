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

        return NextResponse.json({ notifs })
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

        const notifsStringified = JSON.stringify(notifs)
        await prismadb.user.update({
            where: { id: userId },
            data: {
                notifs: notifsStringified,
            }
        })
        return NextResponse.json(notifs)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}