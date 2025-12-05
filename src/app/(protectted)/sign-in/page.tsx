import { GoogleSignIn } from '@/components/GoogleSignIn'
import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <GoogleSignIn />
    </div>
  )
}

export default page