import baseUrl from "@/lib/baseUrl";
import fetcher from "@/lib/fetchers/fetcher";
import useSWR, { useSWRConfig } from "swr";
import { getPostId } from "../../PostIdProvider/PostIdProvider";
import useParentCommentId from "./useParentCommentId";

// To get the comments from db
export default function useComments() {
    const postId = getPostId()
    const { parentCommentId } = useParentCommentId()

    // Determine if main is post or a comment
    let url: string;
    if (parentCommentId) {
        url = `${baseUrl}/api/comment?commentId=${parentCommentId}`
    }

    else if (postId) {
        url = `${baseUrl}/api/comment?postId=${postId}`
    }

    else {
        throw new Error('Missing parent ID in useComments hook')
    }

    const { data, error, isLoading } = useSWR(url, fetcher)
    // Regular mutate causes session to act weird for some reason
    const { mutate } = useSWRConfig()

    return {
        comments: data as CommentResponse[],
        error,
        isLoading,
        refresh: () => mutate(url)
    }
}