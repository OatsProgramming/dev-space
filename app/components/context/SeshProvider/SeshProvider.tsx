import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import SeshClient from "./SeshClient"

// ??? Why am I creating a SeshProvider when there's <SessionProvider /> from next-auth ???

// Current thought process: mitigate data blocking and let this component load in parallel
// This will lessen the amnt of times called to auth api ( since this is a third party lib ) by "caching" it
export default async function SeshProvider({ children }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <SeshClient sesh={session}>
            {JSON.stringify(session)}
            {children}
        </SeshClient>
    )
}