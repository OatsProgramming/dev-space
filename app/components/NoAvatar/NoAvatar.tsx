import type { CSSProperties } from "react";
import styles from './noAvatar.module.css'
import Link from "next/link";

export default function NoAvatar({ username, removeLink }: {
    username: string,
    /**
     * Add this to deal w/ hydration error. (For some reason can't place a link within a link...)
     */
    removeLink?: true
}) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    const firstLetter = username.slice(0, 1)

    if (removeLink) {
        return (
            <div
                className={styles['avatar']}
                style={{ '--randomColor': `#${randomColor}` } as CSSProperties}
            >
                {firstLetter}
            </div>
        )
    }

    return (
        <Link href={`/profile/${username}`}>
            <div
                className={styles['avatar']}
                style={{ '--randomColor': `#${randomColor}` } as CSSProperties}
            >
                {firstLetter}
            </div>
        </Link>
    )
}