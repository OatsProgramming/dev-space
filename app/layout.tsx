import NavBar from './components/NavBar/NavBar'
import './globals.css'
import { Mulish } from 'next/font/google'
import { SignIn, SignOut } from './components/AuthBtns/AuthBtns'
import Footer from './components/Footer/Footer'
import SeshProvider from './components/context/SeshProvider/SeshProvider'

import { toastOptions } from '@/lib/toast/toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        <ToastContainer {...toastOptions} />
      </body>
    </html>
  )
}
