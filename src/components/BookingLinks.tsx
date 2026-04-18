import { ExternalLink, Plane } from "lucide-react";

function GoogleFlightsLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8H4.69c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z" fill="#4285F4"/>
      <path d="M18.5 10l-1.5 4.5L15.5 10H14l2.5 7h1l2.5-7h-1.5z" fill="#EA4335"/>
    </svg>
  );
}

function BookingLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="48" rx="4" fill="#003580"/>
      <text x="24" y="34" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#FFFFFF">Booking</text>
      <text x="186" y="34" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#FFFFFF">.com</text>
    </svg>
  );
}

function ExpediaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="48" rx="4" fill="#FBCE04"/>
      <text x="16" y="34" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#1C1C4C">expedia</text>
    </svg>
  );
}

interface BookingLinksProps {
  destination: string;
  type: "country" | "state";
}

export default function BookingLinks({ destination, type }: BookingLinksProps) {
  const encodedDest = encodeURIComponent(destination);

  const links = [
    {
      name: "Google Flights",
      logo: <GoogleFlightsLogo className="w-6 h-6 shrink-0" />,
      url: `https://www.google.com/travel/flights?q=flights+to+${encodedDest}`,
      color: "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200",
      description: "Search flights",
    },
    {
      name: "Booking.com",
      logo: <BookingLogo className="h-5 w-auto shrink-0" />,
      url: `https://www.booking.com/searchresults.html?ss=${encodedDest}`,
      color: "bg-white border-gray-200 hover:bg-[#003580]/5 hover:border-[#003580]/30",
      description: "Find hotels",
    },
    {
      name: "Expedia",
      logo: <ExpediaLogo className="h-5 w-auto shrink-0" />,
      url: `https://www.expedia.com/Hotel-Search?destination=${encodedDest}`,
      color: "bg-white border-gray-200 hover:bg-yellow-50 hover:border-yellow-300",
      description: "Compare deals",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
      <h3 className="font-bold text-foreground mb-1 flex items-center gap-2">
        <Plane className="w-4 h-4 text-primary" /> Book Your Trip
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        Find flights and hotels for {destination}
      </p>
      <div className="space-y-2.5">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${link.color}`}
          >
            {link.logo}
            <div className="min-w-0 flex-1">
              <span className="text-sm font-semibold text-foreground block">{link.name}</span>
              <span className="text-xs text-gray-400">{link.description}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          </a>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
        We are not affiliated with these services. Links open external sites. We do not receive commissions.
      </p>
    </div>
  );
}
