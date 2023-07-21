import { useState } from 'react'
import styles from './modalComment.module.css'
import { getSesh } from '@/app/components/SessionProviderC/SessionProviderC'
import { getCommentContext } from '../ProviderComment/ProviderComment'

export default function ModalComment({ setIsEditing }: {
    setIsEditing: (isEditing: boolean) => void,
}) {

    const sesh = getSesh()
    const comment = getCommentContext()
    const [isOpen, setIsOpen] = useState(false)
    const isCreator = sesh?.user.id === comment?.userId

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
                MENU
            </div>
        </div>
    )
}