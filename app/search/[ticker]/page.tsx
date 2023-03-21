import React from 'react'
import {useSearchParams} from 'next/navigation'

export default function Window() {
  const pars = useSearchParams()
  const ticker = pars.get('ticker')
  return (
    <div>{ticker}</div>
  )
}
