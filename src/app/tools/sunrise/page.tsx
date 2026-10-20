import type { Metadata } from "next";
import SunriseTool from "@/components/SunriseTool";

export const metadata: Metadata = {
  title: "Sunrise & Sunset Calculator — Day Length Anywhere",
  description:
    "Calculate sunrise, sunset and day length for any location. Free solar calculator.",
};

export default function SunrisePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Sunrise & Sunset Calculator
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click a point on the map to get approximate sunrise, sunset and day
          length for today based on solar geometry.
        </p>
      </header>
      <SunriseTool />
    </div>
  );
}
