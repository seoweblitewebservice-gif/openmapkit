import type { Metadata } from "next";
import CoordsToAddressTool from "@/components/CoordsToAddressTool";

export const metadata: Metadata = {
  title: "Coordinates to Address — Reverse Geocoder",
  description: "Convert latitude and longitude into a human-readable address.",
};

export default function CoordsToAddressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Coordinates to Address</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Enter coordinates or click the map to reverse-geocode into an address.
        </p>
      </header>
      <CoordsToAddressTool />
    </div>
  );
}
