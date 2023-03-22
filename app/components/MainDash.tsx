'use client'
import React, { useCallback, useState } from 'react'
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
import SelectData from './SelectData'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import Table from './ui/Table'

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const head = {
    0:'2023',
    2:'2024',
    3:'2025',
    4:'2026',
    5:'2027'
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

    const [search, setSearch] = useState<string>('') // prevent the default event!

    const [ticker, setTicker] = useState<string>('aapl')
    
    // const handleInput = (e) => {

    // }

    const handleSearch = (e:any) => {
        e.preventDefault();
        return setTicker(search)
    }

    const { data, error, isLoading } = useSwr(`api/dcf/${ticker}`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    })

    console.log(data)
  return (
    <div className='container flex flex-col gap-6'>
      <LargeHeading>
        <div className="flex lg:gap-8 sm:gap-2 justify-between">
            <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                <Input value={search} onChange={(e)=> setSearch(e.target.value)} type="search" placeholder="Ticker" />
                <Button type="submit">Search</Button>
            </form>
            <div className="flex flex-1 justify-between max-h-10">
                <div className="flex basis-1/4 flex-col">
                    <p className="text-sm antialiased tracking-normal text-gray-600 text-opacity-60">{data?.infos?.profile[0].exchange.split(' ')[0]}</p>
                    <p className="text-sm antialiased tracking-normal">{`${data?.infos?.profile[0].symbol}, ${data?.infos?.profile[0].companyName}`}</p>
                </div>
                <div className="flex basis-1/4 flex-col">
                    <p className="text-sm antialiased tracking-normal text-gray-600 text-opacity-60">{`${data?.infos?.profile[0].changes}  (${(data?.infos?.profile[0].changes/data?.infos?.profile[0].price).toFixed(3)} %)`}</p>
                    <p className="text-sm antialiased tracking-normal">{`${data?.infos?.profile[0].price} ${data?.infos?.profile[0].currency.slice(0,2)}$ [${data?.infos?.profile[0].range}]`}</p>
                </div>
                <div className="flex basis-1/2 flex-col flex-wrap max-h-full">
                    <p className="text-sm antialiased tracking-normal overflow-hidden overflow-y-scroll">{data?.infos?.profile[0].description}</p>
                </div>
            </div>
        </div>
      </LargeHeading>
      <div className='flex md:flex-row gap-4 justify-center md:justify-start items-center'>
        <div className="flex flex-1 basis-1/2"><SelectData className="w-full"/></div>
        <div className="flex flex-1 basis-1/2"><SelectData className="w-full"/></div>
        {/* <ApiKeyOptions apiKeyKey={activeApiKey.key} /> */}
      </div>

      <Paragraph className='text-center md:text-left mt-4 -mb-4'>
        Your API history:
      </Paragraph>

      <Table body={data?.dcf?.forerasts_table} header={head} results={data?.dcf?.forerasts_table_results}/>
    </div>
  )
}

export default MainDashboard
