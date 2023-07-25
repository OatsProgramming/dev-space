export default async function fetcher(url: string, options?: RequestInit) {
    const res = await fetch(url, options)
    if (!res.ok) {
        const result = await res.text()
        throw new Error(result)
    }
    return res.json()
}