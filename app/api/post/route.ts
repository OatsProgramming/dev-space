import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import validateReq from "./validateReq"

// Think abt this when possible
export async function GET(req: Request) {
    // const { searchParams } = new URL(req.url)
    // const category = searchParams.entries()
    // if (!category) return new Response("Category not given for post route", { status: 422 })

    // const posts = await prismadb.post.findMany({
    //     where: { userId }
    // })
}

export async function POST(req: Request) {
    try {
        const res = await validateReq(req)
        if (res instanceof Response) return res
    
        const { method, data } = res
        switch(method) {
            case 'DELETE': {
                const { postId } = data
                await prismadb.post.delete({
                    where: { id: postId }
                })
                break;
            }
            case 'PATCH': {
                const { postId, newInfo } = data
                await prismadb.post.update({
                    where: { id: postId },
                    data: {
                        ...newInfo
                    }
                })
                break;
            }
            case 'POST': {
                await prismadb.post.create({
                    data: {
                        title: data.title,
                        body: data.body,
                        userId: data.userId!,
                        createdBy: data.createdBy,
                    }
                })
                break;
            }
            default: {
                throw new Error(`Method unknown: ${method}`)
            }
        }

        // Precautions
        if ('userId' in data) delete data.userId

        return NextResponse.json(data)
    } catch(err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
    
}