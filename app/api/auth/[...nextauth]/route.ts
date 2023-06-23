import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
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

                return {
                    id: user.id,
                    name: user.username,
                };
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id ,
                    name: token.name,
                    favIds: token.favIds
                },
            };
        },
        jwt: ({ token, user, trigger, session }) => {
            if (trigger === 'update') {
                // Validate the data
                if (session.username) {
                    token.username = session.username
                }
            }
            // Exec on sign in
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                }
            }
            // Exec on reg
            return token
        }
    }
}

// Export it like this so that next auth can use this
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }