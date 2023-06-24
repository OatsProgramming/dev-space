import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => 
    import('../components/MarkdownEditor/MarkdownEditor')
)

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/signin')

    return (
        <div>
            <MarkdownEditor />
        </div>
    )
}