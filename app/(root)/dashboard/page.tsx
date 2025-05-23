"use client";

import { useState } from "react";
import { logout } from "@/app/actions/logout";
import { useSession } from "@/app/context/SessionContext";
import { useRouter } from "next/navigation";

import UserAvatar from "../components/UserAvatar";
import {
  Search,
  LogOut,
  Menu,
  X,
  Download,
  Heart,
} from "lucide-react";

type ImageResult = {
  id: number;
  url: string;
  alt: string;
  likes: number;
};

export default function ImageSearchDashboard() {
  const session = useSession();
  const user = session?.user;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ImageResult[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const fallbackImages: ImageResult[] = [
    { id: 101, url: "https://via.placeholder.com/300x200?text=Fallback+Image+1", alt: "Fallback Image 1", likes: 100 },
    { id: 102, url: "https://via.placeholder.com/300x200?text=Fallback+Image+2", alt: "Fallback Image 2", likes: 150 },
    { id: 103, url: "https://via.placeholder.com/300x200?text=Fallback+Image+3", alt: "Fallback Image 3", likes: 75 },
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResults([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();

      if (Array.isArray(data.results) && data.results.length > 0) {
        setResults(data.results);
      } else {
        setResults(fallbackImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setResults(fallbackImages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleLogout = async () => {
    await logout();
  };

 const handleSaveImage = async (id: number, url: string) => {
    if (!user?.email || !user?.name || !id || !url) {
      alert("Not saved. Please try again");
      return;
    }

    try {
      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          url,
        }),
      });

      const data = await response.json();
      
      if(!data){
         alert("Error found");
      }
      
      alert("Image is saved!");
    } catch (error) {
      console.error("Save image failed:", error);
      alert("Failed to save image.");
    }
  };


  const moveToSaveImage = () => {
    router.push("/SavedImage");
  };

  const NavButton = ({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
        active
          ? "bg-blue-600 text-white font-semibold"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );

  const SidebarContent = () => (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-900 p-2 rounded-full">
          <UserAvatar image={session?.user?.image ?? null} />
        </div>
        <div>
          <p className="font-medium text-white">{user?.name ?? "Guest"}</p>
          <p className="text-sm text-gray-400">{user?.email ?? ""}</p>
        </div>
      </div>
      <nav className="space-y-1">
        <NavButton icon={<Search size={18} />} label="Search Images" active />
        <NavButton icon={<Heart size={18} />} label="Saved Images" onClick={moveToSaveImage} />
      </nav>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-800 shadow-xl border-r border-gray-700">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">ImageFinder</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <SidebarContent />
        </div>
        <div className="p-4 border-t border-gray-700">
          <NavButton icon={<LogOut size={18} />} label="Sign out" onClick={handleLogout} />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isSidebarOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar Panel */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-xl border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">ImageFinder</h1>
          <button
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <SidebarContent />
        </div>
        <div className="p-4 border-t border-gray-700">
          <NavButton icon={<LogOut size={18} />} label="Sign out" onClick={handleLogout} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700 shadow-sm">
          <div className="flex items-center">
            <button
              className="p-2 mr-4 rounded-md md:hidden text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-white">Image Search</h2>
          </div>
        </header>

        {/* Search Input */}
        <div className="px-6 py-4 bg-gray-800 shadow-sm border-b border-gray-700">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Search for images..."
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          {results.length === 0 && !isLoading && (
            <p className="text-center text-gray-400 mt-10">No images found. Try searching above.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(({ id, url, alt, likes }) => (
              <div
                key={id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={url}
                  alt={alt}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300 truncate">{alt}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      aria-label={likedImages.has(id) ? "Unlike image" : "Like image"}
                      onClick={() => toggleLike(id)}
                      className={`text-sm ${
                        likedImages.has(id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <Heart size={16} onClick={() => handleSaveImage(id, url)} />
                    </button>
                    <span className="text-gray-400 select-none">
                      {(typeof likes === "number" && !isNaN(likes) ? likes : 0) +
                        (likedImages.has(id) ? 1 : 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
