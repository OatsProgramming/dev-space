import prismadb from "@/lib/prismadb";
import { validateReq } from "./validateReq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const res = await validateReq(req)
    if (res instanceof Response) return res

    const { userId, newFollows } = res.data

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