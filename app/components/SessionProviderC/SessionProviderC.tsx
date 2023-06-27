'use client'
import { SessionProvider } from "next-auth/react";

export default function SessionProviderC({ children }: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}