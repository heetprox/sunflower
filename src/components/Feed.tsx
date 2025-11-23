import React from 'react'
import Album from './Album'

const Feed = () => {
    return (
        <div className='w-full h-full p-4 flex flex-col gap-18 bg-black'>
            <Album/>
            <Album/>

            <Album/>

            <Album/>

        </div>
    )
}

export default Feed