'use client'

import baseUrl from "@/lib/baseUrl"
import fetcher from "@/lib/fetchers/fetcher"
import { useRef } from "react"
import useUnsplash from "./useUnsplash"
import toggleDialog from "@/lib/toggleDialog"
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import UnsplashPhoto from "./UnsplashPhoto/UnsplashPhoto"

export default function UnsplashProvider() {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const timerRef = useRef<NodeJS.Timeout | undefined>()
    const { state, dispatch } = useUnsplash()
    const { photos, isTyping, isLoading, error, params } = state
    const { color, isRelevant, isSafe, orientation } = state.params

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

    return (
        <div>
            <div onPointerDown={(e) => toggleDialog(e, dialogRef)}>
                Open
            </div>
            <dialog ref={dialogRef}>
                <input
                    name='searchBar'
                    placeholder='Cat in a hat'
                    onChange={handleQuery}
                />
                {isTyping && (
                    <div>Typing...</div>
                )}
                {isLoading && (
                    <div>Searching...</div>
                )}
                <div>
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
                    <div>
                        {photos.map(photo => (
                            // <UnsplashPhoto 
                            //     key={photo.id}
                            //     photo={photo}
                            // />
                            <div></div>
                        ))}
                    </div>
                </div>
            </dialog>
        </div>
    )
}