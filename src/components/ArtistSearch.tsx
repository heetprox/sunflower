"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { formatNumber } from "@/lib/formatNumber";

interface Artist {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
    popularity: number;
    followers: number;
}

export default function ArtistSearch() {
    const [query, setQuery] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (query.trim().length > 0) {
                searchArtists(query);
            } else {
                setArtists([]);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [query]);

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

    const handleArtistClick = (artist: Artist) => {
        console.log("Selected artist:", artist);
    };

    return (
        <div className="w-[30vw] mx-auto py-4">
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
                        className={`w-full pl-12 pr-12 py-4 bg-[#231f27]  rounded-4xl super  transition-all duration-300 text-white placeholder-white/70 shadow-sm hover:shadow-md focus:outline-none`}
                    />

                    {query && (
                        <button
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
                        onClick={() => handleArtistClick(artist)}
                        className={`flex w-full items-center gap-4  rounded-4xl cursor-pointer
                        ${index == 0 ? "bg-white/10" : "hover:bg-white/15"}
                        `}>
                        {index == 0 ?
                            <div className="flex p-3 flex-col gap-3">

                                <div className="and text-white text-3xl ml-2">Top result</div>
                                <div className="flex p-3 flex-col gap-4 w-full">
                                    <Image
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full w-32 aspect-square object-cover"
                                    />
                                    <div className="w-full rounded-full justify-center super flex flex-col">
                                        <span className="text-white text-2xl">
                                            {artist.name}
                                        </span>
                                        <span className="text-white/60 text-sm">
                                            {formatNumber(artist.followers)} followers
                                        </span>
                                    </div>
                                </div>
                            </div> :
                            <div className="flex gap-4 w-full">
                                <Image
                                    src={artist.images[0].url}
                                    alt={artist.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full aspect-square object-cover"
                                />
                                <div className="w-full rounded-full justify-center super flex flex-col">
                                    <span className="text-white text-lg">
                                        {artist.name}
                                    </span>
                                    <span className="text-white/60 text-sm">
                                        {formatNumber(artist.followers)} followers
                                    </span>
                                </div>
                            </div>}




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
    );
}