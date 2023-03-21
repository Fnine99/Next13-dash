'use client'
import React, { useState, useCallback, useContext } from 'react'
import useSwr from 'swr'
import axios from "axios";
import query ,{ useRouter, useSearchParams } from 'next/navigation';

import Table from '@/app/components/Table';
import type { Data } from '@/app/components/Table'
const arr: Data = {
  "ebit": [0, 1, 2, 3, 1 ,1, 4],
  "item 2": [0, 1, 2, 3, 1 ,1, 4],
  "item 3": [0, 1, 2, 3, 1 ,1, 4],
  "item 4": [0, 1, 2, 3, 1 ,1, 4],
  "item 5": [0, 1, 2, 3, 1 ,1, 4]
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

export default function Home() {
    const pars = useSearchParams()
    const ticker = pars.get('ticker')

    const search = useCallback(()=>{
      
    }, [])
    const { data, error, isLoading } = useSwr(`api/dcf/${ticker}`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    })

    console.log(data)
    
  return (
            <div className="flex flex-col">
              {/* First Row */}
              <button>
                {isLoading?'loading...' : ticker}
              </button>
              <div className="flex items-center justify-between bg-gray-800 py-4 px-6 mb-4 rounded-lg">
                <div>
                  <h1 className="text-lg font-semibold text-white">{data?.infos.data.profile[0].companyName}</h1>
                  <p className="text-gray-400 text-sm mt-1">{data?.infos.data.profile[0].exchange}</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-12 h-12 rounded-lg"></div>
                  <div className="text-white ml-4">
                    <p className="text-sm">{data?.infos.data.profile[0].symbol}</p>
                    <h2 className="text-lg font-bold">{'$ '+ data?.infos.data.profile[0].price}</h2>
                    <p className="text-sm">{data?.infos.data.profile[0].changes}</p>
                  </div>
                </div>
              </div>
    
              {/* Second Row */}
              <div className="flex flex-col md:flex-row mb-4">
                <div className="w-full md:w-2/3 md:pr-4">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Selection Table</h2>
                    <table className="w-full text-white">
                      <thead>
                        <tr>
                          <th className="py-2 text-left">Option 1</th>
                          <th className="py-2 text-left">Option 2</th>
                          <th className="py-2 text-left">Option 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                          <td className="py-2">Duis auctor mi non sapien tincidunt, in feugiat justo varius.</td>
                          <td className="py-2">Praesent euismod enim at lacinia molestie.</td>
                        </tr>
                        <tr>
                          <td className="py-2">Nullam interdum enim at neque fermentum, eu euismod est aliquet.</td>
                          <td className="py-2">Ut convallis lacus ut ex fringilla, in efficitur velit convallis.</td>
                          <td className="py-2">Phasellus sed enim et lorem molestie fringilla id sed sapien.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full md:w-1/3 mt-4 md:mt-0">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
                    <p className="text-white">
                      {data?.infos.data.profile[0].industry}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <Table data={data?.dcf.forerasts_table} title={false}/>
                    <Table data={data?.dcf.forerasts_table_results} result={true} title={false}/>
                </div>
                </div>
                </div>
                </div>
    
  )
}