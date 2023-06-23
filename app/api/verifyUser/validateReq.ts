import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default async function validateReq(req: Request) {
    try {
        const bodyPromise = req.json()
        const sessionPromise = getServerSession(authOptions)
    
        const [body, session] = await Promise.all([bodyPromise, sessionPromise])
        const { username, email, password } = body
    
        let message;
        let status;
    
        if (!session) {
            message = "User must sign in."
            status = 401
        }
        else if ((!username && !email) || !password) {
            message = 
                `Missing properties:
Username or Email?      ${!username && !email}
Password?               ${!password}`
            status = 422
        }
    
        if (message && status) return NextResponse.json(message, { status })
    
        return { username, email, password, userId: session?.user.id }

    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}