"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { formatNumber } from "@/lib/formatNumber";
import { useSession } from "@/lib/auth-client"; 

interface Artist {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
    popularity: number;
    followers: { total: number };
}

export default function ArtistSearch() {
    const [query, setQuery] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [followedArtists, setFollowedArtists] = useState<Set<string>>(new Set());
    const [followLoading, setFollowLoading] = useState(false);

    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (userId) {
            fetchFollowedArtists();
        }
    }, [userId]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (query.trim().length > 0) {
                searchArtists(query);
            } else {
                
                setArtists([]);
                console.log(artists);
                
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [query]);

    const fetchFollowedArtists = async () => {
        if (!userId) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/getfollowed?id=${userId}`
            );
            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                // Store followed artist IDs in a Set for quick lookup
                const followedIds: Set<string> = new Set(result.data);
                setFollowedArtists(followedIds);
            }
        } catch (err) {
            console.error("Failed to fetch followed artists:", err);
        }
    };

    const searchArtists = async (searchQuery: string) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(searchQuery)}`
            );

            const result = await response.json();

            if (result.success) {
                setArtists(result.data);
            } else {
                setError(result.message || "Failed to search artists");
            }
        } catch (err) {
            setError("An error occurred while searching");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const hleArtistClick = (artist: Artist) => {
        setSelectedArtist(artist);
    };

    const hleFollowToggle = async () => {
        if (!selectedArtist || !userId) {
            setError("Please log in to follow artists");
            return;
        }

        try {
            setFollowLoading(true);
            const isFollowing = followedArtists.has(selectedArtist.id);
            const endpoint = isFollowing ? "/api/unfollowartist" : "/api/followartist";

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?id=${userId}&artistId=${selectedArtist.id}`
            );

            const result = await response.json();

            if (result.success) {
                const newFollowedArtists = new Set(followedArtists);
                if (isFollowing) {
                    newFollowedArtists.delete(selectedArtist.id);
                } else {
                    newFollowedArtists.add(selectedArtist.id);
                }
                setFollowedArtists(newFollowedArtists);
            } else {
                setError(result.message || "Failed to update follow status");
            }
        } catch (err) {
            setError("An error occurred while updating follow status");
            console.error(err);
        } finally {
            setFollowLoading(false);
        }
    };

    const closeSidePanel = () => {
        setSelectedArtist(null);
    };

    return (
        <div className="flex w-full edi h-screen">
            <div className="md:w-[60vw] w-[90vw] mx-auto py-4">
                <div className="relative w-full mb-6">
                    <div className={`relative w-full transition-all duration-300 `}>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Search
                                className={`transition-colors duration-300 `}
                                color="white"
                                size={20}
                            />
                        </div>

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for artists..."
                            className={`w-full pl-12 pr-12 py-4 bg-[#231f27]  rounded-4xl  transition-all duration-300 text-white placeholder-white/70 shadow-sm hover:shadow-md focus:outline-none`}
                        />

                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
              hover:text-gray-600 transition-colors duration-200 p-1 rounded-full
              hover:bg-gray-100"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    {loading && (
                        <div className="absolute right-3 top-3">
                            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Results */}
                <div className="space-y-3 w-full">
                    {artists.map((artist, index) => (
                        <div
                            key={artist.id}
                            onClick={() => hleArtistClick(artist)}
                            className={`flex w-full items-center gap-4  rounded-4xl cursor-pointer
                        ${index == 0 ? "bg-white/10" : "hover:bg-white/15"}
                        `}>
                            {index == 0 ? (
                                <div className="flex p-3 flex-col gap-3">
                                    <div className=" text-white text-3xl ml-2">Top result</div>
                                    <div className="flex p-3 flex-col gap-4 w-full">
                                        <Image
                                            src={artist.images[0].url}
                                            alt={artist.name}
                                            width={64}
                                            height={64}
                                            className="rounded-full w-32 aspect-square object-cover"
                                        />
                                        <div className="w-full rounded-full justify-center  flex flex-col">
                                            <span className="text-white text-2xl">
                                                {artist.name}
                                            </span>
                                            <span className="text-white/60 text-sm">
                                                {formatNumber(artist.followers.total)} followers
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-4 w-full p-3">
                                    <Image
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full aspect-square object-cover"
                                    />
                                    <div className="w-full rounded-full justify-center  flex flex-col">
                                        <span className="text-white text-lg">
                                            {artist.name}
                                        </span>
                                        <span className="text-white/60 text-sm">
                                            {formatNumber(artist.followers.total)} followers
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* No Results */}
                    {query.trim().length > 0 && !loading && artists.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No artists found for "{query}"
                        </div>
                    )}
                </div>
            </div>

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-[#1a1620] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                    selectedArtist ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {selectedArtist && (
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-white text-xl ">Artist Profile</h2>
                            <button
                                onClick={closeSidePanel}
                                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Artist Info */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex flex-col items-center gap-6">
                                {/* Artist Image */}
                                <Image
                                    src={selectedArtist.images[0].url}
                                    alt={selectedArtist.name}
                                    width={200}
                                    height={200}
                                    className="rounded-full aspect-square object-cover shadow-lg"
                                />

                                {/* Artist Name */}
                                <div className="text-center">
                                    <h3 className="text-white text-3xl  mb-2">
                                        {selectedArtist.name}
                                    </h3>
                                    <p className="text-white/60 text-lg">
                                        {formatNumber(selectedArtist.followers.total)} followers
                                    </p>
                                </div>

                                {/* Follow Button */}
                                <button
                                    onClick={hleFollowToggle}
                                    disabled={followLoading}
                                    className={`px-8 py-3 rounded-full  text-lg transition-all duration-200 ${
                                        followedArtists.has(selectedArtist.id)
                                            ? "bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:scale-105"
                                            : "bg-white text-black hover:scale-105 hover:bg-white/90"
                                    } ${
                                        followLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {followLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                                            <span>Loading...</span>
                                        </div>
                                    ) : followedArtists.has(selectedArtist.id) ? (
                                        "Following"
                                    ) : (
                                        "Follow"
                                    )}
                                </button>

                                {/* Additional Stats */}
                                <div className="w-full mt-6 space-y-4">
                                    <div className="bg-white/5 rounded-2xl p-4">
                                        <div className="text-white/60 text-sm mb-1">Popularity</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-white/10 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${selectedArtist.popularity}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-white ">
                                                {selectedArtist.popularity}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay */}
            {selectedArtist && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={closeSidePanel}
                ></div>
            )}
        </div>
    );
}