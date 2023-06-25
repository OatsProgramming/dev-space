export default function getReadTime(text: string) {
    const avgReadingSpeed = 200 // Words per min
    // Remove white space and split the words
    const wordCount = text.trim().split(/\s+/).length
    const readTime = wordCount / avgReadingSpeed

    if (readTime < 1) return "less than one minute"
    
    const rounded =  Math.ceil(readTime) // Best to round up to be on the safe side
    return `${rounded} mins`
}