import Navbar from '@/composents/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const head = {
  title: 'My App',
  description: 'My app description',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster 
          position="bottom-right"
          reverseOrder={false}
        />
        {children}
      </body>
    </html>
  )
}
