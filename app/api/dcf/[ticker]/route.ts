import { NextRequest, NextResponse } from "next/server"
import { dcf } from '@/lib/model/execute'
import axios from "@/axios"
import { body } from "@/app/data"

export async function GET(req:NextRequest, context: {params:any}) {
    try {
        const ticker = context.params.ticker
        const url = `/${ticker}?limit=${1}&apikey=${process.env.API_KEY}`

        // const income = await axios.get('/income-statement'+url)
        // const balance = await axios.get('/balance-sheet-statement'+url)
        // const cash = await axios.get('/cash-flow-statement'+url)
        // const profile = await axios.get('/profile'+url)
        
        // const data = {
        //     income_statement: income.data,
        //     balance_sheet: balance.data,
        //     cash_flow: cash.data,
        //     profile: profile.data
        // }

        const f = await dcf(body.data)

        return NextResponse.json({dcf: f, infos: body})
    } catch(e) {
        return NextResponse.json({error: e})
    }
}