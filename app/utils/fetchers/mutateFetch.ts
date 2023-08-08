type MutateFetchReturn<T> = {
    data: T
}

export default async function mutateFetch<T>(url: string, method: MutateHTTP, data: T): Promise<MutateFetchReturn<T>> {
    const timeout = 8_000
    const controller = new AbortController()

    const timeoutId = setTimeout(() => 
        controller.abort(),
        timeout
    )

    const res = await fetch(url, {
        //  Set only to POST here. NextJS still have issues w/ other HTTP methods
        method: 'POST',
        body: JSON.stringify({
            method,
            data: {...data}
        }),
        signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
        const message = await res.text()
        throw new Error(message)
    }

    const result = await res.json()
    return { data: result }
}