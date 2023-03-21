'use client'
import React from 'react'

export type Data = { [title:string] : number[] }

const Table: React.FC<{data: Data, title?:boolean, result?: boolean}> = ({ data, title, result }) => {

  return (
    <div className="w-full overflow-x-scroll items-center justify-center">
        <table className="table-auto">
            {
            title && (
                <thead>
                    <tr>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">Jan 1</th>
                        <th className="px-4 py-2">Jan 2</th>
                        <th className="px-4 py-2">Jan 1</th>
                        <th className="px-4 py-2">Jan 2</th>
                        <th className="px-4 py-2">Jan 1</th>
                        <th className="px-4 py-2">Jan 2</th>
                        <th className="px-4 py-2">Jan 2</th>
                    </tr>
                </thead>
            )
            }
            {data &&(
               <tbody>
            {!result ? 
            (
                Object.keys(data).map((title, index)=>{
                return (
                    <tr key={index}>
                            <td className=" px-4 py-2 font-medium">{title}</td>
                        {data[title].map((num, index)=>{
                            return <td key={index} className="border px-4 py-2">{num}</td>
                        })}
                    </tr>
                )
                })
            ) 
            :(
                <tr >
                    {Object.values(data).map((val, index)=>{
                    return (
                        <td key={index} className="px-4 py-2 font-medium">{val}</td>
                    )
                    })}
                </tr>
                   
            )
            }
            </tbody> 
            )}
             
        </table>
    </div>
  )
}

export default Table
