import type { Metadata } from "next";
import AddressToCoordsTool from "@/components/AddressToCoordsTool";

export const metadata: Metadata = {
  title: "Address to Coordinates — Geocode Any Place",
  description:
    "Convert an address or place name to latitude and longitude. Free geocoding tool.",
};

export default function AddressToCoordsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Address to Coordinates
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Type any address, city, or place name to get its latitude and longitude.
        </p>
      </header>
      <AddressToCoordsTool />
    </div>
  );
}
