import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Printable Blank Maps",
  description:
    "Free printable blank maps of US states, continents, and countries. SVG, PNG, and PDF downloads coming soon.",
};

export default function MapsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
        Printable Blank Maps
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        Clean, public-domain blank maps generated from open boundary data. Each
        map will be available in blank, labeled, and colored variants as SVG,
        PNG, and PDF.
      </p>

      <div className="mt-12 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center">
        <p className="text-lg font-medium text-stone-700">
          Blank map downloads are next on the roadmap
        </p>
        <p className="mt-2 text-stone-500">
          US state maps, continent maps, and selected country maps will appear
          here shortly. In the meantime, explore the interactive tools.
        </p>
        <Link
          href="/tools"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-teal-700 px-6 text-sm font-semibold text-white hover:bg-teal-600"
        >
          Browse tools
        </Link>
      </div>
    </div>
  );
}
