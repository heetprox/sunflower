import Image from 'next/image'
import React from 'react'

const Nav = () => {
  return (
    <div className=' h-full   min-h-screen  p-4 border-white/50 bg-black flex flex-col w-fit gap-4'>
        <div className="aspect-square items-center w-24 h-fit rounded-lg overflow-hidden">

          <Image
            src={"/like.webp"}
            alt='like'
            width={200}
            height={200}
            className='w-full h-full '
          />
        </div>

        <div className="aspect-square bg-green-400 
        w-24 h-fit rounded-lg"></div>

        <div className="aspect-square w-24 bg-blue-400 h-fit rounded-lg"></div>

        <div className="aspect-square w-24 h-fit bg-yellow-300 rounded-lg"></div>

        <div className="aspect-square bg-white w-24 h-fit rounded-lg"></div>

    </div>
  )
}

export default Nav