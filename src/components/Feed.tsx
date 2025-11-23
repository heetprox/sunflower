import React from 'react'

const Feed = () => {
    return (
        <div className='w-full h-full p-4 bg-black'>
            <div className=" flex flex-col w-full h-fit gap-2">
                <div className="text-white mono font-normal tracking-tight text-2xl">25-5-2016</div>
                <div className="flex gap-4 h-full w-full">
                    <div className="w-34 aspect-square bg-purple-400 rounded-lg"></div>
                    <div className="flex justify-between h-34 text-white play flex-col  gap-2 overflow-hidden   w-fit">

                        <div className="flex flex-col">
                            <div className="text-3xl font-bold">Light Switch</div>
                            <div className=" opacity-95 text-xl">Charlie puth</div>
                        </div>
                        <div className="bg-green-400 items-center w-15 aspect-square rounded-full p-4">
                            <div className="bg-black w-full h-full" style={{
                                clipPath: "polygon(80% 50%, 25% 90%, 25% 10%)"
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed