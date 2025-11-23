import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen h-[200vh] flex flex-col justify-center text-xl items-center play bg-black">
       <Feed/>
    </div>
  );
}
