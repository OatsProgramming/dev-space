import NextAuth from 'next-auth'
import type { NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from '@/lib/prismadb'
import { compare } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

// export this so we can use later for getServerSession or whatnot
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            // OAuth providers dont require a state param
            checks: ['none']
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            // To fix the following: OAUTH_CALLBACK_ERROR State cookie was missing
            // Check https://github.com/nextauthjs/next-auth/discussions/7491 for details of fix
            checks: ['none']
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: 'text',
                    placeholder: 'OatsProgramming'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            authorize: async (credentials) => {
                // Remove any trailing white space
                const username = credentials?.username.trim()
                const password = credentials?.password.trim()

                // Check for any missing properties
                if (!username || !password) return null
        
                // If not then check db
                const user = await prismadb.user.findUnique({
                    where: { username }
                })

                if (!user) return null

                // Use compare from bcrypt since it'd be hashed
                if (!await compare(password, user.hashedPassword)) {
                    return null;
                }

                // To be attached to token
                // Dont loop for keys: too many unnecessary props to go thru
                return {
                    id: user.id,
                    image: user.image,
                    name: user.username,
                    follows: user.follows,
                    blockedUsers: user.blockedUsers,
                    starred: user.starred,
                    bookmarked: user.bookmarked,
                };
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            // Similar situation as jwt
            const keys = Object.keys(token)
            for (let key of keys) {
                if (isValidKey(key) || key === 'id') {
                    session.user[key] = token[key]
                }
            }
            return session
        },
        // Currently using JWT instead of session (check "strategy" above)
        jwt: ({ token, user, trigger, session }) => {
            if (trigger === 'update') {
                // Update only whats necessary (& allowed)
                const keys = Object.keys(session)
                for (let key of keys) {
                    if (isValidKey(key)) {
                        token[key] = session[key]
                    }
                }
            }
            // Exec on sign in
            if (user) {
                const keys = Object.keys(user)
                // Attach all the additional necessary props to token
                for (let key of keys) {
                    // Just for added securtiy
                    // Dont forget to add 'id' as a valid param for this scenario
                    if (isValidKey(key) || key === 'id') {
                        token[key] = user[key]
                    }
                }
                return token
            }
            // Exec on reg
            return token
        }
    }
}

// Export it like this so that next auth can use this
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

function isValidKey(key: string): key is keyof User {
    const validKeys = new Set(['blockedUsers', 'bookmarked', 'follows', 'image', 'name', 'starred'])
    return validKeys.has(key)
}