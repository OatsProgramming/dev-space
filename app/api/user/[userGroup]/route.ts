import getUsers from "@/lib/prismaHelpers/getUsers";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import validateReq from "./validateReq";
import prismadbSpliceArr from "@/lib/prismaHelpers/prismadbSpliceArr";
import getTempServerSession from "@/lib/toyData/getTempServerSession";

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

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        return new Response(`User ID not given (api/user/${userGroup})`, { status: 422 })
    }

    try {
        if (userGroup === 'blockedUsers') {
            // Make sure that the users can see only their own blocked list 
            const session =
                // await getServerSession(authOptions)
                await getTempServerSession()

            if (!session) {
                return new Response("User must be signed in (api/blockedUser)", { status: 401 })
            }
            if (userId !== session.user.id) {
                return new Response("Current user may not see the target user's blocked list", { status: 401 })
            }
        }

        // Hacky workaround
        const arg = {} as { [key: string]: true }
        arg[userGroup] = true

        // Get userIds based off from userGroup
        const usersList = await prismadb.user.findUnique({
            where: { id: userId },
            select: arg
        })

        if (!usersList) return new Response("User not found", { status: 404 })

        // Get UserResponse[] 
        const listOfUsers = await getUsers(usersList[userGroup] as unknown as string[])

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

        const { targetId, method, userId } = res

        switch (method) {
            // Very simple: will only target one userGroup
            case 'DELETE': {
                const res = await prismadbSpliceArr(userId, userGroup, targetId)

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
                    const followsPromise = prismadbSpliceArr(userId, "follows", targetId)
                    const followersPromise = prismadbSpliceArr(userId, "followers", targetId)

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
                    // Check if target user is in the current user's blocked likst
                    const isBlocked = await prismadb.user.findFirst({
                        where: {
                            id: userId,
                            blockedUsers: {
                                hasSome: targetId
                            }
                        }
                    })

                    // This shouldnt occur: be sure that this doesnt happen on the client side
                    if (isBlocked) return new Response("Cannot add the target user if they're blocked", { status: 400 })

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