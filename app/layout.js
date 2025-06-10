import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { SearchProvider } from './context/SearchContext'
import { ThemeProvider } from './context/DarkModeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  icons: { icon: '/logo.png' },
  title: 'Wallpixel',
  description: 'High quality wallpapers for your devices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider> {/* Wraps entire app with dark mode context */}
          <SearchProvider> {/* Wraps with search context */}
            <div className="flex flex-col min-w-screen bg-gray-100 dark:bg-gray-950 transition-all duration-200 overflow-hidden">
              <main className="flex-grow container">
                <Navbar />
                {children}
              </main>
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}