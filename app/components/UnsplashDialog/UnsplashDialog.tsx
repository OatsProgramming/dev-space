'use client'

import baseUrl from "@/app/utils/baseUrl"
import fetcher from "@/app/utils/fetchers/fetcher"
import { useRef } from "react"
import useUnsplash from "./hooks/useUnsplash"
import UnsplashPhoto from "./UnsplashPhoto/UnsplashPhoto"
import styles from './unsplashDialog.module.css'
import { m } from "framer-motion"
import Dropdown from "../Dropdown/Dropdown"
import validColors from "@/app/utils/unsplash/validColors"
import validOrientations from "@/app/utils/unsplash/validOrientations"
import AnimationProviderMAX from "../context/AnimationProvider/AnimationProviderMAX"
import { statusAnim } from "./variants"

export default function UnsplashDialog({ setIsOpen }: {
    setIsOpen: (isOpen: boolean) => void
}) {
    const timerRef = useRef<NodeJS.Timeout | undefined>()
    const { state, dispatch } = useUnsplash()
    const { photos, isTyping, isLoading, error, params } = state
    const { color, isRelevant, isSafe, orientation } = params

    function getResults(query: string) {
        const contentFilter: UnsplashContentFilter = isSafe ? 'high' : 'low'
        const orderBy: UnsplashOrderBy = isRelevant ? 'relevant' : 'latest'

        dispatch({ type: 'typing' })
        // This will help cancel the request before even starting it
        timerRef.current = setTimeout(() => {
            dispatch({ type: 'fetching' })
            fetcher(
                `${baseUrl}/api/unsplash?query=${query}&color=${color}&contentFilter=${contentFilter}&orderBy=${orderBy}&orientation=${orientation}`
            )
                .then((res: UnsplashBasicSmaller[]) => dispatch({
                    type: 'loaded',
                    nextPhotos: res
                }))
                .catch(err => dispatch({
                    type: 'error',
                    nextError: err,
                }))
        }, 1000)
    }

    function handleQuery(e: React.ChangeEvent) {
        const input = e.target as HTMLInputElement
        const query = input.value
        if (!query) return

        // If user still typing, cancel ongoing "request"
        const timerId = timerRef.current
        if (timerId) {
            clearTimeout(timerId)
        }
        getResults(query)
    }

    if (error) {
        console.log(error)
    }

    return (
        <AnimationProviderMAX>
            <div className={styles['container']}>
                <div className={styles['backdrop']} onPointerDown={() => setIsOpen(false)} />
                <m.div className={styles['dialog']} layout>
                    <div className={styles['barContainer']}>
                        <div className={styles['unsplash']}>
                            <div className={styles['svgContainer']}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                                </svg>
                            </div>
                            <div>
                                <a href='https://unsplash.com/' rel="noreferrer" target="_blank">Unsplash</a>
                            </div>
                        </div>
                        <div className={styles['filterBar']}>
                            <Dropdown
                                name={'Color'}
                                selected={color}
                                items={validColors}
                                setChange={(val) => dispatch({
                                    type: 'changed',
                                    nextParams: {
                                        color: val
                                            ? val
                                            : undefined
                                    }
                                })}
                            />
                            <Dropdown
                                name={'Orientation'}
                                selected={orientation}
                                items={validOrientations}
                                setChange={(val) => dispatch({
                                    type: 'changed',
                                    nextParams: {
                                        orientation: val
                                            ? val
                                            : undefined
                                    }
                                })}
                            />
                            <div onClick={() => dispatch({
                                type: 'changed',
                                nextParams: { isSafe: !isSafe }
                            })}>
                                {isSafe ? 'SFW' : 'NSFW'}
                            </div>
                            <div onClick={() => dispatch({
                                type: 'changed',
                                nextParams: { isRelevant: !isRelevant }
                            })}>
                                {isRelevant ? 'Relevant' : 'Latest'}
                            </div>
                        </div>
                        <div className={styles['searchBar']}>
                            <label
                                htmlFor="searchBar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </label>
                            <input
                                type="search"
                                name='searchBar'
                                placeholder='Cat in a hat...'
                                onChange={handleQuery}
                            />
                        </div>
                        <m.div className={styles['statusBar']} layout>
                            <AnimationProviderMAX>
                                {isTyping && (
                                    <m.div
                                        variants={statusAnim}
                                        initial='initial'
                                        animate='animate'
                                        exit='exit'
                                    >
                                        <i>Typing...</i>
                                    </m.div>
                                )}
                                {isLoading && (
                                    <m.div
                                        variants={statusAnim}
                                        initial='initial'
                                        animate='animate'
                                        exit='exit'
                                    >
                                        <i>Searching...</i>
                                    </m.div>
                                )}
                            </AnimationProviderMAX>
                        </m.div>
                    </div>
                    <m.div className={styles['photos']} layout='position'>
                        {photos.map(photo => (
                            <UnsplashPhoto
                                key={photo.id}
                                photo={photo}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </m.div>
                </m.div>
            </div>
        </AnimationProviderMAX>
    )
}