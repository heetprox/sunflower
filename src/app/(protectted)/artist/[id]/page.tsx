"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface Album {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  release_date: string;
  total_tracks: number;
  artists: { id: string; name: string }[];
  album_type: string;
}

interface Artist {
  id: string;
  name: string;
  images: { url: string; height: number; width: number }[];
  popularity: number;
  followers: { total: number };
  genres: string[];
}

export default function ArtistDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const artistId = params?.id as string;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user?.id && artistId) {
      fetchArtistDetails();
    }
  }, [session, artistId]);

  const fetchArtistDetails = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch artist info
      const artistRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getartist/${artistId}`
      );
      const artistData = await artistRes.json();

      if (!artistData.success) {
        setError("Failed to fetch artist details");
        setLoading(false);
        return;
      }

      setArtist(artistData.data);

      // Fetch albums
      const albumRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getallalbum/${artistId}`
      );
      const albumData = await albumRes.json();

      if (albumData.success) {
        const sortedAlbums = albumData.data.sort((a: Album, b: Album) => {
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        });
        setAlbums(sortedAlbums);
      }
    } catch (err) {
      console.error("Error fetching artist details:", err);
      setError("An error occurred while fetching artist details");
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing ? "unfollowartist" : "followartist";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}?id=${session?.user?.id}&artistId=${artistId}`
      );
      const result = await response.json();
      
      if (result.success) {
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  if (!session || !artist) {
    return null;
  }

  return (
    <div className="w-full super min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[400px] bg-linear-to-b from-[#535353] to-[#121212]"
        style={{
          backgroundImage: artist.images[0]?.url 
            ? `linear-gradient(transparent 0%, rgba(0,0,0,.5) 100%), url(${artist.images[0].url})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#121212]" />
        
        <div className="relative max-w-7xl mx-auto px-8 h-full flex flex-col justify-between py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors w-fit"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="flex items-end gap-6">
            <div className="relative w-56 h-56 shrink-0">
              <Image
                src={artist.images[0]?.url || "/placeholder.png"}
                alt={artist.name}
                width={224}
                height={224}
                className="rounded-full aspect-square object-cover shadow-2xl"
              />
            </div>
            
            <div className="pb-6">
              <p className="text-white text-sm font-semibold mb-2">Artist</p>
              <h1 className="text-white text-6xl font-bold mb-4">{artist.name}</h1>
              <div className="flex items-center gap-2 text-white text-sm">
                <span>{formatNumber(artist.followers.total)} followers</span>
                {artist.genres.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{artist.genres[0]}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleFollow}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
              isFollowing
                ? "bg-transparent text-white border-2 border-white/20 hover:border-white/40 hover:scale-105"
                : "bg-white text-black hover:scale-105"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          
          <a
            href={`https://open.spotify.com/artist/${artistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border-2 border-white/20 hover:border-white/40 hover:scale-105 transition-all"
          >
            <ExternalLink size={20} className="text-white" />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-white/20 border-t-white rounded-full"></div>
          </div>
        ) : (
          <>
            <h2 className="text-white text-2xl font-bold mb-6">Discography</h2>
            
            {albums.length === 0 ? (
              <div className="text-center py-12 text-white/60">
                No albums found for this artist.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {albums.map((album) => (
                  <a
                    key={album.id}
                    href={`https://open.spotify.com/album/${album.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-all duration-300 group"
                  >
                    <div className="relative mb-4 aspect-square">
                      <Image
                        src={album.images[0]?.url || "/placeholder.png"}
                        alt={album.name}
                        width={200}
                        height={200}
                        className="rounded-lg aspect-square w-full object-cover"
                      />
                    </div>

                    <div className="text-white font-semibold text-base mb-1 truncate group-hover:underline">
                      {album.name}
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#b3b3b3]">
                      <span>{new Date(album.release_date).getFullYear()}</span>
                      <span className="capitalize">{album.album_type}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}