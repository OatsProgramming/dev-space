import NavBar from './components/NavBar/NavBar'
import SessionProviderComp from './components/SeshProvider/SeshClient'
import './globals.css'
import { Mulish } from 'next/font/google'
import { SignIn, SignOut } from './components/AuthBtns/AuthBtns'
import Footer from './components/Footer/Footer'
import SeshProvider from './components/SeshProvider/SeshProvider'

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
        <SeshProvider>
          <NavBar />
          <SignIn />
          <SignOut />
          {children}
        </SeshProvider>
        <Footer />
      </body>
    </html>
  )
}
