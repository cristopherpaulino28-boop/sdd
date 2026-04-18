import { Metadata } from "next";
import StateCard from "@/components/StateCard";
import SearchBar from "@/components/SearchBar";
import { statesData } from "@/lib/states-data";

export const metadata: Metadata = {
  title: "US States - TravelGuide",
  description: "Browse all US states with essential travel information",
};

const regions = ["All", ...Array.from(new Set(statesData.map((s) => s.region)))];

export default async function StatesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;
  const filtered = region && region !== "All"
    ? statesData.filter((s) => s.region === region)
    : statesData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">US States</h1>
        <p className="text-gray-500 max-w-2xl">
          Explore {statesData.length} US states with travel tips, climate info, top attractions, cost of living, and more.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar placeholder="Search states..." />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {regions.map((r) => (
          <a
            key={r}
            href={r === "All" ? "/states" : `/states?region=${r}`}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((state) => (
          <StateCard key={state.slug} state={state} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No states found for this region.</p>
        </div>
      )}
    </div>
  );
}
