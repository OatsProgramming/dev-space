import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import userResponseShape from "@/lib/prismaHelpers/userResponseShape";

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
                ...userResponseShape,
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