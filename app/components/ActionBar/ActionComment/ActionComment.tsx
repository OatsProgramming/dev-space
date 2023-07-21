import baseUrl from '@/lib/baseUrl'
import styles from './actionComment.module.css'
import mutateFetch from '@/lib/fetchers/mutateFetch'
import { useRef } from 'react'
import { getPostId } from '../../PostIdProvider/PostIdProvider'
import useParentCommentId from '../../Comments/hooks/useParentCommentId'
import useComments from '../../Comments/hooks/useComments'

export type ActionCommentParam = {
    parentId: {
        postId: string
    } | {
        parentCommentId: string
    },
    setIsCommenting: (isCommenting: boolean) => void,
}

type Data = {
    body: string,
    postId?: string,
    parentCommentId?: string
}

export default function ActionComment({ setIsCommenting }: {
    setIsCommenting: (isCommenting: boolean) => void,
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const postId = getPostId()
    const { parentCommentId } = useParentCommentId()
    const { refresh } = useComments()

    async function handleSubmit() {
        const textarea = textareaRef.current
        if (!textarea || !textarea.value) return
        
        // Set the parentId to the appropiate ID (post / comment) for commenting
        const data: Data = {
            body: textarea.value.trim(),
            postId: (postId as unknown as undefined) // work around...
        }

        if (parentCommentId) {
            delete data.postId
            data.parentCommentId = parentCommentId
        }

        try {
            const res = await mutateFetch<CommentReqPartial>(`${baseUrl}/api/comment`, 'POST', data)

            if ('error' in res) throw new Error(res.error)

            // TODO: set up a toast for success
            textarea.value = ''
            setIsCommenting(false)

            // Revalidate comments (based on current parentId)
            refresh()
        } catch (error) {
            // TODO: set up a toast for this
            console.log(error)
        }
    }

    return (
        <div className={styles['commenting']}>
            <textarea ref={textareaRef} />
            <div className={styles['commentBtns']}>
                <div onClick={() => setIsCommenting(false)}>
                    Close
                </div>
                <div onClick={handleSubmit}>
                    Submit
                </div>
            </div>
        </div>
    )
}