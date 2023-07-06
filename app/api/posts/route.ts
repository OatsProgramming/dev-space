import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

type Arg = {
    userId: string | undefined | { not: string } 
} 

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const exclude = searchParams.get('exclude')

    const arg: Arg = { userId: userId ?? undefined }
    if (exclude && userId) arg.userId = { not: userId }

    try {
        const posts = await prismadb.post.findMany({
            where: arg,
            include: {
                user: {
                    select: {
                        username: true,
                        name: true,
                        image: true,
                    }
                }
            }
        })

        return NextResponse.json(posts)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}