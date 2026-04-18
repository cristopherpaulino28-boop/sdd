"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe, Menu, X, MapPin, Heart, Lightbulb, ArrowLeftRight } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-xl p-2 group-hover:bg-primary-dark transition-colors">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Travel<span className="text-primary">Guide</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
            >
              Home
            </Link>
            <Link
              href="/countries"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
            >
              Countries
            </Link>
            <Link
              href="/states"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
            >
              US States
            </Link>
            <Link
              href="/tips"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
            >
              Tips
            </Link>
            <Link
              href="/compare"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
            >
              Compare
            </Link>
            <Link
              href="/favorites"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Heart className="w-4 h-4" />
            </Link>
            <Link
              href="/search"
              className="ml-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4" />
              Explore
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-3">
            <nav className="flex flex-col gap-1">
              <Link href="/" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/countries" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg" onClick={() => setMenuOpen(false)}>
                Countries
              </Link>
              <Link href="/states" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg" onClick={() => setMenuOpen(false)}>
                US States
              </Link>
              <Link href="/tips" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg" onClick={() => setMenuOpen(false)}>
                Travel Tips
              </Link>
              <Link href="/compare" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg" onClick={() => setMenuOpen(false)}>
                Compare
              </Link>
              <Link href="/favorites" className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-lg flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <Heart className="w-4 h-4" /> Favorites
              </Link>
              <Link href="/search" className="px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg text-center" onClick={() => setMenuOpen(false)}>
                Explore
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
