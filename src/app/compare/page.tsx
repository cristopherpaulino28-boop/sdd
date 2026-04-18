"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight, Globe, Map, Users, Ruler, Shield, Clock,
  Plane, DollarSign, Thermometer, Heart, Zap, ChevronDown, X
} from "lucide-react";
import { countriesData } from "@/lib/countries-data";
import { statesData } from "@/lib/states-data";

type Destination = {
  type: "country" | "state";
  name: string;
  slug: string;
  image: string;
  flag: string;
  capital: string;
  population: number;
  area: number;
  safetyRating: string;
  bestTimeToVisit: string;
  region: string;
  extra: Record<string, string>;
};

function toDestination(c: (typeof countriesData)[0]): Destination {
  return {
    type: "country",
    name: c.name,
    slug: c.slug,
    image: c.image,
    flag: c.flag,
    capital: c.capital,
    population: c.population,
    area: c.area,
    safetyRating: c.safetyRating,
    bestTimeToVisit: c.bestTimeToVisit,
    region: c.region,
    extra: {
      "Languages": c.languages.join(", "),
      "Currency": c.currencies.map((cu) => `${cu.name} (${cu.symbol})`).join(", "),
      "Driving Side": c.drivingSide,
      "Plug Type": c.plugType,
      "Water Safety": c.waterSafety,
      "Visa Info": c.visaInfo,
      "Emergency": c.emergencyNumber,
    },
  };
}

function toDestinationState(s: (typeof statesData)[0]): Destination {
  return {
    type: "state",
    name: s.name,
    slug: s.slug,
    image: s.image,
    flag: s.flag,
    capital: s.capital,
    population: s.population,
    area: s.area,
    safetyRating: s.safetyRating,
    bestTimeToVisit: s.bestTimeToVisit,
    region: s.region,
    extra: {
      "Nickname": s.nickname,
      "Timezone": s.timezone,
      "Cost of Living": s.costOfLiving,
      "Top Attractions": s.topAttractions.join(", "),
      "Major Cities": s.majorCities.join(", "),
      "Climate": s.climate,
      "Fun Fact": s.funFact,
    },
  };
}

const allDestinations = [
  ...countriesData.map(toDestination),
  ...statesData.map(toDestinationState),
].sort((a, b) => a.name.localeCompare(b.name));

function formatPop(n: number) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toString();
}

