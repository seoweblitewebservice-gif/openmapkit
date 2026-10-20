import type { Metadata } from "next";
import HorizonTool from "@/components/HorizonTool";

export const metadata: Metadata = {
  title: "Horizon Distance Calculator — How Far Can You See?",
  description:
    "Calculate how far the horizon is from any eye height. Free geometric calculator.",
};

export default function HorizonPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Horizon Distance Calculator
        </h1>
        <p className="mt-3 text-stone-600">
          Enter your eye height above the ground to estimate how far away the
          geometric horizon lies.
        </p>
      </header>
      <HorizonTool />
    </div>
  );
}
