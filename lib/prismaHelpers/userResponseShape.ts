/**
 * Cant get count for scalar lists for some reason...
 * Will make the resulting fetch to look like type UserResponse (check types.d.ts)
 */
const userResponseShape = [
    {
        // Similar to "include" in prisma
        $lookup: {
            from: "Post",
            localField: "_id",          // Field from the input documents (i.e. for this ex: User)
            foreignField: "userId",     // Field from the documents of the "from" collection (i.e. "Post" here)
            as: "posts"                 // Essentially: " Include all: input.localField === from.foreignField "
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
            bio: 1,
            starred: 1,
            bookmarked: 1,
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
    }
]

export default userResponseShape