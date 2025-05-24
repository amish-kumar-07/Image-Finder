"use client";

import { useState, useEffect } from "react";
import { logout } from "@/app/actions/logout";
import { useSession } from "@/app/context/SessionContext";
import { useRouter } from "next/navigation";
import { getSavedImages } from "@/app/actions/show";
import UserAvatar from "../components/UserAvatar";
import { Search, LogOut, Menu, Heart } from "lucide-react";

type ImageResult = {
  id: number;
  url: string;
  alt: string;
  likes: number;
};

type ServerImage = {
  id: number;
  url: string;
  name?: string | null;
};

export default function ImageSearchDashboard() {
  const session = useSession();
  const user = session?.user;
  const userEmail = session?.user?.email ?? null;
  const router = useRouter();
  const [results, setResults] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!userEmail) return;

    const fetchSavedImages = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const data: ServerImage[] = await getSavedImages(userEmail);

        const mappedResults: ImageResult[] = data.map((img) => ({
          id: img.id,
          url: img.url,
          alt: img.name ?? "No description",
          likes: 0, // Default if likes info unavailable
        }));

        setResults(mappedResults);
      } catch (err) {
        setErrorMsg("Failed to load saved images.");
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchSavedImages();
  }, [userEmail]);

  const handleLogout = async () => {
    await logout();
  };

  const handleUnlike = async (imageUrl: string) => {
    if (!userEmail) return;

    setDeletingUrl(imageUrl);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          url: imageUrl,
        }),
      });

      if (res.ok) {
        setResults((prev) => prev.filter((image) => image.url !== imageUrl));
      } else {
        setErrorMsg("Failed to delete saved image.");
        console.error("Failed to delete saved image");
      }
    } catch (error) {
      setErrorMsg("Error deleting saved image.");
      console.error("Error deleting saved image:", error);
    }

    setDeletingUrl(null);
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
        <NavButton
          icon={<Search size={18} />}
          label="Search Images"
          onClick={() => router.push("/dashboard")}
        />
        <NavButton icon={<Heart size={18} />} label="Saved Images" active />
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
            <h2 className="text-lg font-semibold text-white">Saved Images</h2>
          </div>
        </header>

        {/* Results Grid */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          {errorMsg && (
            <p className="text-center text-red-500 mb-4">{errorMsg}</p>
          )}

          {isLoading && (
            <p className="text-center text-gray-400 mt-10">Loading saved images...</p>
          )}

          {!isLoading && results.length === 0 && (
            <p className="text-center text-gray-400 mt-10">No saved images found.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(({ id, url, alt }) => (
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
                  <div className="flex items-center text-sm text-red-500 space-x-1">
                    <button
                      onClick={() => handleUnlike(url)}
                      className={`hover:scale-110 transition-transform ${
                        deletingUrl === url ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      aria-label="Unlike"
                      disabled={deletingUrl === url}
                    >
                      <Heart size={16} className="text-red-500" />
                    </button>
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
