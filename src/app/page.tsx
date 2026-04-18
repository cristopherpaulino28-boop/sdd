import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Map, Shield, Clock, Plane, TrendingUp, ExternalLink } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CountryCard from "@/components/CountryCard";
import StateCard from "@/components/StateCard";
import { countriesData } from "@/lib/countries-data";
import { statesData } from "@/lib/states-data";

const featuredCountries = countriesData.slice(0, 6);
const featuredStates = statesData.slice(0, 6);

const stats = [
  { icon: Globe, label: "Countries", value: `${countriesData.length}+` },
  { icon: Map, label: "US States", value: `${statesData.length}+` },
  { icon: Shield, label: "Safety Ratings", value: "Real-time" },
  { icon: Clock, label: "Data Updates", value: "Auto" },
];

export default function Home() {
  return (
    <div>
      {/* Hero with real background image */}
      <section className="relative min-h-[520px] sm:min-h-[560px] md:min-h-[600px] overflow-hidden flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
          alt="Travel the world"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative w-full">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-white/25">
              <Plane className="w-4 h-4" />
              Your Essential Travel Companion
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6">
              Everything You Need
              <span className="block text-blue-300">Before You Go</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Get comprehensive, up-to-date travel information for countries and US states.
              Visa requirements, safety ratings, weather, health info, and more.
            </p>
            <div className="max-w-xl mx-auto px-2">
              <SearchBar large placeholder="Search any country or US state..." />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm">
              <a href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Google Flights
              </a>
              <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Booking.com
              </a>
              <a href="https://www.expedia.com" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Expedia
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 rounded-xl p-2.5 sm:p-3 shrink-0">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium truncate">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Popular Countries</h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Essential travel info for top destinations worldwide</p>
          </div>
          <Link href="/countries" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredCountries.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Link href="/countries" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            View all countries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* States */}
      <section className="bg-gray-50 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">US States</h2>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Explore America state by state</p>
            </div>
            <Link href="/states" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredStates.map((state) => (
              <StateCard key={state.slug} state={state} />
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link href="/states" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              View all states <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Plan Smarter</h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Tools to help you plan the perfect trip</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Link href="/tips" className="group bg-white border border-gray-200/60 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-blue-200 transition-all">
            <div className="bg-blue-50 rounded-xl p-3 w-fit mb-3 group-hover:bg-blue-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Travel Tips</h3>
            <p className="text-sm text-gray-500">Expert packing tips, safety advice, money-saving strategies, and more.</p>
          </Link>
          <Link href="/compare" className="group bg-white border border-gray-200/60 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-indigo-200 transition-all">
            <div className="bg-indigo-50 rounded-xl p-3 w-fit mb-3 group-hover:bg-indigo-100 transition-colors">
              <ArrowRight className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Compare Destinations</h3>
            <p className="text-sm text-gray-500">Compare any two destinations side by side — countries, states, or both.</p>
          </Link>
          <Link href="/favorites" className="group bg-white border border-gray-200/60 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-red-200 transition-all">
            <div className="bg-red-50 rounded-xl p-3 w-fit mb-3 group-hover:bg-red-100 transition-colors">
              <ExternalLink className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Save Favorites</h3>
            <p className="text-sm text-gray-500">Build your travel wishlist by saving countries and states you want to visit.</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center">
          <TrendingUp className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-blue-200" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">Always Up to Date</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed text-sm sm:text-base">
            Our data is automatically refreshed from trusted sources including REST Countries API,
            ensuring you always have the latest travel information at your fingertips.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm sm:text-base"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <p className="text-[11px] text-gray-400 text-center leading-relaxed max-w-3xl mx-auto">
          <strong>Disclaimer:</strong> TravelGuide is an independent informational resource and is not affiliated with, endorsed by, or sponsored by
          Expedia, Booking.com, Google, or any other third-party service. All third-party trademarks, logos, and brand names are the property
          of their respective owners. Links to external sites are provided for convenience only. We do not receive commissions from these links.
          Travel information is for general reference only and may change without notice. Always verify details with official government sources
          before traveling. See our <Link href="/disclaimer" className="underline hover:text-gray-600">full disclaimer</Link>.
        </p>
      </section>
    </div>
  );
}
