"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

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

      // Extract artist IDs - handle both array of strings and array of objects
      const artistIds = followedData.data.map((item: any) => 
        typeof item === 'string' ? item : item.artistId || item.id
      );

      // Fetch albums for each artist
      const allAlbumsPromises = artistIds.map(async (artistId: string) => {
        const albumRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getallalbum/${artistId}`
        );
        const albumData = await albumRes.json();
        return albumData.success ? albumData.data : [];
      });

      const allAlbumsArrays = await Promise.all(allAlbumsPromises);
      const allAlbums = allAlbumsArrays.flat();

      // Sort by release date (newest first)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!session) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">Latest Albums</h1>

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-[#231f27] rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative mb-4 aspect-square">
                  <Image
                    src={album.images[0]?.url || "/placeholder.png"}
                    alt={album.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <h3 className="text-white font-semibold mb-1 truncate group-hover:text-white/90">
                  {album.name}
                </h3>

                <p className="text-white/60 text-sm mb-1 truncate">
                  {album.artists.map((artist) => artist.name).join(", ")}
                </p>

                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{formatDate(album.release_date)}</span>
                  <span className="capitalize">{album.album_type}</span>
                </div>

                <p className="text-white/40 text-xs mt-1">
                  {album.total_tracks} track{album.total_tracks !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}