import Link from "next/link";
import { Globe, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <Globe className="w-16 h-16 text-gray-300 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-3">Destination Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist. It might have been moved or the URL might be incorrect.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}
