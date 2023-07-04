import prismadb from "@/lib/prismadb"
import userResponseShape from "@/lib/prismaHelpers/userResponseShape"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

// Only doing this bc
// Prisma doesnt have a way to randomly select docs (yet? hopefully.)
export async function GET(
    req: Request,
    { params: { category } }: { params: { category: string } }
) {
    if (!isValidParams(category)) return new Response(`Invalid category given. Expected: 'comments', 'posts', 'users'. Received: ${category}`)
    try {
        const session = await getServerSession(authOptions)
        const excludeUser = {
            // S.E.
            $match: {
                _id: {
                    // Not equal
                    $ne: {
                        // Object id 
                        $oid: session?.user.id
                    }
                }
            }
        }

        const excludeMatch = {
            $match: {
                userId: {
                    $ne: {
                        $oid: session?.user.id
                    }
                }
            }
        }

        // $lookup
        // include meta data abt post || comment
        const userMeta = {
            $lookup: {
                from: "User",
                localField: "userId",   // Field from the input documents
                foreignField: "_id",    // Field from the documents of the "from" collection (i.e. "User" here)
                as: "user",             // " Include all: input.localField === from.foreignField "
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            username: 1,
                            image: 1,
                            _id: 0,
                        }
                    }
                ]
            }
        }

        // $project (select these props)
        // Dont forget to add additional props accordingly since this is a general shape
        const responseShape = {
            _id: 0,
            id: { $toString: "$_id" },
            createdAt: { $toString: "$createdAt" },
            updatedAt: { $toString: "$updatedAt" },
            userId: { $toString: "$userId" },
            // Since user will be returned as an array, just get the object from it
            user: { $arrayElemAt: ["$user", 0] },
            body: 1,
        }

        // Just get top 3 for now
        const randomSampleSize = {
            // Randomly selects (up to size: n) (dw abt duplicate docs: wont happen)
            $sample: { size: 3 }
        }

        let results;
        switch (category) {
            case 'comments': {
                results = await prismadb.comment.aggregateRaw({
                    pipeline: [
                        excludeMatch,
                        userMeta,
                        {
                            $project: {
                                ...responseShape,
                                postId: { $toString: "$postId" },
                                parentCommentId: { $toString: "$parentCommentId" },
                            }
                        },
                        randomSampleSize,
                    ]
                })
                break;
            }
            case 'posts': {
                results = await prismadb.post.aggregateRaw({
                    pipeline: [
                        excludeMatch,
                        userMeta,
                        {
                            $project: {
                                ...responseShape,
                                title: 1
                            }
                        },
                        randomSampleSize,
                    ]
                })
                break;
            }
            case 'users': {
                results = await prismadb.user.aggregateRaw({
                    pipeline: [
                        excludeUser,
                        ...userResponseShape,
                        randomSampleSize,
                    ]
                })
                break;
            }
        }

        return NextResponse.json(results)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}

function isValidParams(category: string): category is RandomCategoryParam {
    const validParams = new Set(['comments', 'posts', 'users'])
    return validParams.has(category)
}