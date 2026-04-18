import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield } from "lucide-react";
import { Country } from "@/lib/types";
import { formatPopulation, getSafetyColor, getSafetyLabel } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={country.image}
          alt={country.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className="w-10 h-7 rounded-md shadow-lg border border-white/20 object-cover"
          />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{country.name}</h3>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {country.capital}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {formatPopulation(country.population)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-400">{country.region}</span>
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${getSafetyColor(country.safetyRating)}`}>
            <Shield className="w-3 h-3" /> {getSafetyLabel(country.safetyRating)}
          </span>
        </div>
      </div>
    </Link>
  );
}
