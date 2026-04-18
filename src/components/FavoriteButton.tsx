"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  slug: string;
  name: string;
  type: "country" | "state";
  className?: string;
}

function getFavorites(): { slug: string; name: string; type: "country" | "state" }[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("tg_favorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(favs: { slug: string; name: string; type: "country" | "state" }[]) {
  localStorage.setItem("tg_favorites", JSON.stringify(favs));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<{ slug: string; name: string; type: "country" | "state" }[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    const handler = () => setFavorites(getFavorites());
    window.addEventListener("favorites-updated", handler);
    return () => window.removeEventListener("favorites-updated", handler);
  }, []);

  return favorites;
}

export default function FavoriteButton({ slug, name, type, className = "" }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    setIsFav(favs.some((f) => f.slug === slug));
  }, [slug]);

  const toggle = () => {
    const favs = getFavorites();
    const exists = favs.some((f) => f.slug === slug);
    let newFavs;
    if (exists) {
      newFavs = favs.filter((f) => f.slug !== slug);
    } else {
      newFavs = [...favs, { slug, name, type }];
    }
    saveFavorites(newFavs);
    setIsFav(!exists);
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <button
      onClick={toggle}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`p-2 rounded-full transition-all ${
        isFav
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-400"
      } ${className}`}
    >
      <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
    </button>
  );
}
