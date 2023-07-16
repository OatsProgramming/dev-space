'use client'
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";

const SessionContext = createContext<Session | null>(null)

export default function SessionProviderC({ children, sesh }: {
    children: React.ReactNode,
    sesh: Session | null,
}) {
    return (
        // This is simply for updating the session if any new info is provided
        <SessionProvider>
            {/* This is so that the session doesnt get called multiple times ( "cached" essentially ) */}
            <SessionContext.Provider value={sesh}>
                {children}
            </SessionContext.Provider>
        </SessionProvider>
    )
}

export function getSesh() {
    return useContext(SessionContext)
}