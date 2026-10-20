import type { Metadata } from "next";
import EquatorTool from "@/components/EquatorTool";

export const metadata: Metadata = {
  title: "Equator Map — Countries the Equator Crosses",
  description:
    "Interactive map of the Equator (0° latitude) and the countries it passes through.",
};

export default function EquatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Equator
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          The Equator is the great circle at 0° latitude. It crosses land in 13 countries.
        </p>
      </header>
      <EquatorTool />
      <section className="mt-12 max-w-3xl space-y-4 text-stone-600 leading-relaxed">
        <h2 className="font-serif text-xl font-semibold text-stone-900">Countries on the Equator</h2>
        <p>
          Ecuador, Colombia, Brazil, São Tomé and Príncipe, Gabon, Republic of the Congo,
          Democratic Republic of the Congo, Uganda, Kenya, Somalia, Maldives, Indonesia, and Kiribati.
        </p>
      </section>
    </div>
  );
}
