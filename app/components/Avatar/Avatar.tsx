import type { CSSProperties } from "react";
import styles from './avatar.module.css'
import Link from "next/link";

export default function Avatar({ username, image, removeLink, size}: {
    username: string,
    image: string | null,
    /**
     * Add this to deal w/ hydration error. (For some reason can't place a link within a link...)
     */
    removeLink?: true,
    size?: "sml" | "med" | "lrg"
}) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    const firstLetter = username.slice(0, 1)
    const multiplier = 
        size === 'lrg' ? 3
        : size === 'med' ? 2
        : 1 // default

    let avatar = <div>{firstLetter}</div>

    if (image) {
        avatar = (
            <img
                loading='lazy'
                src={image}
                alt={`${username}'s pfp`}
                width={32}
                height={32}
            />
        )
    }

    const result = (
        <div
            className={styles['avatar']}
            style={{ 
                '--randomColor': `#${randomColor}`,
                '--size':  multiplier, 
            } as CSSProperties}
        >
            {avatar}
        </div>
    )

    if (removeLink) return result
    return (
        <Link href={`/profile/${username}`}>
            {result}
        </Link>
    )
}