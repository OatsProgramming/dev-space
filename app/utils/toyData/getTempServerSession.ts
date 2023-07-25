import type { Session } from "next-auth";
import tempUserId from "./tempUserId";

export default function getTempServerSession() {
    return Promise.resolve({
        user:
        {
            id: tempUserId,
            name: 'machina',
            image: "https://rukminim1.flixcart.com/image/850/1000/kufuikw0/poster/j/d/x/small-aesthetic-anime-girl-wall-poster-size-12x18-asstore-red-original-imag7k2v5dbs8tgn.jpeg?q=90"
        }
    }) as Promise<Session>
}
