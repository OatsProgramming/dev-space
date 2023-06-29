import prismadb from "../prismadb";

/**
 * Given just a string of userIds, returns only the necessary data of those users.
 * ( Note:  Best not to do self relation model: a lot of unnecessary (and private) data to handle. 
 * Also, too much of a hassle if doing so: cascading delete still needs to be done manually. Use on the server )
 * @param usernames 
 * @returns 
 */
export default async function getUsers(userIds: string[]) {
    // Loop thru all of the names
    const usersPromise = []
    for (let id of userIds) {
        // Only get necessary (non private) data
        const userPromise = prismadb.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                name: true,
                image: true
            }
        })
        usersPromise.push(userPromise)
    }

    // Parallel execution to prevent blocking
    return Promise.all(usersPromise)
}