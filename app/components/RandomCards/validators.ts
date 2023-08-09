export function areUsers(items: Random): items is UserResponse[] {
    if ('followersCount' in items[0]) return true 
    else return false
}

export function arePosts(items: Random): items is PostResponse[] {
    if ('title' in items[0]) return true
    else return false
}

export function areComments(items: Random): items is CommentResponse[] {
    if ('postId' in items[0] || 'parentCommentId' in items[0]) return true
    else return false
}