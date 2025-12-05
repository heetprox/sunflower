import AText from "@/components/AText";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { ArrowBigRight, ArrowDownLeft, ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex max-h-screen h-full min-h-screen  overflow-hidden items-center justify-center bg-black">
      {/* <video className="absolute w-full h-screen top-0 opacity-30 object-cover" autoPlay loop muted>
        <source src="/hero.webm" type="video/webm" />
      </video> */}

      <div className="flex flex-col w-[65%]">
        <div className="super">
          <AText >
            <div className="flex flex-col">
              <h1 className="text-7xl leading-none font-black text-white opacity-95 "
              >
                Browze
              </h1>
              <h1 className="text-7xl leading-none text-white opacity-95"
              >Listen {"&"} Love</h1>
              <h1

                className="text-8xl font-black and text-blue-200 bg-clip-text opacity-100 leading-20">
                Your Artist
              </h1>
            </div>

          </AText>

          <Link href={"/sign-in"}>
            <div className="bg-white text-lg mt-7 font-normal text-black px-5 py-2 rounded-sm w-fit">start browsing <MoveRight className="inline-block w-5 h-5 " /></div>
          </Link>
        </div>


        <div className="">

        </div>
      </div>
    </div>
  );
}