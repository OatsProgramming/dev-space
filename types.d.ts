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
    parentCommentId?: string,
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
        parentCommentId: string,
        body: string,
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
    title: string,
    body: string,
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
        body?: string,
        image?: string,
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
        newInfo: PostReqPartial['newInfo']
    }
    : T extends 'POST' ?
    {
        title: string,
        image?: string,
        body: string,
    }
    : never


// To be used when fetching comments || posts
type GeneralUserInfo = {
    user: {
        username: string,
        name: string,
        image: string | null
    }
}

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

// TOAST
type ToastType = 'info' | 'warning' | 'error' | 'success'

type NotifyParams = {
    type: ToastType,
    message: string,
} | {
    type: 'promise',
    messages: {
        pending: string,
        success: string,
        error: string,
    },
    promise: Promise<any>
}

type NotifyReturnType = Record<ToastType, string | number> & {
    promise: Promise<Response>
}

type MarkdownHelperTypes =
    "heading1" | "heading2" | "heading3" | "heading4" | "heading5" | "heading6"
    | "italic" | "bold" | "quote" | "multiQuote" | "code" | "codeBlock" | "unorderItem"
    | "blankLine"

type RandomUserResponse = {
    username: string,
    name: string,
    followers: string[],
    follows: string[],
    image?: string,
    postsMade: number,
}

type Reducer<S, A> = (prevState: S, action: A) => S