'use client'

import { useState } from 'react'
import styles from './commentItem.module.css'
import dynamic from 'next/dynamic'

const EditComment = dynamic(() => 
    import('./EditComment/EditComment')
)

const ContentComment = dynamic(() =>
    import('./ContentComment/ContentComment')
)

export default function CommentItem() {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className={styles['container']}>
           {isEditing ? (
            <EditComment 
                setIsEditing={setIsEditing}
            />
           ) : (
            <ContentComment 
                setIsEditing={setIsEditing}
            />
           )}
        </div>
    )
}