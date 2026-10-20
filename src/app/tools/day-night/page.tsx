import type { Metadata } from "next";
import DayNightTool from "@/components/DayNightTool";

export const metadata: Metadata = {
  title: "Day Night Map — Live Sun Terminator",
  description:
    "See the current day/night boundary on Earth and where the sun is overhead.",
};

export default function DayNightPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Day Night Map
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Approximate day/night terminator based on the current sun position.
        </p>
      </header>
      <DayNightTool />
    </div>
  );
}
