import getUsers from "@/lib/prismaHelpers/getUsers";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import validateReq from "./validateReq";
import prismadbSpliceUsers from "@/lib/prismaHelpers/prismadbSpliceUsers";

// TODO: convert all session back to normal (remove Promise.resolve())

function isUserGroup(userGroup: string): userGroup is UserGroupParam {
    const allowedParams = ["follows", "followers", "blockedUsers"]
    return allowedParams.some(allowed => allowed === userGroup)
}

export async function GET(
    req: Request,
    { params: { userGroup } }: { params: { userGroup: string } }
) {

    // Make sure params is valid
    if (!isUserGroup(userGroup)) {
        return new Response(`Invalid params. Allowed: follows || followers || blockedUsers. Received: ${userGroup}`, { status: 422 })
    }

    try {
        // Current user is only allowed to get their blocked list (best not to have searchParams to lessen code)
        const session =
            // await getServerSession(authOptions)
            await Promise.resolve({ user: { id: "649cdac70d107a45960a8091", name: 'eve' } })

        if (!session) return new Response("User must be signed in (api/blockedUser)", { status: 401 })

        // Hacky workaround
        const arg = {} as { [key: string]: true }
        arg[userGroup] = true

        // Get userIds in the users blocked list
        const usersList = await prismadb.user.findUnique({
            where: { id: session.user.id },
            select: arg
        })

        if (!usersList) return new Response("User not found", { status: 404 })

        // @ts-expect-error
        const listOfUsers = await getUsers(usersList[userGroup])

        return NextResponse.json(listOfUsers)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

export async function POST(
    req: Request,
    { params: { userGroup } }: { params: { userGroup: string } }
) {

    // Make sure params is valid
    if (!isUserGroup(userGroup)) {
        return new Response(`Invalid params. Allowed: follows || followers || blockedUsers. Received: ${userGroup}`, { status: 422 })
    }

    try {
        const res = await validateReq(req)
        if (res instanceof Response) return res

        const { targetId, method, userId, username } = res

        switch (method) {
            // Very simple: will only target one userGroup
            case 'DELETE': {
                const res = await prismadbSpliceUsers(username, userGroup, targetId)

                // Check for any fails
                if (res.isError) {
                    throw new Error(`Failed to query DB (api/user/${userGroup}`)
                }
                else if (res.numberDocsFound === 0) {
                    return new Response("Nothing matches the query", { status: 404 })
                }
                else if (res.numberDocsModded === 0) {
                    return new Response("No docs were modified", { status: 400 })
                }

                break;
            }
            case 'POST': {
                if (userGroup === 'blockedUsers') {
                    // Remove target from any of the following
                    const followsPromise = prismadbSpliceUsers(username, "follows", targetId)
                    const followersPromise = prismadbSpliceUsers(username, "followers", targetId)

                    // Add target to blockedUsers
                    const blockedUsersPromise = prismadb.user.update({
                        where: { id: userId },
                        data: {
                            blockedUsers: {
                                push: targetId
                            }
                        }
                    })

                    // Concurrent exec
                    await Promise.all([followsPromise, followersPromise, blockedUsersPromise])
                    break;
                }

                else {
                    // Ditto
                    const arg = {} as {
                        [key: string]: {
                            push: string | undefined
                        }
                    }

                    arg[userGroup] = {
                        push: targetId
                    }

                    await prismadb.user.update({
                        where: { id: userId },
                        data: arg
                    })
                }
                break;
            }
        }

        return NextResponse.json(targetId)
    } catch (error) {
        const err = error as any
        return NextResponse.json(err, { status: 500 })
    }
}