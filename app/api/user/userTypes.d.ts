// for reg
type UserProps = {
    username?: string,
    name?: string,
    email?: string,
    password?: string,
    bio?: string | null
}

type UserReqPartial = UserProps & {
    isVerified?: boolean,
    newInfo?: UserProps,
    userId?: string,
}

type UserReq<T extends MutateHTTP> =
    T extends 'DELETE' ?
    {
        isVerified: boolean
    }
    : T extends 'PATCH' ?
    {
        isVerified: boolean,
        newInfo: UserProps
    }
    : T extends 'POST' ?
    Required<UserProps> & { name?: string }
    : never

// for dynamic route
type UserGroupReq = {
    targetId: string,
}

type UserGroupParam = "follows" | "followers" | "blockedUsers"

// To be used when fetching comments || posts
type GeneralUserInfo = {
    user: {
        username: string,
        name: string,
        image: string | null,
        bio?: string | null,
        id?: string
    }
}

/**
 * This is a more general type. Helps make sure data is small.
 */
type UserResponse = {
    username: string,
    name: string,
    /**
     * Fetch the actual list of users after a user clicks on target user's userGroup
     */
    followersCount: number,
    /**
    * Fetch the actual list of users after a user clicks on target user's userGroup
    */
    followsCount: number,
    image?: string | null,
    postsCount: number,
    id: string,
    bio?: string | null,
    /**
     * Check the array if Post.id in User.bookmarked before entering /post
     */
    bookmarked: string[]
    /**
     * Check the array if Post.id in User.bookmarked before entering /post
     */
    starred: string[]
}