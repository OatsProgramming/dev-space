type MutateFetchReturn<T> = {
    error: string
} | {
    data: T
}

export default async function mutateFetch<T>(url: string, method: MutateHTTP, data: T): Promise<MutateFetchReturn<T>> {
    const res = await fetch(url, {
        //  Set only to POST here. NextJS still have issues w/ other HTTP methods
        method: 'POST',
        body: JSON.stringify({
            method,
            data: {...data}
        })
    })

    if (!res.ok) {
        const result = await res.text()
        return { error: result }
    }

    const result = await res.json()
    return { data: result }
}