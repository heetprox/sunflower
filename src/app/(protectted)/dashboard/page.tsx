"use client";

import Nav from "@/components/Nav";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(false);    
  const { data: session, isPending, error } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-between">
      <Nav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className={`w-full h-full bg-[#000000] p-5 min-h-screen ${isExpanded ? 'ml-[15%] transition-all duration-300 ease-in-out' : 'ml-20 transition-all duration-300 ease-in-out'}`}> 
<div className="flex flex-col">
      <div className="text-white and text-3xl">
        Latest Albums
      </div>
        </div>
      </div>
    </div>
  );
}