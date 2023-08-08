export default async function fetcher(url: string, options?: RequestInit, timeout = 8000) {
    const controller = new AbortController()

    const timeoutId = setTimeout(() => 
        controller.abort(),
        timeout
    ) 

    const res = await fetch(url, options)

    clearTimeout(timeoutId)
    
    if (!res.ok) {
        const result = await res.text()
        throw new Error(result)
    }
    return res.json()
}