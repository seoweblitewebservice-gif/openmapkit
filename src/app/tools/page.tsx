import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Map Tools — Complete Directory",
  description:
    "Free interactive map tools: radius, distance, halfway, bearing, antipode, coordinates, horizon and more. No sign-up.",
};

type Tool = { href: string; title: string; description: string; status: "live" | "soon" };

const groups: { category: string; items: Tool[] }[] = [
  {
    category: "Location Detection",
    items: [
      { href: "#", title: "What County Am I In?", description: "Find the US county at your GPS or any address.", status: "soon" },
      { href: "#", title: "What City Am I In?", description: "Detect your current city or town worldwide.", status: "soon" },
      { href: "#", title: "What State Am I In?", description: "Identify the US state from GPS or map click.", status: "soon" },
      { href: "#", title: "What ZIP Code Am I In?", description: "Look up US ZIP code from location.", status: "soon" },
      { href: "#", title: "What Country Am I In?", description: "Identify country, flag, codes and currency.", status: "soon" },
    ],
  },
  {
    category: "Distance, Area & Drive Time",
    items: [
      { href: "/tools/radius", title: "Map Radius Tool", description: "True geodesic circle of any radius + area.", status: "live" },
      { href: "/tools/distance", title: "Distance Between Places", description: "Great-circle distance between two points.", status: "live" },
      { href: "/tools/halfway", title: "Halfway Between Two Places", description: "Geographic midpoint for fair meeting spots.", status: "live" },
      { href: "/tools/bearing", title: "Bearing & Compass Calculator", description: "True bearing and distance from A to B.", status: "live" },
      { href: "/tools/horizon", title: "Horizon Distance Calculator", description: "How far is the horizon from any eye height.", status: "live" },
      { href: "#", title: "Map Area Calculator", description: "Draw polygon and get area in acres/ha/sq mi.", status: "soon" },
      { href: "#", title: "Drive Time Map", description: "Isochrone — reach by car/bike/foot in set time.", status: "soon" },
      { href: "#", title: "Crow Flies Distance", description: "Straight-line vs driving distance comparison.", status: "soon" },
      { href: "#", title: "Multi-Stop Route Distance", description: "Total mileage across up to 25 stops.", status: "soon" },
      { href: "#", title: "Distance Matrix Calculator", description: "Pairwise distance matrix for 2–50 points.", status: "soon" },
    ],
  },
  {
    category: "Coordinates, Elevation & Reference",
    items: [
      { href: "/tools/lat-long", title: "Latitude & Longitude Finder", description: "Click map or GPS for DD and DMS coordinates.", status: "live" },
      { href: "/tools/antipode", title: "Antipode Finder", description: "Exact opposite point on Earth.", status: "live" },
      { href: "/tools/random-location", title: "Random Location Generator", description: "Uniform random point on the sphere.", status: "live" },
      { href: "#", title: "Elevation Finder", description: "Ground elevation at any point (ft & m).", status: "soon" },
      { href: "#", title: "What Is My Elevation?", description: "Your current elevation via GPS.", status: "soon" },
      { href: "#", title: "Address to Coordinates", description: "Geocode address to lat/lng.", status: "soon" },
      { href: "#", title: "Coordinates to Address", description: "Reverse geocode lat/lng to address.", status: "soon" },
      { href: "#", title: "GPS Coordinate Converter", description: "Convert DD, DMS, UTM, MGRS.", status: "soon" },
      { href: "#", title: "Time Zone Finder", description: "Time zone and live local time.", status: "soon" },
      { href: "#", title: "Sunrise & Sunset Calculator", description: "Sunrise, sunset, twilight, day length.", status: "soon" },
      { href: "#", title: "Map Tunnel", description: "Where a tunnel through Earth exits.", status: "soon" },
      { href: "#", title: "Geographic Center Finder", description: "Centroid of country or US state.", status: "soon" },
    ],
  },
  {
    category: "Geographic Data & Lookup",
    items: [
      { href: "#", title: "Find ZIP Codes in Radius", description: "US ZIP codes within radius; CSV export.", status: "soon" },
      { href: "#", title: "Find Cities in Radius", description: "US cities in radius by population.", status: "soon" },
      { href: "#", title: "Population Within Radius", description: "People living inside any US radius.", status: "soon" },
      { href: "#", title: "Address to County Lookup", description: "County for any US address.", status: "soon" },
      { href: "#", title: "Find Nearest National Park", description: "Rank 63 US national parks by distance.", status: "soon" },
    ],
  },
  {
    category: "Map Makers & Cartography",
    items: [
      { href: "#", title: "Pin Drop Map", description: "Drop labeled pins; share via URL.", status: "soon" },
      { href: "#", title: "Map Drawer", description: "Draw lines, shapes, arrows on map.", status: "soon" },
      { href: "#", title: "Color a Map", description: "Fill countries or states with color.", status: "soon" },
      { href: "#", title: "CSV to Map", description: "Plot spreadsheet lat/lng rows.", status: "soon" },
      { href: "#", title: "KML / GeoJSON / GPX Viewer", description: "Open and convert map files.", status: "soon" },
      { href: "#", title: "Google Maps Embed Generator", description: "Free embed code — no API key.", status: "soon" },
    ],
  },
  {
    category: "Sun, Moon & Lines",
    items: [
      { href: "#", title: "Day Night Map", description: "Live day/night terminator.", status: "soon" },
      { href: "#", title: "Moon Phase Calendar", description: "Tonight’s phase and calendar.", status: "soon" },
      { href: "#", title: "Equator", description: "Equator and countries it crosses.", status: "soon" },
      { href: "#", title: "Tropic of Cancer / Capricorn", description: "Tropics mapped with lands along them.", status: "soon" },
      { href: "#", title: "Arctic / Antarctic Circle", description: "Polar circles and midnight sun.", status: "soon" },
      { href: "#", title: "Prime Meridian", description: "0° longitude through Greenwich.", status: "soon" },
      { href: "#", title: "International Date Line", description: "Date Line and its zigzag.", status: "soon" },
    ],
  },
];

export default function ToolsPage() {
  const liveCount = groups.reduce((n, g) => n + g.items.filter((t) => t.status === "live").length, 0);
  const totalCount = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Free Map Tools</h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        {liveCount} live · {totalCount} in directory. Browser-based, no account, no API key.
      </p>
      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <section key={group.category}>
            <h2 className="text-lg font-semibold text-stone-900">
              {group.category}{" "}
              <span className="text-sm font-normal text-stone-400">
                ({group.items.filter((t) => t.status === "live").length}/{group.items.length} live)
              </span>
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className={`rounded-xl border border-stone-200 bg-white p-5 transition ${
                    tool.status === "live" ? "hover:border-teal-300 hover:shadow-md" : "opacity-60 cursor-default pointer-events-none"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-stone-900">{tool.title}</h3>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      tool.status === "live" ? "bg-teal-100 text-teal-800" : "bg-stone-100 text-stone-500"
                    }`}>{tool.status === "live" ? "Live" : "Soon"}</span>
                  </div>
                  <p className="mt-2 text-sm text-stone-500">{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
