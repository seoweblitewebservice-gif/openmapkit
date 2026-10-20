import type { Metadata } from "next";
import AreaTool from "@/components/AreaTool";

export const metadata: Metadata = {
  title: "Map Area Calculator — Measure Any Polygon",
  description:
    "Draw a polygon on the map and get its area in acres, hectares, square miles and km².",
};

export default function AreaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Map Area Calculator
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click the map to add vertices. With 3 or more points the area is
          calculated automatically.
        </p>
      </header>
      <AreaTool />
    </div>
  );
}
