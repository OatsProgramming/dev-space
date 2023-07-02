import prismadb from "@/lib/prismadb";
import simpleValidate from "@/lib/simpleValidate";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import tempUserId from "@/lib/toyData/tempUserId";
import { authOptions } from "../auth/[...nextauth]/route";
import getTempServerSession from "@/lib/toyData/getTempServerSession";
import textEX from "@/lib/toyData/textEx";

export async function GET(req: Request) {
    // Simulate data being an array of JSON objects
    const toReturn = []
    for (let text of textEX) {
        toReturn.push(JSON.stringify(text))
    }
    return NextResponse.json(toReturn)
    // const session = await 
    // // getServerSession(authOptions)
    // getTempServerSession()
    
    // if (!session) return new Response("User must sign in.", { status: 401 })

    // try {
    //     const { searchParams } = new URL(req.url)
    //     const userId = searchParams.get('userId')
        
    //     if (!userId) {
    //         return new Response("User ID not given (/api/notifs)", { status: 422 })
    //     }

    //     else if (session.user.id !== userId) {
    //         return new Response("Fetch not authorized", { status: 401 })
    //     }

    //     const user = await prismadb.user.findUnique({
    //         where: { id: userId }
    //     })

    //     if (!user) return new Response("User not found (/api/notifs)", {status: 404 })
    //     const { notifs } = user

    //     return NextResponse.json(notifs)
    // } catch (err) {
    //     return NextResponse.json(err, { status: 500 })
    // }
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