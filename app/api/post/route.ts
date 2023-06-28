import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import validateReq from "./validateReq"

// Think abt this when possible: adding categories to search param
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const postId = searchParams.get('postId')
        if (!postId) return new Response("Post ID not given (/api/post)", { status: 422 })
    
        const post = await prismadb.post.findFirst({
            where: { id: postId }, 
            include: {
                user: {
                    select: {
                        name: true,
                        username: true,
                        image: true,
                    }
                }
            },
        })
        
        if (!post) return new Response("Post not found (/api/post)", { status: 404 })
    
        return NextResponse.json(post)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
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
                        userId: data.userId!                    
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