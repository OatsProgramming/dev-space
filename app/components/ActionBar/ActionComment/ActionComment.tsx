import baseUrl from '@/lib/baseUrl'
import styles from './actionComment.module.css'
import mutateFetch from '@/lib/fetchers/mutateFetch'
import { useRef } from 'react'
import { getParentId } from './ParentIdProvider'

export type ActionCommentParam = {
    parentId: {
        postId: string
    } | {
        parentCommentId: string
    },
    setIsCommenting:  (isCommenting: boolean) => void,
}

export default function ActionComment({ setIsCommenting }: {
    setIsCommenting:  (isCommenting: boolean) => void,
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const parentId = getParentId()

    async function handleSubmit() {
        const textarea = textareaRef.current
        if (!parentId) {
            throw new Error("Parent ID not given for ActionComment")
        }

        if (!textarea || !textarea.value) return

        try {
            const res = await mutateFetch<CommentReqPartial>(`${baseUrl}/api/comment`, 'POST', { 
                body: textarea.value.trim(),
                postId: 'postId' in parentId ? parentId.postId : undefined,
                parentCommentId: 'parentCommentId' in parentId ? parentId.parentCommentId : undefined
            })

            if ('error' in res) throw new Error(res.error)

            // TODO: set up a toast for success
            textarea.value = ''
            setIsCommenting(false)
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