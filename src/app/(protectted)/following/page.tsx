"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { Users } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  popularity: number;
  followers: { total: number };
  genres: string[];
}

export default function page() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchFollowedArtists();
    }
  }, [session]);

  const fetchFollowedArtists = async () => {
    try {
      setLoading(true);
      setError("");

      const followedRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getfollowed?id=${session?.user?.id}`
      );
      const followedData = await followedRes.json();

      if (!followedData.success) {
        setError("Failed to fetch followed artists");
        setLoading(false);
        return;
      }

      const artistIds = followedData.data.map((item: any) => 
        typeof item === 'string' ? item : item.artistId || item.id
      );

      // Fetch full artist details for each ID
      const artistPromises = artistIds.map(async (artistId: string) => {
        const artistRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getartist/${artistId}`
        );
        const artistData = await artistRes.json();
        return artistData.success ? artistData.data : null;
      });

      const artistsData = await Promise.all(artistPromises);
      const validArtists = artistsData.filter(artist => artist !== null);

      // Sort by popularity
      validArtists.sort((a, b) => b.popularity - a.popularity);

      setArtists(validArtists);
    } catch (err) {
      console.error("Error fetching artists:", err);
      setError("An error occurred while fetching artists");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const handleArtistClick = (artistId: string) => {
    router.push(`/artist/${artistId}`);
  };

  if (!session) {
    return null;
  }

  return (
    <div className="w-full super min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users size={32} className="text-white md:w-10 md:h-10" />
          <h1 className="text-white text-3xl md:text-4xl font-bold">Following</h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-white/20 border-t-white rounded-full"></div>
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            You're not following any artists yet. Start following artists to see them here!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => handleArtistClick(artist.id)}
                  className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative mb-4 aspect-square">
                    <Image
                      src={artist.images[0]?.url || "/placeholder.png"}
                      alt={artist.name}
                      width={200}
                      height={200}
                      className="rounded-full aspect-square w-full object-cover shadow-lg"
                    />
                  </div>

                  <h3 className="text-white font-semibold text-base mb-2 truncate group-hover:underline">
                    {artist.name}
                  </h3>

                  <p className="text-[#b3b3b3] text-sm mb-1">
                    {formatNumber(artist.followers.total)} followers
                  </p>

                  {artist.genres && artist.genres.length > 0 && (
                    <p className="text-[#6a6a6a] text-xs truncate capitalize">
                      {artist.genres.slice(0, 2).join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-[#b3b3b3] text-sm text-center">
              Following {artists.length} artist{artists.length !== 1 ? "s" : ""}
            </div>
          </>
        )}
      </div>
    </div>
  );
}