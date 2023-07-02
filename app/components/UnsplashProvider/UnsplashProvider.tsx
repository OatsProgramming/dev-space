'use client'

import baseUrl from "@/lib/baseUrl"
import fetcher from "@/lib/fetchers/fetcher"
import { useRef } from "react"
import useUnsplash from "./useUnsplash"

export default function UnsplashProvider() {
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
                .then(res => dispatch({
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
            <input
                name='searchBar'
                placeholder='Cat in a hat'
                onChange={handleQuery}
            />
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
                    <div>User typing?: {JSON.stringify(isTyping)}</div>
                    <div>Fetching Data?: {JSON.stringify(isLoading)}</div>
                    <div>Data: {JSON.stringify(photos)}</div>
                </div>
            </div>
        </div>
    )
}