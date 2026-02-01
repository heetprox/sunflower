'use client'

export default function Home() {


  return (
    <div className="bg-[#F9683C] max-h-screen h-full min-h-screen p-3">
      <div className="flex  h-full  overflow-hidden items-center justify-center bg-[#F0EEE1] p-2 text-[#F9683C]">
        <div className="w-1/2 h-full items-center justify-center flex flex-col  ">
          <span className="eww text-5xl uppercase text-center">
            Unforgettable
            <span className="italic text-[#F0EEE1]"
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#000",
            }}
            > moments </span>
            starts with the
             <span className="italic text-[#F0EEE1]"
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#000",
            }}> music </span>
          </span>


          <div className="">
            find your favourt artist 
          </div>
        </div>


        <div className="w-1/2 h-full border-black border-5">
        </div>

      </div>
    </div>
  );
} 