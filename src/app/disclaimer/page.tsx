import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, ExternalLink, AlertTriangle, Scale, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Legal - TravelGuide",
  description: "Legal disclaimer, terms of use, and privacy information for TravelGuide.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-primary text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Disclaimer &amp; Legal</h1>
      <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl border border-gray-200/60 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-amber-50 rounded-lg p-2.5 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground pt-1">General Disclaimer</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              The information provided on TravelGuide (&quot;the Website&quot;) is for <strong>general informational purposes only</strong>.
              All information on the Website is provided in good faith; however, we make no representation or warranty of any kind,
              express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any
              information on the Website.
            </p>
            <p>
              <strong>Under no circumstance shall we have any liability to you</strong> for any loss or damage of any kind incurred
              as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website
              and your reliance on any information on the Website is solely at your own risk.
            </p>
            <p>
              Travel conditions, visa requirements, safety ratings, health advisories, and all other travel-related information
              <strong> can change rapidly and without notice</strong>. Always verify all information with official government sources,
              embassies, consulates, and relevant authorities before making any travel decisions.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200/60 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-50 rounded-lg p-2.5 shrink-0">
              <ExternalLink className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground pt-1">Third-Party Links &amp; Services</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              The Website may contain links to third-party websites or services, including but not limited to
              <strong> Google Flights, Booking.com, and Expedia</strong>. These links are provided solely for your convenience
              and informational purposes.
            </p>
            <p>
              <strong>TravelGuide is not affiliated with, endorsed by, or sponsored by</strong> Google LLC, Booking Holdings Inc.,
              Expedia Group, or any other third-party service mentioned on this Website. All third-party trademarks, service marks,
              trade names, logos, and brand names are the property of their respective owners.
            </p>
            <p>
              We do not control, and are not responsible for, the content, privacy policies, or practices of any third-party
              websites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
            </p>
            <p>
              <strong>We do not receive commissions, referral fees, or any form of compensation</strong> from clicks on
              third-party links. These links are provided purely as a convenience to help users find travel services.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200/60 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-emerald-50 rounded-lg p-2.5 shrink-0">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground pt-1">Travel Safety &amp; Health Information</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              Safety ratings, health advisories, and travel warnings provided on this Website are <strong>approximate assessments
              based on publicly available data</strong> and should not be taken as official government advisories.
            </p>
            <p>
              For official travel advisories, please consult:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>United States:</strong> U.S. Department of State — <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">travel.state.gov</a></li>
              <li><strong>United Kingdom:</strong> Foreign, Commonwealth &amp; Development Office — <a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">gov.uk/foreign-travel-advice</a></li>
              <li><strong>Canada:</strong> Government of Canada — <a href="https://travel.gc.ca" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">travel.gc.ca</a></li>
              <li><strong>Australia:</strong> Smartraveller — <a href="https://www.smartraveller.gov.au" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">smartraveller.gov.au</a></li>
            </ul>
            <p>
              Health information is <strong>not a substitute for professional medical advice</strong>. Always consult a healthcare
              provider or travel medicine specialist before traveling, especially regarding vaccinations, medications, and
              health precautions.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200/60 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-purple-50 rounded-lg p-2.5 shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground pt-1">Data Sources &amp; Accuracy</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              Country data is sourced from publicly available APIs including the <strong>REST Countries API</strong>.
              Images are sourced from <strong>Unsplash</strong> (royalty-free) and <strong>flagcdn.com</strong>.
              US state information is compiled from public government sources.
            </p>
            <p>
              While we strive to keep information current and accurate, we <strong>cannot guarantee that all data is
              up-to-date at all times</strong>. Population figures, visa requirements, safety conditions, and other details
              may change. Data is automatically refreshed periodically, but delays may occur.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200/60 p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-2.5 shrink-0">
              <Scale className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground pt-1">Copyright &amp; Fair Use</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              All content on this Website, unless otherwise noted, is provided for informational and educational purposes.
              Images used on this Website are sourced from Unsplash under their <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">free license</a>,
              or from publicly available government resources.
            </p>
            <p>
              Flag images are sourced from flagcdn.com and Wikimedia Commons and are used under applicable public domain
              or Creative Commons licenses. Country data is sourced from the REST Countries API, which provides freely
              available public data.
            </p>
            <p>
              If you believe any content on this Website infringes on your copyright, please contact us and we will
              promptly address the issue.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl border border-gray-200/60 p-6 sm:p-8 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">
            By using TravelGuide, you acknowledge that you have read, understood, and agree to this disclaimer.
            This disclaimer may be updated from time to time without prior notice. It is your responsibility
            to review this page periodically for changes.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} TravelGuide. All rights reserved. This website is an independent
            informational resource and is not affiliated with any government agency or commercial travel provider.
          </p>
        </section>
      </div>
    </div>
  );
}
