import Nav from './components/Nav/Nav'
import SessionProviderComp from './components/SessionProviderComp/SessionProviderComp'
import './globals.css'
import { Mulish } from 'next/font/google'
import NextUIProviderComp from './components/NextUI/NextUIProviderComp'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata = {
  title: 'Dev Space',
  description: '(To be renamed): A place for devs to blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <SessionProviderComp>
          <NextUIProviderComp>
            <Nav />
            {children}
          </NextUIProviderComp>
        </SessionProviderComp>
      </body>
    </html>
  )
}
