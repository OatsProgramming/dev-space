import simpleValidate from "@/lib/simpleValidate"
import { NextResponse } from "next/server"

export default async function validateReq(req: Request) {
    try {
        const res = await simpleValidate<UserGroupReq>(req)
        if (res instanceof Response) return res

        const { data, userId, method } = res
        const { targetId } = data

        if (!targetId || !method) {
            return new Response(
                `Is missing...
                Target ID?          ${!targetId}
                Method?             ${!method}`,
                { status: 422 }
            )
        }

        return {
            method,
            userId,
            targetId,
            username: res.username,
        }

    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}