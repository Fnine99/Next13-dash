import Icons from '@/app/components/Icons'
import { buttonVariants } from '@/app/components/ui/Button'
import LargeHeading from '@/app/components/ui/LargeHeading'
import Paragraph from '@/app/components/ui/Paragraph'
import Link from 'next/link'
import { FC } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finance App | Page not found',
  description: '',
}

const PageNotFound: FC = () => {
  return (
    <section className='container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center'>
      <LargeHeading>Page not found...</LargeHeading>
      <Paragraph>The site you&apos;re searching for does not exist.</Paragraph>
      <Link
        className={buttonVariants({
          variant: 'ghost',
          className: 'w-fit',
        })}
        href='/'>
        <Icons.ChevronLeft className='mr-2 h-4 w-4' />
        Back to home
      </Link>
    </section>
  )
}

export default PageNotFound