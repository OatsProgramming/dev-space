import styles from './notifCard.module.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function NotifCard({ notif }: {
    notif: NotifProps
}) {
    const { title, body, createdAt } = notif
    const timeDiff = formatDistanceToNow(
        createdAt === 'now' 
            ? Date.now() 
            : new Date(createdAt), 
        { 
            includeSeconds: true, 
            addSuffix: true 
        }
    )
    return (
        <div className={styles['container']}>
            <div className={styles['text']}>
                <span>{title}: </span>
                <span>{body}</span>
            </div>
            <p>{timeDiff}</p>
        </div>
    )
}