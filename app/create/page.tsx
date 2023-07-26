'use client'

import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getSesh } from "../components/context/SeshProvider/SeshClient";

const MarkdownEditor = dynamic(() =>
    import('@/app/components/MarkdownEditor/MarkdownEditor')
)

export default function Page() {
    const sesh = getSesh()

    if (!sesh) {
        // TODO: redirect to last pg & set up toast 
        return <div>User not signed in</div>
    }

    return (
        <div>
            <MarkdownEditor />
        </div>
    )
}