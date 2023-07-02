import { NextResponse } from "next/server";
import { createApi } from 'unsplash-js'
import { isValidColor, isValidContentFilter, isValidOrderBy, isValidOrientation } from "./validators";
import unsplashEx from "@/lib/toyData/unsplashEx";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import stripPhotoData from "./stripPhotoData";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    const color = searchParams.get('color')
    const orderBy = searchParams.get('orderBy')
    const orientation = searchParams.get('orientation')
    const contentFilter = searchParams.get('contentFilter')

    if (!query) return new Response("Unsplash query not given", { status: 422 })

    const res = await new Promise((resolve) => setTimeout(() => resolve(unsplashEx), 0)) as Photos

    // TEST FOR PERFORMANCE

    // const toy = []
    // 500 objs -> 1MB (i < 100) (200ms cold 50ms avg)
    // for (let i = 0; i < 100; i++) {
    //     const photos = stripPhotoData(res.results)
    //     // no spread for practice
    //     toy.push(photos)
    // }
    // return NextResponse.json(toy)
    
    // 500 objs -> 5MB (i < 100) (362ms cold 100-120ms avg)
    // for (let i = 0; i < 90; i++) {
    //     // no spread for practice
    //     toy.push(res.results)
    // }
    // return NextResponse.json(toy)

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
        
        // Lessen the amnt of data to transfer
        const photos = stripPhotoData(response.results)

        return NextResponse.json(photos)
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}