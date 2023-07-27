export default function toMarkdownImage(imgAlt: string, imgUrl: string) {
    return `![${imgAlt}](${imgUrl})`
}