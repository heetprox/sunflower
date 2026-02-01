'use client'

import { GoogleSignIn } from "@/components/GoogleSignIn";
import Image from "next/image";

export default function Home() {


  return (
    <div className="bg-[#ff00a6] max-h-screen h-full min-h-screen p-3">
      <div className="flex  h-full  overflow-hidden items-center justify-center bg-[#000000] p-2 text-[#f93cb7]">
        <div className="absolute z-10 w-1/2 h-full items-center justify-center flex flex-col  ">
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


          <div className="text-white/90 edi max-w-md text-center">
            Follow your favorite Music Artist — and Track All Albums Categories Data all of your Artist.
          </div>

          <div className="">
            <GoogleSignIn/>
            </div>
        </div>



        <div className="w-full h-full border-black border-5">
        <Image
        className="w-full h-full opacity-35 object-cover"
        src="/bg.png" alt="bg-image" width={100} height={100} />
        </div>

      </div>
    </div>
  );
} 