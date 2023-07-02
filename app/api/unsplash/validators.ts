// TS acting weird...

function isValidColor(color: string | null): color is UnsplashColor {
    const validColors = new Set<UnsplashColor>(['black', 'black_and_white', 'blue', 'green', 'magenta', 'orange', 'purple', 'red', 'teal', 'white', 'yellow'])
    // @ts-expect-error
    return validColors.has(color)
}

function isValidOrientation(orientation: string | null): orientation is UnsplashOrientation {
    const validOrientation = new Set<UnsplashOrientation>(['landscape', 'portrait', 'squarish'])
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

export { isValidColor, isValidContentFilter, isValidOrientation, isValidOrderBy }