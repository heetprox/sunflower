import Image from 'next/image'
import React from 'react'

const Logo2 = () => {
  return (
    <div className='flex items-center w-auto h-full aspect-square bg-[#2a2a2a] rounded-full border-4 border-white '>
      <Image src="logo/logo.svg" alt="Logo" width={100} height={100} 
      style={{
      padding: 'clamp(0.75rem, 0.75vw, 10rem)',
      }}
      className=' aspect-square w-full h-full' />
    </div>
  )
}

export default Logo2
