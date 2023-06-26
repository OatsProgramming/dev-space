import NavBar from './components/NavBar/NavBar'
import SessionProviderComp from './components/SessionProviderC/SessionProviderC'
import './globals.css'
import { Mulish } from 'next/font/google'

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
          <NavBar />
          {children}
        </SessionProviderComp>
      </body>
    </html>
  )
}
