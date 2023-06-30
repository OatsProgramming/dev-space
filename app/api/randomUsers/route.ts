import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        const excludeUser = session?.user.id

        // Prisma doesnt have a way to randomly select docs (yet?)
        const users = await prismadb.user.aggregateRaw({
            pipeline: [
                {
                    // S.E.
                    $match: {
                        _id: {
                            // Not equal
                            $ne: {
                                // Object id 
                                $oid: excludeUser
                            }
                        }
                    }
                },
                {
                    // Similar to "include" in prisma
                    $lookup: {
                        from: "Post",
                        localField: "_id",
                        foreignField: "userId",
                        as: "posts"
                    }
                },
                {
                    // Similar to "select" in prisma
                    // use "1" to say true
                    $project: {
                        id: { $toString: "$_id" }, // Convert the weird $oid to something less verbose
                        name: 1,
                        username: 1,
                        image: 1,
                        followsCount: {
                            $size: "$follows"
                        },
                        followersCount: {
                            $size: "$followers"
                        },
                        postsCount: {
                            $size: "$posts"
                        },
                        _id: 0 // $oid is included by default. (even after converting...?) set it to false to remove unnecessary data
                    }
                },
                {
                    // Randomly selects (up to size: n) (dw abt duplicate docs: wont happen)
                    $sample: {
                        size: 3 
                    }
                },
            ]
        })

        return NextResponse.json(users)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}