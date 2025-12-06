import { GoogleSignIn } from '@/components/GoogleSignIn'
import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
        <div className="and text-white text-4xl" >Welcome to Sunflower</div>
      <GoogleSignIn />
    </div>
  )
}

export default page