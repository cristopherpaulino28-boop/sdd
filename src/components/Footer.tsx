import Link from "next/link";
import { Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-xl p-2">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Travel<span className="text-blue-400">Guide</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your essential travel companion. Get up-to-date information about every destination before you go.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/countries" className="text-sm hover:text-white transition-colors">All Countries</Link></li>
              <li><Link href="/states" className="text-sm hover:text-white transition-colors">US States</Link></li>
              <li><Link href="/search" className="text-sm hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Regions</h3>
            <ul className="space-y-2">
              <li><Link href="/countries?region=Europe" className="text-sm hover:text-white transition-colors">Europe</Link></li>
              <li><Link href="/countries?region=Asia" className="text-sm hover:text-white transition-colors">Asia</Link></li>
              <li><Link href="/countries?region=Americas" className="text-sm hover:text-white transition-colors">Americas</Link></li>
              <li><Link href="/countries?region=Africa" className="text-sm hover:text-white transition-colors">Africa</Link></li>
              <li><Link href="/countries?region=Oceania" className="text-sm hover:text-white transition-colors">Oceania</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Book Travel</h3>
            <ul className="space-y-2">
              <li><a href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer nofollow" className="text-sm hover:text-white transition-colors">Google Flights</a></li>
              <li><a href="https://www.booking.com" target="_blank" rel="noopener noreferrer nofollow" className="text-sm hover:text-white transition-colors">Booking.com</a></li>
              <li><a href="https://www.expedia.com" target="_blank" rel="noopener noreferrer nofollow" className="text-sm hover:text-white transition-colors">Expedia</a></li>
              <li><Link href="/disclaimer" className="text-sm hover:text-white transition-colors">Disclaimer &amp; Legal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 space-y-4">
          <p className="text-[11px] text-gray-500 leading-relaxed text-center max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> TravelGuide is an independent informational resource. We are not affiliated with, endorsed by,
            or sponsored by Google, Booking Holdings, Expedia Group, or any government agency. All trademarks belong to their
            respective owners. Links to third-party sites are for convenience only — we do not receive commissions. Travel information
            is for general reference and may change without notice. Always verify with official sources.
            See our <Link href="/disclaimer" className="underline hover:text-gray-300">full disclaimer</Link>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} TravelGuide. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for travelers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
