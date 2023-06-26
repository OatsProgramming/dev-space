import baseUrl from "@/lib/baseUrl";
import fetcher from "@/lib/fetchers/fetcher";
import isEqual from "lodash/isEqual";
import { useEffect, useReducer } from "react";

type NotifsState = {
    notifs: NotifProps[];
    isLoading: boolean;
    isError: any;
};

type NotifsAction =
    {
        type: "added"
        nextNotif: NotifProps,
    } | {
        type: "removed",
        nextNotif: NotifProps,
    } | {
        type: "loaded",
        nextIsLoading: boolean,
        nextNotifs: NotifProps[],
    } | {
        type: "error",
        nextIsError: any,
        nextNotifs: NotifProps[]
    }

export default function useNotifs(username: string) {
    const url = `${baseUrl}/api/notifs?username=${username}`;
    const [state, dispatch] = useReducer<Reducer<NotifsState, NotifsAction>>(
        reducer,
        {
            notifs: [],
            isLoading: true,
            isError: undefined,
        }
    )

    useEffect(() => {
        (async () => {
            try {
                const stringedNotifs = await fetcher(url)
                // Gotta parse it twice since the items inside the array are JSON
                const result = [] as NotifProps[]
                for (let stringedNotif of stringedNotifs) {
                    result.push(JSON.parse(stringedNotif))
                }

                dispatch({
                    type: 'loaded',
                    nextIsLoading: false,
                    nextNotifs: result
                })
            } catch (err) {
                dispatch({
                    type: 'error',
                    nextIsError: err,
                    nextNotifs: [{ title: 'System', body: 'it seems something went wrong...', createdAt: new Date() }],
                })
            }
        })()
    }, [])

    // define the reducer function
    function reducer(prevState: NotifsState, action: NotifsAction): NotifsState {
        const { type } = action;

        switch (type) {
            case "added": {
                const { notifs: prevNotifs } = prevState
                const { nextNotif } = action

                const notifs = [ ...prevNotifs, nextNotif ]
                return { ...prevState, notifs }
            }
            case "removed": {
                const { notifs: prevNotifs } = prevState
                const { nextNotif } = action

                const notifs = prevNotifs.filter(notif => !isEqual(notif, nextNotif))
                return { ...prevState, notifs }
            }
            case "loaded": {
                return {
                    ...prevState,
                    isLoading: action.nextIsLoading,
                    notifs: action.nextNotifs,
                }
            }
            case "error": {
                return {
                    ...prevState,
                    isError: action.nextIsError,
                    notifs: action.nextNotifs
                }
            }
            default: {
                return prevState
            }
        }
    }

    return { state, dispatch }
}
