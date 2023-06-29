import prismadb from "../prismadb";

type MongoResult = {
    "n": number,
    "nModified": number,
    "ok": number
}

/**
 * It's important to note that the query is based of from the username. Tried _id, id, id: { $oid: USERID }; they didnt work for some reason.
 * Just make sure that the username is always up to date with the session.
 * @param username 
 * @param userGroup 
 * @param targetId 
 * @returns 
 */
export default async function prismadbSpliceUsers(username: string, userGroup: UserGroupParam, targetId: string) {
    const result = await prismadb.$runCommandRaw({
        update: "User",
        updates: [
            {
                q: { username: "adam" },
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