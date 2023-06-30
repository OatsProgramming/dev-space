import { hash } from "bcrypt";
import validateReq from "./validateReq";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import deleteComments from "@/lib/prismaHelpers/deleteComments";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) return new Response("User ID not given (api/user)", { status: 422 })

    try {
        const user = await prismadb.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                name: true,
                followers: true,
                follows: true,
                image: true,
                posts: true,
            }
        })

        return NextResponse.json(user)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

// TODO: encrypt the password on the client side for added securtiy in case of middle man
export async function POST(req: Request) {
    const res = await validateReq(req)
    if (res instanceof Response) return res

    const { method, data } = res
    try {
        switch (method) {
            case 'DELETE': {
                const { userId } = data

                const userComments = await prismadb.user.findUnique({
                    where: { id: userId },
                    select: {
                        comments: true
                    }
                })
                
                // Prisma doesnt allow onDelete: Cascade for self relations. Must do it manually.
                // Be sure to execute this first before deleting other properties.
                if (userComments) {
                    const { comments } = userComments
                    await deleteComments(comments)
                }

                await prismadb.user.delete({
                    where: { id: userId }
                })
                break;
            }
            case 'PATCH': {
                const { userId, newInfo } = data
                const { username, password } = newInfo

                let hashedPassword;
                if (password) hashedPassword = await hash(password, 12)

                await prismadb.user.update({
                    where: { id: userId },
                    data: {
                        username,
                        hashedPassword
                    }
                })

                break;
            }
            case 'POST': {
                const { username, email, password, name } = data
                const hashedPassword = await hash(password, 12)

                await prismadb.user.create({
                    data: {
                        username,
                        email,
                        name,
                        hashedPassword,
                    }
                })

                break;
            }
        }

        // Just as a precaution
        // @ts-expect-error
        if ('password' in data) delete data.password
        if ('newInfo' in data && 'password' in data.newInfo) {
            delete data.newInfo.password
        }

        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}