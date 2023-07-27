'use client'

import styles from './unsplashPhoto.module.css'
import { useEffect, useRef } from "react";
import toggleDialog from "@/app/utils/toggleDialog";
import useUI from '../../MarkdownEditor/hooks/useUI';
import { getTextarea } from '../../MarkdownEditor/context/TextareaProvider';
import toMarkdownImage from '@/app/utils/toMarkdownImage';

export default function UnsplashPhoto({ photo, setIsOpen }: {
    photo: UnsplashBasicSmaller,
    setIsOpen: (isOpen: boolean) => void
}) {
    const textarea = getTextarea()
    if (!textarea) return

    const dialogRef = useRef<HTMLDialogElement>(null)
    const { setText } = useUI()

    useEffect(() => {
        function closeDialog(e: PointerEvent) {
            const dialog = dialogRef.current
            if (!dialog || !dialog.open) return

            const el = e.target as HTMLElement

            if (!dialog.contains(el) || dialog === el) {
                toggleDialog(dialogRef)
            }
        }

        document.body.addEventListener('pointerdown', closeDialog)
        return () => {
            document.body.removeEventListener('pointerdown', closeDialog)
        }
    }, [dialogRef.current])

    function handleClick() {
        // TODO: set up toast if this happens
        if (!textarea) throw new Error("Set to editing mode first!")

        // Place it at wherever the caret is currently is
        textarea.setRangeText(
            toMarkdownImage(
                photo.description 
                    ? photo.description
                    : photo.alt_description,
                photo.urls.regular      
            )
        )

        // For MarkdownUI to preview text
        setText(textarea.value)
        
        // Close dialog
        setIsOpen(false)
    }

    return (
        <div className={styles['container']}>

            <img
                loading="lazy"
                src={photo.urls.thumb}
                width={200}
            />
            <div className={styles['toHide']}>
                <div className={styles['overlay']} onClick={handleClick}/>
                <div className={styles['svgContainer']} onPointerDown={() => toggleDialog(dialogRef)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                    </svg>
                </div>
                <div className={styles['name']}>
                    By &nbsp;
                    <a href={photo.user.links.html} rel="noreferrer" target="_blank">
                        {photo.user.first_name} {photo.user.last_name}
                    </a>
                </div>
            </div>

            <dialog ref={dialogRef} className={styles['dialog']}>
                {/* this div below helps prevent accidentally closing the dialog when clicking */}
                <div className={styles['overlay']} onClick={handleClick}>
                    <div className={styles['svgContainer']} onPointerDown={() => toggleDialog(dialogRef)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                        </svg>
                    </div>
                    <div className={styles['name']}>
                        By &nbsp;
                        <a href={photo.user.links.html} rel="noreferrer" target="_blank">
                            {photo.user.first_name} {photo.user.last_name}
                        </a>
                    </div>
                </div>
                <img
                    loading="lazy"
                    src={photo.urls.regular}
                    width={500}
                    height={500}
                />
            </dialog>
        </div>
    )
}