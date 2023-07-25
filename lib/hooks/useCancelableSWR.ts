import type { SWRConfiguration } from "swr"
import useSWR from "swr"
import fetcher from "../../app/utils/fetchers/fetcher"

export default function useCancelableSWR(url: string, configs?: SWRConfiguration) {
    const controller = new AbortController()
    return {
        SWRResponse: useSWR(url, (url) => fetcher(url, { signal: controller.signal }), configs),
        controller
    }
}
