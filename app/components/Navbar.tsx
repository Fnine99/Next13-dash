// import { authOptions } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggler'
import { buttonVariants } from './ui/Button'
import SignInButton from './ui/SignInButton'
import SignOutButton from './ui/SignOutButton'

const Navbar = () => {
//   const session = await getServerSession(authOptions)

  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link href='/' className={buttonVariants({ variant: 'link' })}>
          Gadient Financial v0.1
        </Link>

        <div className='md:hidden'>
          <ThemeToggle />
        </div>

        <div className='hidden md:flex gap-4'>
          <ThemeToggle />
          <Link
            href='/'
            className={buttonVariants({ variant: 'ghost' })}>
            Documentation
          </Link>
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            href='/dashboard'>
            Dashboard
          </Link>
          <SignInButton />
          {/* {session ? (
            <>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Navbar