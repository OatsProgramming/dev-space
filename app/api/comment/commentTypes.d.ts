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


type CommentResponse = {
    "body": string
    "id": string
    "createdAt": string
    "updatedAt": string
    "userId": string
    "user": GeneralUserInfo['user']
    "postId": string | null
    "parentCommentId": string | null,
    replyCount: number,
}