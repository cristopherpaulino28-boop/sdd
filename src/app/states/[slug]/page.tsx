import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, MapPin, Users, Shield, Clock, Star, TreePine,
  Flower2, Bird, Sun, Thermometer, DollarSign, Lightbulb,
  Mountain, Building, Calendar, RefreshCw
} from "lucide-react";
import { statesData, getStateBySlug } from "@/lib/states-data";
import { formatPopulation, formatArea, getSafetyColor, getSafetyLabel, getCostColor, getCostLabel, timeAgo } from "@/lib/utils";
import InfoCard from "@/components/InfoCard";
import BookingLinks from "@/components/BookingLinks";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateStaticParams() {
  return statesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return { title: "State Not Found" };
  return {
    title: `${state.name} Travel Guide - TravelGuide`,
    description: `Everything you need to know about ${state.name}. Climate, attractions, cost of living, and more.`,
  };
}

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  return (
    <div>
      <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden">
        <Image
          src={state.image}
          alt={state.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
          <Link href="/states" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-2 sm:mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to States
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="bg-white/90 backdrop-blur-sm text-base sm:text-lg font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-gray-800 shadow-xl">
              {state.abbreviation}
            </span>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">{state.name}</h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1">{state.nickname} &middot; {state.region}</p>
            </div>
            <FavoriteButton slug={state.slug} name={state.name} type="state" className="shadow-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 -mt-4 sm:-mt-6 relative z-10">
          <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border ${getSafetyColor(state.safetyRating)}`}>
            <Shield className="w-4 h-4" /> Safety: {getSafetyLabel(state.safetyRating)}
          </span>
          <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border ${getCostColor(state.costOfLiving)}`}>
            <DollarSign className="w-4 h-4" /> Cost: {getCostLabel(state.costOfLiving)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border bg-gray-50 border-gray-200 text-gray-600">
            <Users className="w-4 h-4" /> {formatPopulation(state.population)} people
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border bg-gray-50 border-gray-200 text-gray-600">
            <MapPin className="w-4 h-4" /> Capital: {state.capital}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-orange-500" /> Climate & Weather
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={Sun} title="Climate" value={state.climate} colorClass="text-orange-600 bg-orange-50" />
                <InfoCard icon={Calendar} title="Best Time to Visit" value={state.bestTimeToVisit} colorClass="text-blue-600 bg-blue-50" />
                <InfoCard icon={Thermometer} title="Summer Temperature" value={state.avgTemperature.summer} colorClass="text-red-600 bg-red-50" />
                <InfoCard icon={Thermometer} title="Winter Temperature" value={state.avgTemperature.winter} colorClass="text-cyan-600 bg-cyan-50" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Mountain className="w-5 h-5 text-emerald-600" /> Top Attractions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.topAttractions.map((attraction) => (
                  <div key={attraction} className="bg-white rounded-xl border border-gray-200/60 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <div className="bg-emerald-50 rounded-lg p-2">
                      <Star className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{attraction}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-600" /> Major Cities
              </h2>
              <div className="flex flex-wrap gap-2">
                {state.majorCities.map((city) => (
                  <span key={city} className="bg-purple-50 text-purple-700 text-sm font-medium px-3 py-1.5 rounded-full border border-purple-200">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" /> Practical Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={Clock} title="Timezone" value={state.timezone} colorClass="text-indigo-600 bg-indigo-50" />
                <InfoCard icon={DollarSign} title="Cost of Living" value={getCostLabel(state.costOfLiving)} colorClass="text-green-600 bg-green-50" />
                <InfoCard icon={Shield} title="Safety" value={getSafetyLabel(state.safetyRating)} colorClass="text-emerald-600 bg-emerald-50" />
                <InfoCard icon={MapPin} title="Area" value={formatArea(state.area)} colorClass="text-gray-600 bg-gray-50" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
              <h3 className="font-bold text-foreground mb-3">State Symbols</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Bird className="w-4 h-4 text-sky-500 shrink-0" />
                  <div>
                    <span className="text-gray-400 text-xs block">State Bird</span>
                    <span className="font-medium">{state.bird}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Flower2 className="w-4 h-4 text-pink-500 shrink-0" />
                  <div>
                    <span className="text-gray-400 text-xs block">State Flower</span>
                    <span className="font-medium">{state.flower}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <TreePine className="w-4 h-4 text-green-600 shrink-0" />
                  <div>
                    <span className="text-gray-400 text-xs block">State Tree</span>
                    <span className="font-medium">{state.tree}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
              <h3 className="font-bold text-foreground mb-2">Motto</h3>
              <p className="text-sm text-gray-600 italic">&ldquo;{state.motto}&rdquo;</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
              <h3 className="font-bold text-foreground mb-2">Statehood</h3>
              <p className="text-sm text-gray-600">{state.statehood}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/60 p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Fun Fact
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{state.funFact}</p>
            </div>

            <BookingLinks destination={`${state.name} USA`} type="state" />

            <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <RefreshCw className="w-3.5 h-3.5" />
                Last updated: {timeAgo(state.lastUpdated)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-4">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                <strong>Disclaimer:</strong> Information is for general reference only and may not be current.
                Always verify with official sources before traveling. We are not affiliated with any
                third-party booking services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
