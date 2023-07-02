'use client'

import { useReducer } from "react";

type UnsplashQueryState = {
    photos: UnsplashBasicSmaller[]
    isLoading: boolean
    isTyping: boolean,
    error: any
    params: {
        color?: UnsplashColor
        orientation?: UnsplashOrientation
        isRelevant: boolean
        isSafe: boolean
    }
}

type UnsplashQueryAction =
    {
        type: "changed"
        nextParams: Partial<UnsplashQueryState['params']>,
        nextIsLoading?: boolean,
    } | {
        type: 'typing', 
    } | {
        type: 'fetching', 
    } | {
        type: "loaded",
        nextPhotos: UnsplashBasicSmaller[],
    } | {
        type: "error",
        nextError: any,
    }

export default function useUnsplash() {
    const [state, dispatch] = useReducer<Reducer<UnsplashQueryState, UnsplashQueryAction>>(
        reducer,
        // Defaults
        {
            photos: [],
            isLoading: false,
            isTyping: false,
            error: undefined,
            params: {
                isRelevant: true,
                isSafe: true
            }
        }
    )

    // define the reducer function
    function reducer(prevState: UnsplashQueryState, action: UnsplashQueryAction): UnsplashQueryState {
        const { type } = action;

        switch (type) {
            case 'changed': {
                return {
                    ...prevState,
                    params: {
                        ...prevState.params,
                        ...action.nextParams
                    }
                }
            }
            case 'typing': {
                return {
                    ...prevState,
                    isTyping: true
                }
            }
            case 'fetching': {
                return {
                    ...prevState,
                    isLoading: true,
                    isTyping: false,
                    error: null,
                }
            }
            case "loaded": {
                return {
                    ...prevState,
                    isLoading: false,      
                    photos: action.nextPhotos,         
                }
            }
            case "error": {
                return {
                    ...prevState,
                    isLoading: false,
                    error: action.nextError,
                }
            }
            default: {
                return prevState
            }
        }
    }

    return { state, dispatch }
}
