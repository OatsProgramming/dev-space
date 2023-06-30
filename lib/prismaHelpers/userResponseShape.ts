/**
 * Cant get count for scalar lists for some reason...
 * Will make the resulting fetch to look like type UserResponse (check types.d.ts)
 */
const userResponseShape = [
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
    }
]

export default userResponseShape