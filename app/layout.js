

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { SearchProvider } from './context/SearchContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wallpaper Heaven',
  description: 'High quality wallpapers for your devices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
      
        <div className="flex flex-col min-w-screen overflow-hidden">
         
          <main className="flex-grow container ">
          <Navbar/>
            {children}
          </main>
         
        </div>
        </SearchProvider>
      </body>
    </html>
  )
}