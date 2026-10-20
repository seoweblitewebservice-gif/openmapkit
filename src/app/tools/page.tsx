import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Map Tools",
  description:
    "Directory of free interactive map tools: radius circles, distance calculators, elevation lookup, coordinate converters, and more.",
};

const tools = [
  {
    category: "Measurement",
    items: [
      {
        href: "/tools/radius",
        title: "Map Radius Tool",
        description:
          "Draw a true geodesic circle of any radius (miles or km) around a point on the map.",
        status: "live",
      },
      {
        href: "/tools/distance",
        title: "Distance Between Places",
        description:
          "Calculate the great-circle (crow-flies) distance between any two locations.",
        status: "live",
      },
      {
        href: "#",
        title: "Map Area Calculator",
        description: "Draw a polygon and get its area in acres, hectares, or sq miles.",
        status: "soon",
      },
    ],
  },
  {
    category: "Location Detection",
    items: [
      {
        href: "#",
        title: "What County Am I In?",
        description: "Find the US county for your GPS location or any address.",
        status: "soon",
      },
      {
        href: "#",
        title: "What City Am I In?",
        description: "Detect your current city, town, or village worldwide.",
        status: "soon",
      },
      {
        href: "#",
        title: "What ZIP Code Am I In?",
        description: "Look up the US ZIP code from GPS or an address.",
        status: "soon",
      },
    ],
  },
  {
    category: "Coordinates & Elevation",
    items: [
      {
        href: "#",
        title: "Latitude & Longitude Finder",
        description: "Click the map or search to get coordinates in multiple formats.",
        status: "soon",
      },
      {
        href: "#",
        title: "Elevation Finder",
        description: "Look up ground elevation at any point in feet and meters.",
        status: "soon",
      },
      {
        href: "#",
        title: "GPS Coordinate Converter",
        description: "Convert between DD, DMS, UTM, MGRS and more.",
        status: "soon",
      },
    ],
  },
  {
    category: "Map Makers",
    items: [
      {
        href: "#",
        title: "Pin Drop Map",
        description: "Drop labeled pins, color-code them, and share via URL.",
        status: "soon",
      },
      {
        href: "#",
        title: "CSV to Map",
        description: "Plot spreadsheet rows of coordinates as markers or a heatmap.",
        status: "soon",
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
        Free Map Tools
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        All tools run in your browser using open data. No account or API key
        required. New tools are added regularly.
      </p>

      <div className="mt-12 space-y-12">
        {tools.map((group) => (
          <section key={group.category}>
            <h2 className="text-lg font-semibold text-stone-900">
              {group.category}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className={`rounded-xl border border-border bg-white p-5 transition ${
                    tool.status === "live"
                      ? "hover:border-teal-300 hover:shadow-md"
                      : "opacity-70 cursor-default"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-stone-900">{tool.title}</h3>
                    {tool.status === "live" ? (
                      <span className="shrink-0 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">
                        Live
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-stone-500">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
