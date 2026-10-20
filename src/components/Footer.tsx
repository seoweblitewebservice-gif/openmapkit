import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-stone-900">
              OpenMapKit
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Free, open-data map tools that run entirely in your browser. No
              accounts, no API keys, no tracking.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">Tools</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <Link href="/tools/radius" className="hover:text-teal-700">
                  Map Radius Tool
                </Link>
              </li>
              <li>
                <Link href="/tools/distance" className="hover:text-teal-700">
                  Distance Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-teal-700">
                  All tools →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">Resources</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <Link href="/maps" className="hover:text-teal-700">
                  Printable Blank Maps
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-700">
                  About & Data Sources
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-700">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} OpenMapKit. Built with open data from
          OpenStreetMap, US Census Bureau, Natural Earth, and USGS. Map tiles by
          OpenFreeMap.
        </div>
      </div>
    </footer>
  );
}
