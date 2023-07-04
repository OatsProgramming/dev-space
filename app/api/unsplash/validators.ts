// TS acting weird...

import colors from "@/lib/unsplash/validColors"
import orientations from "@/lib/unsplash/validOrientations"

function isValidColor(color: string | null): color is UnsplashColor {
    const validColors = new Set<UnsplashColor>(colors)
    // @ts-expect-error
    return validColors.has(color)
}

function isValidOrientation(orientation: string | null): orientation is UnsplashOrientation {
    const validOrientation = new Set<UnsplashOrientation>(orientations)
    // @ts-expect-error
    return validOrientation.has(orientation)
}

function isValidContentFilter(contentFilter: string | null): contentFilter is UnsplashContentFilter {
    const validContentFilter = new Set<UnsplashContentFilter>(['high', 'low'])
    // @ts-expect-error
    return validContentFilter.has(contentFilter)
}

function isValidOrderBy(orderBy: string | null): orderBy is UnsplashOrderBy {
    const validOrderBy = new Set<UnsplashOrderBy>(['latest', 'relevant'])
    // @ts-expect-error
    return validOrderBy.has(orderBy)

}

function keepBasicKey(key: string): key is keyof UnsplashBasicSmaller {
    const validKeys = new Set<keyof UnsplashBasicSmaller>(['alt_description', 'blur_hash', 'color', 'description', 'height', 'id', 'links', 'urls', 'user', 'width'])
    // @ts-expect-error
    return validKeys.has(key)
}

function keepUserKey(key: string): key is keyof UnsplashBasicSmaller['user'] {
    const validKeys = new Set<keyof UnsplashBasicSmaller['user']>(['first_name', 'id', 'last_name', 'links', 'name', 'username'])
    // @ts-expect-error
    return validKeys.has(key)
}

export { isValidColor, isValidContentFilter, isValidOrientation, isValidOrderBy, keepBasicKey, keepUserKey }