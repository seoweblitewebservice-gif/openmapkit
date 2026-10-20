import type { Metadata } from "next";
import LatitudeLineTool from "@/components/LatitudeLineTool";

export const metadata: Metadata = {
  title: "Tropic of Capricorn Map — 23.44°S",
  description: "Interactive map of the Tropic of Capricorn (approximately 23.44°S).",
};

export default function TropicCapricornPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Tropic of Capricorn</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          The southernmost latitude where the sun can appear directly overhead (December solstice). About 23.44°S.
        </p>
      </header>
      <LatitudeLineTool latitude={-23.44} label="Tropic of Capricorn" color="#0891b2" />
    </div>
  );
}
