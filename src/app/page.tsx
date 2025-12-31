'use client'
import Snowfall from 'react-snowfall'
import AText from "@/components/AText";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import Panel from "@/components/Panel";
import { ArrowBigRight, ArrowDownLeft, ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {

  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animated gradient background
    let x = 0;
    let y = 0;
    const animate = () => {
      x += 0.3;
      y += 0.2;
      if (gradientRef.current) {
        gradientRef.current.style.transform = `translate(${Math.sin(x / 100) * 20}px, ${Math.cos(y / 100) * 20}px) scale(1.1)`;
      }
      requestAnimationFrame(animate);
    };
    animate();

  }, []);
  return (
    <div className="flex max-h-screen h-full min-h-screen  overflow-hidden items-center justify-center ">
      {/* <video className="absolute w-full h-screen top-0 opacity-30 object-cover" autoPlay loop muted>
        <source src="/hero.webm" type="video/webm" />
      </video> */}
      <Snowfall  radius={[0.5,7]} />

  <Panel />
      <Image
        src="/sunflower.jpg"
        alt="hero"
        className="absolute w-full h-screen top-0 opacity-100 object-cover"
        width={1000}
        height={1000}
      />


      <div className="flex z-50 w-full px-4">
          <div
          className="w-full text-center font-bold bg-black py-2 pb-3 text-sm sm:text-lg md:text-xl lg:text-2xl">
              Vibe with your favorite artists
          </div>
         

      



      </div>
    </div>
  );
}