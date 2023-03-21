'use client'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import useSwr from 'swr'
import axios from "axios"

// import Input from '@/app/components/ui/Input'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const fetcher = (url:string) => axios.get(url).then(res => res.data)

import { body } from '@/app/data'
const poster = (url:string, bodyy:any) => axios.get(url, {params:{bodyy}}).then(res => res.data)


export default function Home() {
  const router = useRouter()
    const [ticker, setTicker] = useState<string>('pltr')

    const pushroute = () => router.push(`/search?ticker=${ticker}`)
    
  return (
    <>
      {/* <Input label={'Ticker'} value={ticker} onChange={(e:any) => setTicker(e.target.value)}/> */}
      <button onClick={pushroute}>search</button>
    </>
    
  )
}