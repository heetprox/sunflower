'use client'

import Nav from '@/components/Nav'
import React, { useState } from 'react'


const layout = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className='w-full max-w-[100vw] overflow-hidden'>
            <Nav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`w-full h-full bg-[#000000] min-h-screen pb-16 md:pb-0 transition-all duration-300 ease-in-out ${isExpanded ? 'ml-0 md:ml-[15%]' : 'ml-0 md:ml-20'}`}>

                {children}
            </div>
        </div>
    )
}

export default layout