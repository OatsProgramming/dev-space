import { NextResponse } from "next/server";
import validateReq from "./validateReq";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";

export async function POST(req: Request) {
    const res = await validateReq(req)
    if (res instanceof Response) return res

    let message;
    let status;
    try {
        const { username, email, userId, password } = res

        // findUnique doesnt take OR filter
        const targetUser = await prismadb.user.findFirst({
            where: {
                // Let user have options
                OR: [{ username }, { email }]
            }
        })

        // currentUser should be in the db in the first place
        // Just check for targetUser (adding currentUser for ts reasons)
        if (!targetUser) {
            message = "User not found"
            status = 404
        }
        // Compare via user ids
        else if (targetUser.id !== userId) {
            message = "Must be currently signed into the desired account to make updates"
            status = 401
        }

        // Compare pw
        else if (!await compare(password, targetUser.hashedPassword)) {
            message = "Password mismatch"
            status = 401
        }

        // On fail
        if (message && status) return NextResponse.json(message, { status })

        // On success
        return NextResponse.json({ isVerified: true })

    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}