function safetyColor(r: string) {
  if (r === "very-high") return "text-green-600 bg-green-50";
  if (r === "high") return "text-blue-600 bg-blue-50";
  if (r === "moderate") return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

function Picker({
  selected,
  onSelect,
  label,
  otherSelected,
}: {
  selected: Destination | null;
  onSelect: (d: Destination) => void;
  label: string;
  otherSelected: Destination | null;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      allDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) &&
          d.slug !== otherSelected?.slug
      ),
    [search, otherSelected]
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-primary/40 transition-colors text-left"
      >
        {selected ? (
          <>
            <Image
              src={selected.flag}
              alt={selected.name}
              width={32}
              height={24}
              className="rounded-sm object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-foreground text-sm block truncate">{selected.name}</span>
              <span className="text-xs text-gray-400">{selected.type === "country" ? "Country" : "US State"}</span>
            </div>
          </>
        ) : (
          <div className="flex-1">
            <span className="text-gray-400 text-sm">{label}</span>
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-56">
            {filtered.map((d) => (
              <button
                key={d.slug}
                onClick={() => {
                  onSelect(d);
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 text-left text-sm"
              >
                <Image
                  src={d.flag}
                  alt={d.name}
                  width={24}
                  height={16}
                  className="rounded-sm object-cover shrink-0"
                />
                <span className="truncate">{d.name}</span>
                <span className="text-xs text-gray-400 ml-auto shrink-0">
                  {d.type === "country" ? "Country" : "State"}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-sm text-gray-400 text-center">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CompareRow({ label, icon: Icon, left, right }: { label: string; icon: React.ComponentType<{ className?: string }>; left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="text-sm text-foreground text-right">{left}</div>
      <div className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{label}</span>
      </div>
      <div className="text-sm text-foreground">{right}</div>
    </div>
  );
}

export default function ComparePage() {
  const [left, setLeft] = useState<Destination | null>(null);
  const [right, setRight] = useState<Destination | null>(null);

  const swap = () => {
    setLeft(right);
    setRight(left);
  };

  const clear = () => {
    setLeft(null);
    setRight(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <ArrowLeftRight className="w-4 h-4" /> Side by Side
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          Compare Destinations
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Pick two destinations to compare key travel information side by side.
        </p>
      </div>

      {/* Pickers */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-start mb-8">
        <Picker selected={left} onSelect={setLeft} label="Select first..." otherSelected={right} />
        <button
          onClick={swap}
          className="mt-2 sm:mt-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          title="Swap"
        >
          <ArrowLeftRight className="w-4 h-4 text-gray-500" />
        </button>
        <Picker selected={right} onSelect={setRight} label="Select second..." otherSelected={left} />
      </div>

      {left && right && (
        <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden">
          {/* Images */}
          <div className="grid grid-cols-2">
            <div className="relative h-40 sm:h-56">
              <Image src={left.image} alt={left.name} fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-bold text-sm sm:text-lg">{left.name}</p>
                <p className="text-white/70 text-xs">{left.type === "country" ? "Country" : "US State"} · {left.region}</p>
              </div>
            </div>
            <div className="relative h-40 sm:h-56">
              <Image src={right.image} alt={right.name} fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-bold text-sm sm:text-lg">{right.name}</p>
                <p className="text-white/70 text-xs">{right.type === "country" ? "Country" : "US State"} · {right.region}</p>
              </div>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="p-4 sm:p-6">
            <CompareRow label="Capital" icon={Globe} left={left.capital} right={right.capital} />
            <CompareRow label="Population" icon={Users} left={formatPop(left.population)} right={formatPop(right.population)} />
            <CompareRow label="Area" icon={Ruler} left={`${left.area.toLocaleString()} km²`} right={`${right.area.toLocaleString()} km²`} />
            <CompareRow
              label="Safety"
              icon={Shield}
              left={<span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${safetyColor(left.safetyRating)}`}>{left.safetyRating.replace("-", " ")}</span>}
              right={<span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${safetyColor(right.safetyRating)}`}>{right.safetyRating.replace("-", " ")}</span>}
            />
            <CompareRow label="Best Time" icon={Clock} left={left.bestTimeToVisit} right={right.bestTimeToVisit} />

            {/* Extra fields */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left details */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground mb-2">{left.name}</h4>
                  {Object.entries(left.extra).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-xs text-gray-400 font-medium">{k}</span>
                      <p className="text-sm text-foreground">{v}</p>
                    </div>
                  ))}
                  <Link
                    href={`/${left.type === "country" ? "countries" : "states"}/${left.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2"
                  >
                    View full guide →
                  </Link>
                </div>
                {/* Right details */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground mb-2">{right.name}</h4>
                  {Object.entries(right.extra).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-xs text-gray-400 font-medium">{k}</span>
                      <p className="text-sm text-foreground">{v}</p>
                    </div>
                  ))}
                  <Link
                    href={`/${right.type === "country" ? "countries" : "states"}/${right.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2"
                  >
                    View full guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(!left || !right) && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 sm:p-16 text-center">
          <ArrowLeftRight className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">Select two destinations above to compare them</p>
          <p className="text-gray-400 text-sm mt-1">You can compare countries with countries, states with states, or mix and match!</p>
        </div>
      )}

      {left && right && (
        <div className="mt-6 text-center">
          <button onClick={clear} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-3.5 h-3.5" /> Clear comparison
          </button>
        </div>
      )}
    </div>
  );
}
