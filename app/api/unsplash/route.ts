import { NextResponse } from "next/server";
import { createApi } from 'unsplash-js'
import { isValidColor, isValidContentFilter, isValidOrderBy, isValidOrientation } from "./validators";
import unsplashEx from "@/lib/toyData/unsplashEx";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    const color = searchParams.get('color')
    const orderBy = searchParams.get('orderBy')
    const orientation = searchParams.get('orientation')
    const contentFilter = searchParams.get('contentFilter')

    if (!query) return new Response("Unsplash query not given", { status: 422 })

    await new Promise((resolve) => setTimeout(() => resolve(''), 1000))
    return NextResponse.json(unsplashEx)

    try {
        const unsplash = createApi({
            accessKey: process.env.UNSPLASH_ACCESS_KEY || ''
        })

        const res = await unsplash.search.getPhotos({
            query,
            color: isValidColor(color) ? color : undefined,
            orderBy: isValidOrderBy(orderBy) ? orderBy : undefined,
            orientation: isValidOrientation(orientation) ? orientation : undefined,
            contentFilter: isValidContentFilter(contentFilter) ? contentFilter : undefined,
        })
        const { errors, originalResponse, response } = res

        if (errors) throw errors
        else if (!originalResponse.ok) {
            const results = await originalResponse.json()
            throw new Error(results)
        }  
        console.log(response)
        return NextResponse.json({
            length: response.results.length,
            response,
        })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}