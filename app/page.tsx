import Link from "next/link"
import Image from "next/image"
import LargeHeading from "./components/ui/LargeHeading"
import Paragraph from "./components/ui/Paragraph"

export default function Landing() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center '>
          <LargeHeading
            size='lg'
            className='three-d text-black dark:text-light-gold'>
            Easily determine <br /> text similarity.
          </LargeHeading>

          <Paragraph className='max-w-xl lg:text-left'>
            Work your Model{' '}
            <Link
              href='/login'
              className='underline underline-offset-2 text-black dark:text-light-gold'>
              API key
            </Link>
            .
          </Paragraph>

          {/* <div className='relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute'>
            <Image
              priority
              className='img-shadow '
              quality={100}
              style={{ objectFit: 'contain' }}
              fill
              src='https://raw.githubusercontent.com/joschan21/similarity-api/main/public/typewriter.png'
              alt='typewriter'
            />
            </div> */}
        </div>
      </div>
    </div>
    // <div className="flex flex-col justify-center items-center h-screen">
    //   <h1 className="text-4xl font-bold text-gray-800 mb-8">
    //     My Financial Analysis App
    //   </h1>
    //   <p className="text-lg text-gray-500 mb-8">
    //     Analyze your finances with ease.
    //   </p>
    //   <div className="flex justify-center mb-8">
    //     <a role={"button"} href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded mr-4">
    //       Sign Up
    //     </a>
    //     <a role={"button"} href="/search" className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded">
    //       Learn More
    //     </a>
    //   </div>
    // </div>
  )
}

