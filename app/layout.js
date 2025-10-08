import { Toaster } from 'react-hot-toast'
import './globals.css'
import Footer from '@/components/Footer/Footer'


export const metadata = {
  title: 'Raaj Dhoundiyal',
  description: 'Professional Photography Portfolio',
  icon: '/favicon.ico', 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
           <Footer />
        </body>
    </html>
  )
}