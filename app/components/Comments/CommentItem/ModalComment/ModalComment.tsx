import { useState } from 'react'
import styles from './modalComment.module.css'
import { getSesh } from '@/app/components/SeshProvider/SeshClient'
import { getCommentContext } from '../ProviderComment/ProviderComment'

export default function ModalComment({ setIsEditing }: {
    setIsEditing: (isEditing: boolean) => void,
}) {

    const sesh = getSesh()
    const comment = getCommentContext()
    const [isOpen, setIsOpen] = useState(false)
    const isCreator = sesh?.user.id === comment?.userId

    // TODO: set up api system for this
    let options = (
        <>
            <div onClick={() => console.log("SHARE")}>
                SHARE
            </div>
            <div onClick={() => console.log("REPORT")}>
                REPORT
            </div>
        </>
    )

    if (isCreator) {
        options = (
            <>
                <div onClick={() => setIsEditing(true)}>
                    EDIT
                </div>
                {/* TODO: connect this with the comment "DELETE" api */}
                <div onClick={() => console.log("DELETE")}>
                    DELETE
                </div>
            </>
        )
    }

    return (
        <div className={styles['container']}>
            {isOpen && (
                <>
                    <div
                        className={styles['backdrop']}
                        onClick={() => setIsOpen(false)}
                    />
                    <div className={styles['menuItems']}>
                        {options}
                    </div>
                </>
            )}
            <div
                className={styles['menuClickable']}
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </div>
        </div>
    )
}