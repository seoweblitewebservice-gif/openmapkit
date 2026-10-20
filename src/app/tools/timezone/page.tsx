import type { Metadata } from "next";
import TimezoneTool from "@/components/TimezoneTool";

export const metadata: Metadata = {
  title: "Time Zone Finder — Local Time Anywhere on Earth",
  description:
    "Click the map to find the time zone and current local time for any location.",
};

export default function TimezonePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Time Zone Finder
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click any point on the map to look up its time zone and current local time.
        </p>
      </header>
      <TimezoneTool />
    </div>
  );
}
