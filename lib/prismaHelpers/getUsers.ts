import prismadb from "../prismadb";
import userResponseShape from "./userResponseShape";

/**
 * Given just a string of userIds, returns only the necessary data of those users.
 * ( Note:  Best not to do self relation model: a lot of unnecessary (and private) data to handle. 
 * Also, too much of a hassle if doing so: cascading delete still needs to be done manually. Use on the server )
 * @param usernames 
 * @returns 
 */
export default async function getUsers(userIds: string[]) {
    
    // Doing it raw since cant customize the keys 
    // Also, cant get count for some reason with reg prisma for scalar lists (?)
    // ... Trying to maintain UserResponse shape for ease of use thru out app
    const usersPromise = prismadb.user.aggregateRaw({
        pipeline: [
            // $in -> arr.includes() basically
            // Ought to loop for $oid to work
            { $match: { _id: { $in: userIds.map(id => ({ $oid: id })) } } },
            ...userResponseShape
        ]
    })

    // Concurrent execution to prevent blocking
    return usersPromise as unknown as Promise<UserResponse[]>
}