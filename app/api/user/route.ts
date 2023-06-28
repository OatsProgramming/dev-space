import { hash } from "bcrypt";
import validateReq from "./validateReq";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    
}

export async function POST(req: Request) {
    const res = await validateReq(req)
    if (res instanceof Response) return res

    const { method, data } = res
    try {
        switch (method) {
            case 'DELETE': {
                const { userId } = data
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

                const todo = []

                const todoUser = prismadb.user.update({
                    where: { id: userId },
                    data: {
                        username,
                        hashedPassword
                    }
                })

                todo.push(todoUser)

                if (username) {
                    const todoPost = prismadb.post.updateMany({
                        where: { userId },
                        data: {
                            createdBy: username
                        }
                    })

                    todo.push(todoPost)
                }

                await Promise.all(todo)

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
        if ('userId' in data) delete data.userId
        // @ts-expect-error
        if ('password' in data) delete data.password
        if ('newInfo' in data && 'password' in data.newInfo){
            delete data.newInfo.password
        }

        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}