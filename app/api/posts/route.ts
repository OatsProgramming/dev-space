import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) return new Response("User ID not given (/api/posts)", { status: 422 })

    try {
        const posts = await prismadb.post.findMany({
            where: { userId }
        })

        return NextResponse.json(posts)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}