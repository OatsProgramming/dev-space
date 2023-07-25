import colors from "@/app/utils/unsplash/validColors"
import orientations from "@/app/utils/unsplash/validOrientations"

function isValidColor(color: string | null): color is UnsplashColor {
    const validColors = new Set(colors as string[])
    if (!color) return false
    return validColors.has(color)
}

function isValidOrientation(orientation: string | null): orientation is UnsplashOrientation {
    const validOrientation = new Set(orientations as string[])
    if (!orientation) return false
    return validOrientation.has(orientation)
}

function isValidContentFilter(contentFilter: string | null): contentFilter is UnsplashContentFilter {
    const validContentFilter = new Set(['high', 'low'])
    if (!contentFilter) return false
    return validContentFilter.has(contentFilter)
}

function isValidOrderBy(orderBy: string | null): orderBy is UnsplashOrderBy {
    const validOrderBy = new Set(['latest', 'relevant'])
    if (!orderBy) return false
    return validOrderBy.has(orderBy)

}

function keepBasicKey(key: string): key is keyof UnsplashBasicSmaller {
    const validKeys = new Set(['alt_description', 'blur_hash', 'color', 'description', 'height', 'id', 'links', 'urls', 'user', 'width'])
    if (!key) return false
    return validKeys.has(key)
}

function keepUserKey(key: string): key is keyof UnsplashBasicSmaller['user'] {
    const validKeys = new Set(['first_name', 'id', 'last_name', 'links', 'name', 'username'])
    if (!key) return false
    return validKeys.has(key)
}

export { isValidColor, isValidContentFilter, isValidOrientation, isValidOrderBy, keepBasicKey, keepUserKey }