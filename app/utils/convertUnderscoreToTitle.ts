export default function convertUnderscoreToTitle(str: string) {
    return str
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // uppercase the first letter then join the rest
        .join(" ") // join the words back together
}