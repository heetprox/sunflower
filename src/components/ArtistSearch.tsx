"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

    // Debounce search
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

            // Call your Express backend
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
        // Handle artist selection (e.g., follow, view details, etc.)
        console.log("Selected artist:", artist);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {/* Search Input */}
            <div className="relative mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for artists..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loading && (
                    <div className="absolute right-3 top-3">
                        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Results */}
            <div className="space-y-3">
                {artists.map((artist) => (
                    <div
                        key={artist.id}
                        onClick={() => handleArtistClick(artist)}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                        {/* Artist Image */}
                        <div className="shrink-0">
                            {artist.images.length > 0 ? (
                                <Image
                                    src={artist.images[0].url}
                                    alt={artist.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-600 text-xl">
                                        {artist.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>

                       

                        {/* Popularity Badge */}
                        <div className="shrink-0">
                            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {artist.popularity}%
                            </div>
                        </div>
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