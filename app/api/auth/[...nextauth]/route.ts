import NextAuth from 'next-auth'
import type { NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from '@/lib/prismadb'
import { compare } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { randomBytes } from 'crypto';

// export this so we can use later for getServerSession or whatnot
export const authOptions: NextAuthOptions = {
    // For some reason, updating next-auth caused a type error...
    // Keep a look out for this
    // @ts-expect-error
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
                if (!await compare(password, user.hashedPassword!)) {
                    return null;
                }

                // To be attached to token
                // Dont loop for keys: too many unnecessary props to go thru
                return {
                    id: user.id,
                    image: user.image,
                    name: user.name,
                    username: user.username,
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
        },
        signIn: async ({ user, account }) => {
            // For users that sign in w/ providers, give them a default username
            // @ts-expect-error
            if (account.type === 'oauth' && !user.username) {
                // Prevent overwritting username (since oauth wouldnt have user.username 99% of the time)
                const userDB = await prismadb.user.findUnique({
                    where: { email: user.email! }
                })

                if (userDB) {
                    user.username = userDB.username
                    user.isOauth = true
                }

                else {
                    user.username = user.email
                }
            }
            return true
        }
    },
    logger: {
        error: (code, metadata) => {
            const err = metadata as Error
            const argRegex = /Argument[^]+?(?=\n\n)/
            const message = err.message.match(argRegex)?.[0] || ''

            console.log("WHOLE ERR: ", metadata)
            console.log("MAIN ERR: ", message)
        }
    }
}

// Export it like this so that next auth can use this
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// TODO: deal w/ username and name issue
function isValidKey(key: string): key is keyof User {
    const validKeys = new Set(['blockedUsers', 'bookmarked', 'follows', 'image', 'name', 'starred', 'username'])
    return validKeys.has(key)
}