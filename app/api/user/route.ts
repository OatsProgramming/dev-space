import { hash } from "bcrypt";
import validateReq from "./validateReq";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

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
                
                await prismadb.user.update({
                    where: { id: userId },
                    data: { ...newInfo }
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
        if ('userId' in data) delete data.userId

        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}