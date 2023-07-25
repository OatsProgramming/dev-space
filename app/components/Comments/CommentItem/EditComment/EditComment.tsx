import { useState } from "react"
import styles from './editComment.module.css'
import { getCommentContext } from "../ProviderComment/ProviderComment"
import { maxCharCount } from "@/app/post/components/ActionBar/ActionComment/ActionComment"
import mutateFetch from "@/app/utils/fetchers/mutateFetch"
import baseUrl from "@/app/utils/baseUrl"
import useComments from "../../hooks/useComments"

export default function EditComment({ setIsEditing }: {
    setIsEditing: (arg: boolean) => void,
}) {
    const comment = getCommentContext()
    const [commentBody, setCommentBody] = useState(comment?.body ?? '')
    const { refresh } = useComments()

    function handleCancel() {
        if (!comment) return
        if (comment.body !== commentBody) setCommentBody(comment.body)
        setIsEditing(false)
    }

    async function saveChanges() {
        const data = {
            commentId: comment?.id,
            body: commentBody.trim()
        }

        try {
            await mutateFetch(`${baseUrl}/api/comment`, 'PATCH', data)
            refresh()
            setIsEditing(false)
        } catch (error) {
            // TODO: Set up toast
            console.log(error)
        }
    }

    return (
        <div className={styles['onEdit']}>
            <textarea
                value={commentBody} // Just useState rather than useRef. Helps UX when editing
                className={styles['editComment']}
                placeholder={comment?.body}
                maxLength={maxCharCount}
                spellCheck
                onChange={(e) => setCommentBody(e.target.value)}
            />
            <div className={styles['btnContainer']}>
                <button data-http-method="PATCH" onPointerDown={saveChanges}>
                    Save
                </button>
                <button onPointerDown={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    )
}