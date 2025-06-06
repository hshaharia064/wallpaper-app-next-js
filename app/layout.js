

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { SearchProvider } from './context/SearchContext'
import { ThemeProvider } from './context/DarkModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  icons : {
    icon : '/logo.png'
  },
  title: 'Wallpixel',
  description: 'High quality wallpapers for your devices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className }>
       <ThemeProvider>

       
        <SearchProvider>
      
        <div className={`flex flex-col min-w-screen overflow-hidden bgGradient`}>
         
          <main className="flex-grow container ">
          <Navbar/>
            {children}
          </main>
         
        </div>
        </SearchProvider>
       </ThemeProvider>
      </body>
    </html>
  )
}