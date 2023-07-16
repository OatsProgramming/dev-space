import NavBar from './components/NavBar/NavBar'
import SessionProviderComp from './components/SessionProviderC/SessionProviderC'
import './globals.css'
import { Mulish } from 'next/font/google'
import { SignIn, SignOut } from './components/AuthBtns/AuthBtns'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata = {
  title: 'Dev Space',
  description: '(To be renamed): A place for devs to blog.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={mulish.className}>
        <SessionProviderComp sesh={session}>
          <NavBar />
          {JSON.stringify(session)}
          <SignIn />
          <SignOut />
          {children}
        </SessionProviderComp>
      </body>
    </html>
  )
}
