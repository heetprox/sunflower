'use client'

import Nav from '@/components/Nav'
import React, { useState } from 'react'


const layout = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className='w-full max-w-[100vw] overflow-hidden'>
            <Nav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`w-full h-full bg-[#000000] min-h-screen ${isExpanded ? 'ml-[15%] transition-all duration-300 ease-in-out' : 'ml-20 transition-all duration-300 ease-in-out'}`}>

                {children}
            </div>
        </div>
    )
}

export default layout