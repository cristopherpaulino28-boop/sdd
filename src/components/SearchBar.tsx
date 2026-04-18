"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { countriesData } from "@/lib/countries-data";
import { statesData } from "@/lib/states-data";
import { SearchResult } from "@/lib/types";

interface SearchBarProps {
  large?: boolean;
  placeholder?: string;
}

export default function SearchBar({ large = false, placeholder = "Search countries, states, or cities..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const countryResults: SearchResult[] = countriesData
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.capital.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((c) => ({
        type: "country",
        name: c.name,
        slug: c.slug,
        image: c.flag,
        subtitle: `${c.capital} - ${c.region}`,
      }));

    const stateResults: SearchResult[] = statesData
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.capital.toLowerCase().includes(q) ||
          s.nickname.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((s) => ({
        type: "state",
        name: s.name,
        slug: s.slug,
        image: s.flag,
        subtitle: `${s.capital} - ${s.nickname}`,
      }));

    setResults([...countryResults, ...stateResults].slice(0, 8));
    setIsOpen(true);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(result: SearchResult) {
    setIsOpen(false);
    setQuery("");
    if (result.type === "country") {
      router.push(`/countries/${result.slug}`);
    } else {
      router.push(`/states/${result.slug}`);
    }
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className={`relative flex items-center ${large ? "text-lg" : "text-sm"}`}>
        <Search className={`absolute left-4 text-gray-400 ${large ? "w-5 h-5" : "w-4 h-4"}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-foreground placeholder:text-gray-400 ${
            large ? "pl-12 pr-12 py-4" : "pl-10 pr-10 py-2.5"
          }`}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); setIsOpen(false); }}
            className={`absolute right-4 text-gray-400 hover:text-gray-600 ${large ? "w-5 h-5" : "w-4 h-4"}`}
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.slug}`}
              onClick={() => handleSelect(result)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0"
            >
              <img
                src={result.image}
                alt={result.name}
                className="w-8 h-6 object-cover rounded-sm border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{result.name}</p>
                <p className="text-xs text-muted truncate">{result.subtitle}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                result.type === "country"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {result.type === "country" ? "Country" : "State"}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-center z-50">
          <p className="text-sm text-gray-500">No destinations found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
