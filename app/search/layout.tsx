import '../globals.css'
import React, {} from 'react'
import Search from "./components/Search"

export const metadata = {
  title: 'My Financial Analysis App',
  description: 'Analyze your finances with ease.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='bg-zinc-800 font-sans'>
        <nav className="flex items-center justify-between bg-white py-4 px-12">
            <div className="flex items-center">
                <div className="text-2xl mr-5 font-bold text-gray-800">Financial App</div>
            </div>
            <div className="flex items-center justify-start">
                <Search />
            </div>
            <div className="flex items-center">
                <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red">
                    Exit
                </button>
            </div>
        </nav>
        <>
        <div className="bg-gray-900" style={{ height: `calc(100vh - 140px)` }}>
          <div className="container mx-auto px-4 py-10">
            {children}
          </div>
        </div>
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm">&copy; 2023 Financial App. All rights reserved.</p>
                <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-400">Terms of Use</a></li>
                <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                </ul>
            </div>
        </footer>
        </>
      </body>
    </html>
  )
}
