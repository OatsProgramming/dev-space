import styles from './unsplashPhoto.module.css'
import { useEffect, useRef } from "react";
import toggleDialog from "@/lib/toggleDialog";

export default function UnsplashPhoto({ photo }: {
    photo: UnsplashBasicSmaller
}) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        function closeDialog(e: PointerEvent) {
            const dialog = dialogRef.current
            if (!dialog || !dialog.open) return

            const el = e.target as HTMLElement

            if (!dialog.contains(el) || dialog === el) {
                // @ts-expect-error
                toggleDialog(e, dialogRef)
            }
        }

        document.body.addEventListener('pointerdown', closeDialog)
        return () => {
            document.body.removeEventListener('pointerdown', closeDialog)
        }
    }, [dialogRef.current])

    return (
        <div className={styles['container']}>

            <img
                loading="lazy"
                src={photo.urls.thumb}
                width={200}
            />
            <div className={styles['toHide']}>
                <div className={styles['svgContainer']} onPointerDown={(e) => toggleDialog(e, dialogRef)}>
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
                <div className={styles['overlay']} />
            </div>

            <dialog ref={dialogRef} className={styles['dialog']}>
                <div className={styles['overlay']}>
                    <div className={styles['svgContainer']} onPointerDown={(e) => toggleDialog(e, dialogRef)}>
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