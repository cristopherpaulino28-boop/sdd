import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Shield } from "lucide-react";
import { USState } from "@/lib/types";
import { formatPopulation, getSafetyColor, getSafetyLabel } from "@/lib/utils";

interface StateCardProps {
  state: USState;
}

export default function StateCard({ state }: StateCardProps) {
  return (
    <Link
      href={`/states/${state.slug}`}
      className="group bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={state.image}
          alt={state.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md text-gray-800 shadow">
            {state.abbreviation}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{state.name}</h3>
          <p className="text-white/80 text-xs mt-0.5 drop-shadow">{state.nickname}</p>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {state.capital}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {formatPopulation(state.population)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-400">{state.region}</span>
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${getSafetyColor(state.safetyRating)}`}>
            <Shield className="w-3 h-3" /> {getSafetyLabel(state.safetyRating)}
          </span>
        </div>
      </div>
    </Link>
  );
}
