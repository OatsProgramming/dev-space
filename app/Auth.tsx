'use client'

import type { User } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UpdateArgs = Partial<User>

export function SignIn() {
    return (
        <button onClick={() => signIn()}>
            Sign in
        </button>
    )
}

