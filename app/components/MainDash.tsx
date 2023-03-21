'use client'
// import { authOptions } from '@/lib/auth'
// import { db } from '@/lib/db'
import { formatDistance } from 'date-fns'
// import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import useSwr from 'swr'
import axios from "axios";
import type { Data } from '@/app/components/Table'
// import ApiKeyOptions from './ApiKeyOptions'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import Table from './ui/Table'

const fetcher = (url:string) => axios.get(url).then(res => res.data)
const arr: Data = {
    "ebit": [0, 1, 2, 3, 1 ,1, 4],
    "item 2": [0, 1, 2, 3, 1 ,1, 4],
    "item 3": [0, 1, 2, 3, 1 ,1, 4],
    "item 4": [0, 1, 2, 3, 1 ,1, 4],
    "item 5": [0, 1, 2, 3, 1 ,1, 4]
  }
const MainDashboard = ({}) => {
//   const user = await getServerSession(authOptions)
//   if (!user) return notFound()

//   const apiKeys = await db.apiKey.findMany({
//     where: { userId: user.user.id },
//   })

//   const activeApiKey = apiKeys.find((key) => key.enabled)

//   if (!activeApiKey) return notFound()

//   const userRequests = await db.apiRequest.findMany({
//     where: {
//       apiKeyId: {
//         in: apiKeys.map((key) => key.id),
//       },
//     },
//   })

//   const serializableRequests = userRequests.map((req) => ({
//     ...req,
//     timestamp: formatDistance(new Date(req.timestamp), new Date()),
//   }))

    const { data, error, isLoading } = useSwr(`api/dcf/${'aapl'}`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    })
  return (
    <div className='container flex flex-col gap-6'>
      <LargeHeading>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
        </div>
      </LargeHeading>
      <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
        <Paragraph>Your API key:</Paragraph>
        
        {/* <ApiKeyOptions apiKeyKey={activeApiKey.key} /> */}
      </div>

      <Paragraph className='text-center md:text-left mt-4 -mb-4'>
        Your API history:
      </Paragraph>

      <Table userRequests={data} />
    </div>
  )
}

export default MainDashboard
