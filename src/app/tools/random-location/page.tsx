import type { Metadata } from "next";
import RandomLocationTool from "@/components/RandomLocationTool";

export const metadata: Metadata = {
  title: "Random Location Generator — Random Point on Earth",
  description:
    "Generate a uniformly random geographic point on Earth. Free exploration tool.",
};

export default function RandomLocationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Random Location Generator
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Generate a truly random point on the Earth surface. Click Generate to
          explore a new spot every time.
        </p>
      </header>
      <RandomLocationTool />
    </div>
  );
}
