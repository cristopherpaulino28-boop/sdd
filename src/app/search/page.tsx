import { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import CountryCard from "@/components/CountryCard";
import StateCard from "@/components/StateCard";
import { countriesData } from "@/lib/countries-data";
import { statesData } from "@/lib/states-data";
import { Globe, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Destinations - TravelGuide",
  description: "Search and explore countries and US states",
};

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Destinations</h1>
        <p className="text-gray-500 mb-8">
          Search for any country or US state to get comprehensive travel information.
        </p>
        <SearchBar large placeholder="Type a country, state, or city..." />
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">All Countries</h2>
          <span className="text-sm text-gray-400 ml-2">({countriesData.length})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {countriesData.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <Map className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">All US States</h2>
          <span className="text-sm text-gray-400 ml-2">({statesData.length})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statesData.map((state) => (
            <StateCard key={state.slug} state={state} />
          ))}
        </div>
      </div>
    </div>
  );
}
