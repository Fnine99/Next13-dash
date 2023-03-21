import MainDash from '@/app/components/MainDash'
// import RequestApiKey from '@/app/components/RequestApiKey'
// import { authOptions } from '@/lib/auth'
// import { db } from '@/lib/db'
// import { getServerSession } from 'next-auth'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Finance App | Dashboard',
  description: '',
}

const page = () => {
//   const user = await getServerSession(authOptions)
//   if (!user) return notFound()

//   const apiKey = await db.apiKey.findFirst({
//     where: { userId: user.user.id, enabled: true },
//   })

  return (
    <div className='max-w-7xl mx-auto mt-16'>
        <MainDash />
      {/* {apiKey ? (
        <MainDash />
      ) : (
        <RequestApiKey />
      )} */}
    </div>
  )
}

export default page