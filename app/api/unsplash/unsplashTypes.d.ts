type UnsplashColor =
    "black_and_white" | "black" | "white" | "yellow" |
    "orange" | "red" | "purple" | "magenta" | "green" |
    "teal" | "blue"

type UnsplashOrientation = "landscape" | "portrait" | "squarish"

type UnsplashContentFilter = 'high' | 'low'

type UnsplashOrderBy = 'relevant' | 'latest'

type UnsplashBasicSmaller = {
    id: string
    width: number,
    height: number,
    color: string
    blur_hash: string
    description: string | null,
    alt_description: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
        small_s3: string
    },
    links: {
        self: string
        html: string
        download: string        
        download_location: string    
    },
    user: {
        id:  string
        username:  string
        name:  string
        first_name:  string | null
        last_name:  string | null
        links: {
            self: string
            html: string
            photos: string
            likes:  string
            portfolio: string
            following: string
            followers: string
        },
    },
}
