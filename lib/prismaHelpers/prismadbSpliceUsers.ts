import prismadb from "../prismadb";

type MongoResult = {
    "n": number,
    "nModified": number,
    "ok": number
}

/**
 * Prismadb doesnt have support for removing items from an array yet. Use this to "splice" the array from collection: "User"
 * @param username 
 * @param userGroup 
 * @param targetId 
 * @returns 
 */
export default async function prismadbSpliceUsers(userId: string, userGroup: UserGroupParam, targetId: string) {
    const result = await prismadb.$runCommandRaw({
        update: "User",
        updates: [
            {
                q: { _id: {
                    $oid:  userId
                }},
                u: {
                    $pull: {
                        [userGroup]: {
                            // Make sure to use $oid: this will make sure that MongoDB knows that it's a MongoDB id. 
                            // Otherwise, will fail.
                            $oid: targetId
                        }
                    }
                },
                // In case if theres multiple of the same ids in the array; can handle it then
                multi: true
            }
        ]
    }) as MongoResult

    return {
        numberDocsFound: result.n,
        numberDocsModded: result.nModified,
        isError: !result.ok
    }
}