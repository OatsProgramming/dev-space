import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import simpleValidate from "@/lib/simpleValidate";

// For both POST and DELETE ops
// Mutate the list on client side for faster UX (since prisma doesnt have slice or anything)
export async function POST(req: Request) {
   try {
        const res = await simpleValidate<BlockedUsersReq>(req)
        if (res instanceof Response) return res
        const { data, userId } = res
        const { blockedUsers } = data
        if (!blockedUsers) {
            return new Response("Missing new blocked users list", { status: 422 })
        }
        
        await prismadb.user.update({
            where: { id: userId },
            data: { blockedUsers }
        })

        return NextResponse.json(blockedUsers)
   } catch (err) {
       return NextResponse.json(err, { status: 500 })
   }
}