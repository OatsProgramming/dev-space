import { Basic } from "unsplash-js/dist/methods/photos/types";
import { keepBasicKey, keepUserKey } from "./validators";

/**
 * To remove unnecessary data associated with Unsplash Photos. Manipulates the data directly.
 * @param photosData 
 * @returns 
 */
export default function stripPhotoData(photosData: Basic[]) {    
    for (const photo of photosData) {
        // Strip for the necssary data
        for (const key in photo) {
            if (!keepBasicKey(key)) {
                // @ts-expect-error
                delete photo[key]
            }
        }

        if (photo.user) {
            // Ditto for photo.user since its an object
            for (const userKey in photo.user) {
                if (!keepUserKey(userKey)) {
                    // @ts-expect-error
                    delete photo.user[userKey]
                }
            }
        }
    }
}