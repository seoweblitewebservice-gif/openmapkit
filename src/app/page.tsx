import Link from "next/link";

const featured = [
  {
    href: "/tools/radius",
    title: "Map Radius Tool",
    description:
      "Draw a true geodesic circle of any radius around a point. Perfect for delivery zones, event planning, or coverage analysis.",
  },
  {
    href: "/tools/distance",
    title: "Distance Between Places",
    description:
      "Measure straight-line (great-circle) distance between any two locations on Earth. Instant results in miles or kilometers.",
  },
  {
    href: "/tools",
    title: "Browse All Tools",
    description:
      "Elevation lookup, coordinate converters, pin maps, time zones, and more — all free and running in your browser.",
  },
];

const categories = [
  {
    name: "Location",
    count: 5,
    items: [
      "What County Am I In?",
      "What City Am I In?",
      "What ZIP Code Am I In?",
      "What Country Am I In?",
    ],
  },
  {
    name: "Measurement",
    count: 8,
    items: [
      "Map Radius Tool",
      "Distance Calculator",
      "Area Calculator",
      "Drive Time (coming soon)",
    ],
  },
  {
    name: "Coordinates & Elevation",
    count: 6,
    items: [
      "Latitude & Longitude Finder",
      "Elevation Lookup",
      "Coordinate Converter",
      "Antipode Finder",
    ],
  },
  {
    name: "Map Makers",
    count: 4,
    items: [
      "Pin Drop Map",
      "CSV to Map",
      "Color a Map",
      "KML / GeoJSON Viewer",
    ],
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-stone-50 to-white">
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            Free Map Tools
            <br />
            <span className="text-teal-700">& Printable Blank Maps</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
            Browser-based geographic tools powered by open data. Measure
            distances, draw radius circles, look up elevation, convert
            coordinates — no sign-up, no API key, no cost.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tools/radius"
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal-700 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Try Radius Tool
            </Link>
            <Link
              href="/tools"
              className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-8 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              View all tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold text-stone-900">
          Popular tools
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {featured.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md"
            >
              <h3 className="font-semibold text-stone-900 group-hover:text-teal-700">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Tool categories
          </h2>
          <p className="mt-2 text-stone-500">
            Growing collection of free interactive map utilities. More tools
            added regularly.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <h3 className="flex items-center gap-2 font-semibold text-stone-900">
                  {cat.name}
                  <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-600">
                    {cat.count}
                  </span>
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-600"
            >
              See full tool directory →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-white p-8 sm:p-12">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Printable blank maps
          </h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            Clean, public-domain blank maps of US states, continents, and
            countries. Download as SVG, PNG, or PDF. Ideal for classrooms,
            worksheets, presentations, and data visualization.
          </p>
          <Link
            href="/maps"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Browse blank maps
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-stone-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Why OpenMapKit?
          </h2>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Most online map tools require accounts, API keys, or paid plans.
            OpenMapKit uses only free, open data sources — OpenStreetMap tiles
            via OpenFreeMap, Nominatim & Photon geocoding, USGS elevation, and
            US Census boundary data — so everything stays free and private. All
            processing happens in your browser whenever possible.
          </p>
        </div>
      </section>
    </div>
  );
}
