'use client'

import styles from './followBtn.module.css'
import { getSesh } from "../SessionProviderC/SessionProviderC";

export default async function FollowBtn({ userId }: {
    userId: string
}) {
    const sesh = getSesh()

    return (
        <>
            ・ 
            <div className={styles['container']}>
                {sesh?.user.id === userId ? '' : 'Follow'}
            </div>
        </>
    )
}