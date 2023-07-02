'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './notif.module.css'
import { m } from 'framer-motion'
import { container, item } from './notifVariants'
import NotifCard from './NotifCard/NotifCard'
import useNotifs from './useNotifs'
import Loader from '../../Loader/Loader'
import AnimationProvider from '../../AnimationProvider/AnimationProvider'

export default function Notif({ userId }: {
    userId: string,
}) {
    const divRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const { state, dispatch } = useNotifs(userId)
    const { notifs, isLoading, isError } = state

    // Close the modal if clicked outside of modal
    useEffect(() => {
        function handleClose(e: PointerEvent) {
            const div = divRef.current
            if (!div) return

            const clickedEl = e.target as HTMLElement
            if (!div.contains(clickedEl)) setIsOpen(false)
        }

        document.body.addEventListener('pointerdown', handleClose)
        return () => {
            document.body.removeEventListener('pointerdown', handleClose)
        }
    }, [divRef])

    // Update notification list once user closes tab
    // This way it wont constantly send requests to the db
    useEffect(() => {
        // Prevent accidental error saves
        if (isError || !notifs) return

        // Prevent accidental excess stringification (???)
        const newNotifs = [] as NotifProps[]
        for (let notif of notifs) {
            if (typeof notif !== 'object') {
                console.log(notif, 'NOT AN OBJECT.')
                const parsedNotif = JSON.parse(notif)

                // Best to not send beacon...
                if (typeof parsedNotif !== 'object') {
                    throw new Error(`Invalid notif. Still not an object: ${parsedNotif}`)
                }

                newNotifs.push(parsedNotif)
            }
            else {
                newNotifs.push(notif)
            }
        }

        function handleUnload() {
            // navigator.sendBeacon("api/notifs", JSON.stringify({ data: { notifs: newNotifs } }))
        }
        window.addEventListener('unload', handleUnload)
        return () => {
            window.removeEventListener('unload', handleUnload)
        }
    }, [notifs, isError])

    if (isError) console.error(isError)

    return (
        <div ref={divRef} className={styles['container']}>
            <div className='svgContainer' onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
            </div>
            <AnimationProvider>
                {isOpen && (
                    <m.div
                        className={styles['modal']}
                        variants={container}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                    >
                        {/* Check status */}
                        {isLoading ? (
                            <div className={styles['loader']}>
                                <Loader />
                            </div>
                        ) : isError ? (
                            <div className={styles['card']}>
                                <NotifCard notif={{ title: "System", body: "Something went wrong...", createdAt: 'now' }} />
                            </div>
                        ) : (
                            // Check length
                            <div className={styles['cards']}>
                                {/* Not empty */}
                                {notifs.length !== 0 ? notifs.map((notif, idx) => (
                                    <m.div
                                        className={styles['card']}
                                        key={idx}
                                        variants={item}
                                        onClick={() => {
                                            dispatch({
                                                type: 'removed',
                                                nextNotif: notif
                                            })
                                        }}
                                    >
                                        <NotifCard notif={notif} />
                                    </m.div>
                                )) : (
                                    // On empty
                                    <div className={styles['card']}>
                                        <NotifCard notif={{ title: "System", body: "You're all clear for today.", createdAt: 'now' }} />
                                    </div>
                                )}
                            </div>
                        )}
                        <button onClick={() => setIsOpen(false)}>
                            Close
                        </button>
                    </m.div>
                )}
            </AnimationProvider>
        </div>
    )
}