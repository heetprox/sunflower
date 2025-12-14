"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { ArrowLeft, Clock } from "lucide-react";

interface Album {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  release_date: string;
  total_tracks: number;
  artists: { id: string; name: string }[];
  album_type: string;
}

export default function AllAlbumsPage() {
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
    <div className="w-full super min-h-screen p-8">
      <div className="max-w-7xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-white text-4xl font-bold mb-8">All Albums</h1>

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
          <div className="bg-[#181818]/40 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-[#b3b3b3] text-sm font-medium">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Artist</div>
              <div className="col-span-2">Release Date</div>
              <div className="col-span-1 flex justify-end">
                <Clock size={16} />
              </div>
            </div>

            {/* Album Rows */}
            <div>
              {albums.map((album, index) => (
                <div
                  key={album.id}
                  className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-white/10 transition-colors cursor-pointer group items-center"
                >
                  <div className="col-span-1 text-[#b3b3b3] text-sm text-center">
                    {index + 1}
                  </div>
                  
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={album.images[0]?.url || "/placeholder.png"}
                        alt={album.name}
                        width={48}
                        height={48}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <a 
                        href={`https://open.spotify.com/album/${album.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium truncate group-hover:underline block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {album.name}
                      </a>
                      <p className="text-[#b3b3b3] text-sm capitalize">
                        {album.album_type}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 text-[#b3b3b3] text-sm truncate">
                    {album.artists.map((artist) => artist.name).join(", ")}
                  </div>

                  <div className="col-span-2 text-[#b3b3b3] text-sm">
                    {formatDate(album.release_date)}
                  </div>

                  <div className="col-span-1 text-[#b3b3b3] text-sm text-right">
                    {album.total_tracks}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-[#b3b3b3] text-sm text-center">
          {albums.length} albums total
        </div>
      </div>
    </div>
  );
}