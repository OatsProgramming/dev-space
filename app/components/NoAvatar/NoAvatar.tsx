import type { CSSProperties } from "react";
import styles from './noAvatar.module.css'

export default function NoAvatar({ letter }: {
    letter: string
}) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    return (
        <div 
            className={styles['avatar']} 
            style={{ '--randomColor': `#${randomColor}` } as CSSProperties}
        >
            {letter}
        </div>
    )
}