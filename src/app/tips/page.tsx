import { Metadata } from "next";
import Link from "next/link";
import {
  Luggage, Plane, Shield, Heart, Wallet, Smartphone,
  Globe, FileText, CreditCard, Map, ChevronRight
} from "lucide-react";
import { tipCategories } from "@/lib/travel-tips";

export const metadata: Metadata = {
  title: "Travel Tips & Advice - TravelGuide",
  description: "Essential travel tips, packing lists, safety advice, and money-saving strategies for your next trip.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Luggage, Wallet, Shield, Heart, Smartphone,
};

const quickLinks = [
  { label: "Find Flights", href: "https://www.google.com/travel/flights", icon: Plane, external: true },
  { label: "Book Hotels", href: "https://www.booking.com", icon: Globe, external: true },
  { label: "Compare Deals", href: "https://www.expedia.com", icon: CreditCard, external: true },
  { label: "Compare Destinations", href: "/compare", icon: Map, external: false },
];

export default function TravelTipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Luggage className="w-4 h-4" /> Expert Travel Advice
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3">
          Travel Tips &amp; Advice
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
          Everything you need to travel smarter, safer, and cheaper. Practical tips from experienced travelers.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 sm:mb-14">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          const Comp = link.external ? "a" : Link;
          const extra = link.external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {};
          return (
            <Comp
              key={link.label}
              href={link.href}
              {...extra}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-primary/30 transition-all text-sm font-medium text-foreground"
            >
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{link.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto shrink-0" />
            </Comp>
          );
        })}
      </div>

      {/* Tip Categories */}
      <div className="space-y-8 sm:space-y-12">
        {tipCategories.map((category) => {
          const Icon = iconMap[category.icon] || FileText;
          return (
            <section key={category.title} id={category.title.toLowerCase().replace(/\s+/g, "-")}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`rounded-xl p-2.5 ${category.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {category.tips.map((tip) => (
                  <div
                    key={tip.title}
                    className="bg-white border border-gray-200/60 rounded-xl p-4 sm:p-5 hover:shadow-sm transition-shadow"
                  >
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1.5">{tip.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-10 text-white text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Ready to Explore?</h2>
        <p className="text-blue-100 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          Browse our comprehensive guides for countries and US states, or compare destinations side by side.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Browse Countries <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/25 font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors text-sm"
          >
            Compare Destinations <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
