import getUsers from "@/lib/getUsers";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import binaryFilter from "@/lib/binaryFilter";
import validateReq from "./validateReq";

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

        const { targetUser, method, userId } = res

        switch (method) {
            // Very simple: will only target one
            case 'DELETE': {

                // Hacky workaround
                const arg = {} as {
                    [key: string]: {
                        set: SpecialIds[] | undefined
                    }
                }

                const user = await prismadb.user.findUnique({
                    where: { id: userId },
                    select: {
                        followers: true,
                        follows: true,
                        blockedUsers: true,
                    }
                })

                if (!user) return new Response(`User not found (api/user/${userGroup})`, { status: 404 })

                // Filter targetGroup
                const targetGroup = user[userGroup] as SpecialIds[]
                const res = binaryFilter(targetGroup, targetUser)

                arg[userGroup] = {
                    set: res?.newList
                }

                await prismadb.user.update({
                    where: { id: userId },
                    data: arg
                })

                break;
            }
            case 'POST': {
                if (userGroup === 'blockedUsers') {

                    // Get the arrs to filter
                    const user = await prismadb.user.findUnique({
                        where: { id: userId },
                        select: {
                            followers: true,
                            follows: true,
                        }
                    })

                    if (!user) return new Response(`User not found (api/user/${userGroup})`, { status: 404 })
                    const { followers, follows } = user

                    // Filter them
                    const followersResult = binaryFilter(followers as SpecialIds[], targetUser)
                    const followsResult = binaryFilter(follows as SpecialIds[], targetUser)

                    // Add to blocked users
                    // Set new list for others
                    await prismadb.user.update({
                        where: { id: userId },
                        data: {
                            blockedUsers: {
                                push: targetUser
                            },
                            followers: {
                                set: followersResult?.newList
                            },
                            follows: {
                                set: followsResult?.newList
                            }
                        }
                    })
                }

                // Very simple here too: just push data
                // HOWEVER: make sure to verify on the client side that it doesnt exist in the list
                // already. Otherwise, will have DUPLICATES.
                else {
                    // Ditto
                    const arg = {} as {
                        [key: string]: {
                            push: SpecialIds | undefined
                        }
                    }

                    arg[userGroup] = {
                        push: targetUser
                    }

                    await prismadb.user.update({
                        where: { id: userId },
                        data: arg
                    })
                }
                break;
            }
        }

        return NextResponse.json(targetUser)
    } catch (error) {
        const err = error as any
        return NextResponse.json(err, { status: 500 })
    }
}