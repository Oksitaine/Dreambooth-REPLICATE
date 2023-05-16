
import Navbar from '@/composents/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

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
        {children}
      </body>
    </html>
  )
}
