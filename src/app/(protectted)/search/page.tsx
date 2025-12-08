"use client";

import ArtistSearch from "@/components/ArtistSearch";
import Nav from "@/components/Nav";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
 
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
   
<div className="flex flex-col">
      <ArtistSearch />
      {/* <div className="text-white and text-3xl">
        Latest Albums
      </div> */}
        </div>
      </div>
  );
}