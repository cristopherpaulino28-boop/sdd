"use client";

import { Heart, Globe, Map, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/components/FavoriteButton";
import { getCountryBySlug } from "@/lib/countries-data";
import { getStateBySlug } from "@/lib/states-data";
import CountryCard from "@/components/CountryCard";
import StateCard from "@/components/StateCard";

export default function FavoritesPage() {
  const favorites = useFavorites();

  const countries = favorites
    .filter((f) => f.type === "country")
    .map((f) => getCountryBySlug(f.slug))
    .filter(Boolean);

  const states = favorites
    .filter((f) => f.type === "state")
    .map((f) => getStateBySlug(f.slug))
    .filter(Boolean);

  const isEmpty = countries.length === 0 && states.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Heart className="w-4 h-4 fill-current" /> Your Favorites
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          Saved Destinations
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Your personal travel wishlist. Saved locally in your browser.
        </p>
      </div>

      {isEmpty ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 sm:p-16 text-center">
          <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium mb-1">No favorites yet</p>
          <p className="text-gray-400 text-sm mb-6">
            Click the heart icon on any country or state to save it here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm"
            >
              <Globe className="w-4 h-4" /> Browse Countries
            </Link>
            <Link
              href="/states"
              className="inline-flex items-center gap-2 bg-gray-100 text-foreground font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-sm"
            >
              <Map className="w-4 h-4" /> Browse States
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {countries.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Countries ({countries.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {countries.map(
                  (c) => c && <CountryCard key={c.slug} country={c} />
                )}
              </div>
            </section>
          )}

          {states.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Map className="w-5 h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-foreground">US States ({states.length})</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {states.map(
                  (s) => s && <StateCard key={s.slug} state={s} />
                )}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
