import Navbar from '@/app/components/Navbar'
import { Toaster } from '@/app/components/ui/toast'
import './globals.css'
import { Inter } from 'next/font/google'

import MobileMenu from '@/app/components/MobileMenu'
import Providers from '@/app/components/Providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className='min-h-screen bg-slate-50 dark:bg-slate-900 antialiased'>
        <Providers>
          <Navbar />
          <Toaster position='bottom-right' />

          <MobileMenu />

          <main>{children}</main>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  )
}