"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

interface Album {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  release_date: string;
  total_tracks: number;
  artists: { id: string; name: string }[];
  album_type: string;
}

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchFollowedArtistsAlbums();
    }
  }, [session]);

  const fetchFollowedArtistsAlbums = async () => {
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

      const allAlbumsPromises = artistIds.map(async (artistId: string) => {
        const albumRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getallalbum/${artistId}`
        );
        const albumData = await albumRes.json();
        return albumData.success ? albumData.data : [];
      });

      const allAlbumsArrays = await Promise.all(allAlbumsPromises);
      const allAlbums = allAlbumsArrays.flat();

      const sortedAlbums = allAlbums.sort((a: Album, b: Album) => {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      });

      setAlbums(sortedAlbums);
    } catch (err) {
      console.error("Error fetching albums:", err);
      setError("An error occurred while fetching albums");
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  const isRecent = (dateString: string) => {
    const albumDate = new Date(dateString);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return albumDate >= thirtyDaysAgo;
  };

  if (!session) {
    return null;
  }

  const recentAlbums = albums.filter(album => isRecent(album.release_date)).slice(0, 4);
  const olderAlbums = albums.filter(album => !isRecent(album.release_date)).slice(0, 8);

  return (
    <div className="w-full super min-h-screen p-8">
      <div className="max-w-full md:max-w-[90%] ">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-white/20 border-t-white rounded-full"></div>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            No albums found. Follow some artists to see their latest releases!
          </div>
        ) : (
          <>
            {recentAlbums.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-white text-2xl font-bold">Latest Albums</h1>
                  <Link 
                    href="/albums/all"
                    className="text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {recentAlbums.map((album) => (
                    <div
                      key={album.id}
                      className="p-2"
                    >
                      <div className="relative mb-4 aspect-square">
                        <Image
                          src={album.images[0]?.url || "/placeholder.png"}
                          alt={album.name}
                          width={400}
                          height={400}
                          className="rounded-lg aspect-square w-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-semibold text-base mb-1 truncate">
                        {album.name}
                      </h3>
                      <p className="text-[#b3b3b3] text-sm truncate">
                        {album.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {olderAlbums.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-2xl font-bold">Earlier Releases</h2>
                  <Link 
                    href="/albums/all"
                    className="text-[#b3b3b3] hover:text-white text-sm font-semibold transition-colors"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                  {olderAlbums.map((album) => (
                    <div
                      key={album.id}
                      className="flex items-center gap-4 hover:bg-[#282828] rounded p-2 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="relative w-20 h-20 shrink-0">
                        <Image
                          src={album.images[0]?.url || "/placeholder.png"}
                          alt={album.name}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base mb-1 truncate">
                          {album.name}
                        </h3>
                        <p className="text-[#b3b3b3] text-sm truncate">
                          {album.artists.map((artist) => artist.name).join(", ")}
                        </p>
                        <p className="text-[#6a6a6a] text-xs mt-1">
                          {getMonthName(album.release_date)} {new Date(album.release_date).getDate()}, {new Date(album.release_date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}