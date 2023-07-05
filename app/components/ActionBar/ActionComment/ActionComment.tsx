import styles from './actionComment.module.css'

export default function ActionComment({ setIsCommenting }: {
    setIsCommenting: (isCommenting: boolean) => void,
}) {

    return (
        <div className={styles['commenting']}>
            <textarea />
            <div className={styles['commentBtns']}>
                <div onClick={() => setIsCommenting(false)}>
                    Close
                </div>
                <div>
                    Submit
                </div>
            </div>
        </div>
    )
}