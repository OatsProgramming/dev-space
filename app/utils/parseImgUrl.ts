export default function parseImgUrl(markdownImgUrl: string) {  
    const imgUrlRegex = /!\[[^\]]*\]\((?<url>.*?)(?=\"|\))\)/
    const imgAltRegex = /!\[([^\]]+)\]/

    const imgAlt = imgAltRegex.exec(markdownImgUrl)
    const imgUrl = imgUrlRegex.exec(markdownImgUrl)

    return {
        imgUrl: imgUrl?.groups?.url,
        imgAlt: imgAlt?.[1]
    }
}