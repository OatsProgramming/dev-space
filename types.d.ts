type MutateHTTP = 'POST' | 'PATCH' | 'DELETE'

type ReqBody<T> = {
    data: T,
    method: MutateHTTP
}

type BlockedUsersReq = {
    blockedUsers?: string[]
}

// COMMENT REQUEST DATA STRUCTURE
type CommentReqPartial = {
    commentId?: string,
    userId?: string,
    body?: string,
    postId?: string,
    repliedTo?: string
}

type CommentReq<T extends MutateHTTP> =
    T extends 'DELETE' ?
    {
        commentId: string
    }
    : T extends 'PATCH' ?
    {
        commentId: string,
        body: string,
    }
    : T extends 'POST' ?
    {
        postId: string,
        body: string,
    } | {
        repliedTo: string,
        body: string
    }
    : never

// FOLLOW REQUEST DATA STRUCTURE
type FollowRequest = {
    /**
     * Mutate on the client side.
     * This will make the UX seem faster.
     */
    newFollows?: string[]
}

// Basically the same: just for easier integration purposes
type FollowerRequest = {
     /**
     * Mutate on the client side.
     * This will make the UX seem faster.
     */
    newFollowers?: string[],
}

// NOTIF REQUEST DATA STRUCTURE
type NotifProps = {
    message: string,
    createdAt: Date
}

type NotifsReq = {
    notifs?: NotifProps[]
}

// POST REQUEST DATA STRUCTURE
type PostReqPartial = {
    postId?: string,
    userId?: string,
    title?: string,
    body?: string,
    newInfo?: {
        title?: string,
        body?: string
    }
}

type PostReq<T extends MutateHTTP> =
    T extends 'DELETE' ?
    {
        postId: string
    }
    : T extends 'PATCH' ?
    {
        postId: string
        newInfo: {
            title?: string,
            body?: string,
        }
    }
    : T extends 'POST' ?
    {
        title: string,
        body: string,
    }
    : never

// USER REQUEST DATA STRUCTURE
type UserProps = {
    username?: string,
    name?: string,
    email?: string,
    password?: string,
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

// VERIFY USER REQUEST DATA STRUCTURE
type VerifyUser = {
    username?: string,
    email?: string,
    password: string
}