import useSwr from 'swr'
import { useRouter } from 'next/navigation'
import fetcher from "@/lib/fetcher";

type Ticker = string 

const useData = (ticker:Ticker, pars:any) => {
    // const { query } = useRouter()
    const { data, error, isLoading } = useSwr([`/search/${ticker}`, pars], (url:any, pars:any)=>fetcher(url, pars), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    return { data, error, isLoading }
}

export default useData