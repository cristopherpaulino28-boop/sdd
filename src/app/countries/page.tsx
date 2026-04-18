import { Metadata } from "next";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import { countriesData } from "@/lib/countries-data";

export const metadata: Metadata = {
  title: "Countries - TravelGuide",
  description: "Browse all countries with essential travel information",
};

const regions = ["All", ...Array.from(new Set(countriesData.map((c) => c.region)))];

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;
  const filtered = region && region !== "All"
    ? countriesData.filter((c) => c.region === region)
    : countriesData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Countries</h1>
        <p className="text-gray-500 max-w-2xl">
          Browse {countriesData.length} countries with comprehensive travel information including
          visa requirements, safety ratings, health advisories, and more.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar placeholder="Search countries..." />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {regions.map((r) => (
          <a
            key={r}
            href={r === "All" ? "/countries" : `/countries?region=${r}`}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              (r === "All" && !region) || region === r
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {r}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No countries found for this region.</p>
        </div>
      )}
    </div>
  );
}
