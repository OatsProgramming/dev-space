type RandomCardType =  {
    posts: PostResponse[],
    users: UserResponse[],
    comments: CommentResponse[]
}

type Random = RandomCardType[keyof RandomCardType]
