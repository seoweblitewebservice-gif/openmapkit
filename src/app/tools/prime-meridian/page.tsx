import type { Metadata } from "next";
import PrimeMeridianTool from "@/components/PrimeMeridianTool";

export const metadata: Metadata = {
  title: "Prime Meridian Map — 0° Longitude through Greenwich",
  description: "Interactive map of the Prime Meridian at 0° longitude.",
};

export default function PrimeMeridianPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Prime Meridian</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          The line of 0° longitude, through the Royal Observatory at Greenwich, London.
        </p>
      </header>
      <PrimeMeridianTool />
    </div>
  );
}
