import Link from "next/link"
import styles from './profileLink.module.css'

export default function ProfileLink({ children, userId }: {
    children: React.ReactNode,
    userId: string
}) {
    return (
        <Link href={`/profile/${userId}/posts`} className={styles['link']}>
            {children}
        </Link>
    )
}