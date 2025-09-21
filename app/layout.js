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
           <Footer />
        </body>
    </html>
  )
}