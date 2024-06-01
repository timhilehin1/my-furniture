import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-4 mt-12'>
     <h1 className='text-[8rem] font-black text-secondary-color leading-[7rem]'>404</h1>
     <p className='font-semibold text-xl text-secondary-color'>Page not found</p>
     <Link href='/' className='px-5 py-3 text-white bg-secondary-text-color mt-6 font-semibold'>Back home</Link>
    </div>
  )
}

export default page
