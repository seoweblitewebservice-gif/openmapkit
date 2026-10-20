import type { Metadata } from "next";
import AntipodeTool from "@/components/AntipodeTool";

export const metadata: Metadata = {
  title: "Antipode Finder — Exact Opposite Point on Earth",
  description:
    "Find the antipode: the point on the exact opposite side of the Earth from any location.",
};

export default function AntipodePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Antipode Finder
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Discover the exact opposite point on Earth from any location. Click
          the map or use your GPS.
        </p>
      </header>
      <AntipodeTool />
    </div>
  );
}
