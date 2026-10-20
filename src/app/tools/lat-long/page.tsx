import type { Metadata } from "next";
import LatLongTool from "@/components/LatLongTool";

export const metadata: Metadata = {
  title: "Latitude & Longitude Finder — Click Map for Coordinates",
  description:
    "Find latitude and longitude of any place. Click the map or use GPS. Results in DD and DMS.",
};

export default function LatLongPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Latitude & Longitude Finder
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click anywhere on the map (or use your device GPS) to get precise
          coordinates in decimal degrees and DMS.
        </p>
      </header>
      <LatLongTool />
    </div>
  );
}
