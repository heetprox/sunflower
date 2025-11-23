import Image from 'next/image'
import React from 'react'

const Nav = () => {
  return (
    <div className=' h-full   min-h-screen  p-4 border-white/50 bg-black flex flex-col w-28 overflow-hidden gap-4'>
      <div className="aspect-square cursor-pointer items-center w-full h-fit rounded-lg overflow-hidden">

        <Image
          src={"/like.webp"}
          alt='like'
          width={200}
          height={200}
          className='w-full h-full '
        />
      </div>

      <div className="aspect-square  bg-green-400 
        w-full h-fit rounded-lg"></div>

      <div className="aspect-square w-full bg-blue-400 h-fit rounded-lg"></div>

      <div className="aspect-square w-full h-fit bg-yellow-300 rounded-lg"></div>

      <div className="aspect-square bg-white w-full h-fit rounded-lg"></div>

    </div>
  )
}

export default Nav