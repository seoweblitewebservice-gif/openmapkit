import type { Metadata } from "next";
import LatitudeLineTool from "@/components/LatitudeLineTool";

export const metadata: Metadata = {
  title: "Tropic of Cancer Map — 23.44°N",
  description: "Interactive map of the Tropic of Cancer (approximately 23.44°N).",
};

export default function TropicCancerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Tropic of Cancer</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          The northernmost latitude where the sun can appear directly overhead (June solstice). About 23.44°N.
        </p>
      </header>
      <LatitudeLineTool latitude={23.44} label="Tropic of Cancer" color="#ea580c" />
    </div>
  );
}
