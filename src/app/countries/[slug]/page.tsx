import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, MapPin, Users, Globe, Clock, Phone, Wifi, Shield,
  Heart, Plane, Droplets, Zap, Car, Landmark, Languages, Banknote,
  AlertTriangle, Sun, Calendar, RefreshCw
} from "lucide-react";
import { countriesData, getCountryBySlug } from "@/lib/countries-data";
import { formatPopulation, formatArea, getSafetyColor, getSafetyLabel, timeAgo } from "@/lib/utils";
import InfoCard from "@/components/InfoCard";
import BookingLinks from "@/components/BookingLinks";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateStaticParams() {
  return countriesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: "Country Not Found" };
  return {
    title: `${country.name} Travel Guide - TravelGuide`,
    description: `Everything you need to know before visiting ${country.name}. Visa info, safety, health, weather, and more.`,
  };
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  return (
    <div>
      <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden">
        <Image
          src={country.image}
          alt={country.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
          <Link href="/countries" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-2 sm:mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Countries
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={country.flag} alt={`${country.name} flag`} className="w-12 h-8 sm:w-16 sm:h-11 rounded-lg shadow-xl border border-white/20 object-cover" />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">{country.name}</h1>
              <p className="text-white/80 text-xs sm:text-sm mt-1">{country.subregion} &middot; {country.region}</p>
            </div>
            <FavoriteButton slug={country.slug} name={country.name} type="country" className="shadow-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 -mt-4 sm:-mt-6 relative z-10">
          <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border ${getSafetyColor(country.safetyRating)}`}>
            <Shield className="w-4 h-4" /> Safety: {getSafetyLabel(country.safetyRating)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border bg-gray-50 border-gray-200 text-gray-600">
            <Users className="w-4 h-4" /> {formatPopulation(country.population)} people
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border bg-gray-50 border-gray-200 text-gray-600">
            <Globe className="w-4 h-4" /> {formatArea(country.area)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border bg-gray-50 border-gray-200 text-gray-600">
            <MapPin className="w-4 h-4" /> Capital: {country.capital}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" /> Essential Travel Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={Plane} title="Visa Requirements" value={country.visaInfo} colorClass="text-blue-600 bg-blue-50" />
                <InfoCard icon={AlertTriangle} title="Travel Advisory" value={country.travelAdvisory} colorClass="text-amber-600 bg-amber-50" />
                <InfoCard icon={Sun} title="Best Time to Visit" value={country.bestTimeToVisit} colorClass="text-orange-600 bg-orange-50" />
                <InfoCard icon={Calendar} title="Timezone" value={country.timezones.join(", ")} colorClass="text-indigo-600 bg-indigo-50" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" /> Health & Safety
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={Heart} title="Health Info" value={country.healthInfo} colorClass="text-red-600 bg-red-50" />
                <InfoCard icon={Droplets} title="Water Safety" value={country.waterSafety} colorClass="text-cyan-600 bg-cyan-50" />
                <InfoCard icon={Phone} title="Emergency Numbers" value={country.emergencyNumber} colorClass="text-red-600 bg-red-50" />
                <InfoCard icon={Shield} title="Safety Rating" value={`${getSafetyLabel(country.safetyRating)} - ${country.travelAdvisory.split('.')[0]}.`} colorClass="text-emerald-600 bg-emerald-50" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> Practical Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={Zap} title="Plug Type" value={country.plugType} colorClass="text-yellow-600 bg-yellow-50" />
                <InfoCard icon={Car} title="Driving Side" value={country.drivingSide === "right" ? "Right-hand traffic" : "Left-hand traffic"} colorClass="text-purple-600 bg-purple-50" />
                <InfoCard icon={Phone} title="Calling Code" value={country.callingCode} colorClass="text-gray-600 bg-gray-50" />
                <InfoCard icon={Wifi} title="Internet Domain" value={country.tld} colorClass="text-blue-600 bg-blue-50" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.languages.map((lang) => (
                  <span key={lang} className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">{lang}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-green-600" /> Currency
              </h3>
              {country.currencies.map((cur) => (
                <div key={cur.name} className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{cur.symbol}</span>
                  <span className="text-sm text-gray-600">{cur.name}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-primary" /> Quick Facts
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-500">Independent</span>
                  <span className="font-medium">{country.independent ? "Yes" : "No"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">UN Member</span>
                  <span className="font-medium">{country.unMember ? "Yes" : "No"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Landlocked</span>
                  <span className="font-medium">{country.landlocked ? "Yes" : "No"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Borders</span>
                  <span className="font-medium">{country.borders.length > 0 ? country.borders.length + " countries" : "None (island)"}</span>
                </li>
              </ul>
            </div>

            <BookingLinks destination={country.name} type="country" />

            <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <RefreshCw className="w-3.5 h-3.5" />
                Last updated: {timeAgo(country.lastUpdated)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-4">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                <strong>Disclaimer:</strong> Information is for general reference only and may not be current.
                Always verify with official government sources before traveling. We are not affiliated with any
                third-party booking services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
