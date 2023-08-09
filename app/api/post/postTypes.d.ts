// general ( to also be used at api/posts )
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


type PostResponse = {
    "title": string,
    "body": string,
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "userId": string,
    stars: number,
} & GeneralUserInfo

// for dynamic
type PostGroupParam = 'starred' | 'bookmarked'

type PostGroupReq = {
    userId: string,
    postId: string
}