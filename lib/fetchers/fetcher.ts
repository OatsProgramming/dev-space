export default async function fetcher(url: string) {
    const res = await fetch(url)
    if (!res.ok) {
        const result = await res.text()
        throw new Error(result)
    }
    return res.json()
}