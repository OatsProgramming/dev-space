import simpleValidate from "@/lib/simpleValidate"
import { NextResponse } from "next/server"

export default async function validateReq(req: Request) {
    try {
        const res = await simpleValidate<UserGroupReq>(req)
        if (res instanceof Response) return res

        const { data, userId, method } = res
        const { userId: targetId, specialId: targetSpecial } = data.targetUser

        if (!targetId || !targetSpecial || !method) {
            return new Response(
                `Is missing...
                Target ID?          ${!targetId}
                Target Special ID?  ${targetSpecial}
                Method?             ${!method}`,
                { status: 422 }
            )
        }

        return {
            method,
            userId,
            targetUser: data.targetUser
        }

    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}