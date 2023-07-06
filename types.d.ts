type MutateHTTP = 'POST' | 'PATCH' | 'DELETE'

type ReqBody<T> = {
    data: T,
    method: MutateHTTP
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


// NOTIF REQUEST DATA STRUCTURE
type NotifProps = {
    title: string,
    body: string,
    createdAt: Date | 'now'
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
        image: string | null,
        bio?: string | null,
        id?: string
    }
}

// USER REQUEST DATA STRUCTURE
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

type Reducer<S, A> = (prevState: S, action: A) => S

// user/[userGroup] api
type UserGroupReq = {
    targetId: string,
}

type UserGroupParam = "follows" | "followers" | "blockedUsers"

// UNSPLASH
type UnsplashColor =
    "black_and_white" | "black" | "white" | "yellow" |
    "orange" | "red" | "purple" | "magenta" | "green" |
    "teal" | "blue"

type UnsplashOrientation = "landscape" | "portrait" | "squarish"

type UnsplashContentFilter = 'high' | 'low'

type UnsplashOrderBy = 'relevant' | 'latest'

type UnsplashBasicSmaller = {
    id: string
    width: number,
    height: number,
    color: string
    blur_hash: string
    description: string | null,
    alt_description: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
        small_s3: string
    },
    links: {
        self: string
        html: string
        download: string        
        download_location: string    
    },
    user: {
        id:  string
        username:  string
        name:  string
        first_name:  string | null
        last_name:  string | null
        links: {
            self: string
            html: string
            photos: string
            likes:  string
            portfolio: string
            following: string
            followers: string
        },
    },
}

type RandomCategoryParam = 'posts' | 'users' | 'comments'

type CommentResponse = {
    "body": string
    "id": string
    "createdAt": string
    "updatedAt": string
    "userId": string
    "user": GeneralUserInfo
    "postId": string | null
    "parentCommentId": string | null
}

type PostResponse = {
    "title": string,
    "body": string,
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "userId": string,
    "user": GeneralUserInfo,
    stars: number,
}

type TargetGroup = UserGroupParam | PostGroupParam

type PostGroupParam = 'starred' | 'bookmarked'

type PostGroupReq = {
    userId: string,
    postId: string
}