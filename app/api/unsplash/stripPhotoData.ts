import { Basic } from "unsplash-js/dist/methods/photos/types";
import { keepBasicKey, keepUserKey } from "./validators";

/**
 * To remove unnecessary data associated with Unsplash Photos. 
 * @param photosData 
 * @returns 
 */
export default function stripPhotoData(photosData: Basic[]) {
    const photos = [] as UnsplashBasicSmaller[]
    for (const photo of photosData) {
        // Create a new object
        const basicSmaller = {} as UnsplashBasicSmaller

        // Strip for the necssary data
        for (const key in photo) {
            if (keepBasicKey(key)) {
                // @ts-expect-error
                basicSmaller[key] = photo[key]
            }
        }

        if (photo.user) {
            // Ditto for photo.user since its an object
            let user = {} as UnsplashBasicSmaller['user'] | null

            for (const userKey in photo.user) {
                if (keepUserKey(userKey)) {
                    // @ts-expect-error
                    user[userKey] = photo.user[userKey]
                }
            }

            basicSmaller['user'] = user as UnsplashBasicSmaller['user']
            user = null
        }
        photos.push(basicSmaller)
    }
    return photos
}