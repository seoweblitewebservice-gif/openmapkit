import type { Metadata } from "next";
import MapTunnelTool from "@/components/MapTunnelTool";

export const metadata: Metadata = {
  title: "Map Tunnel — Where a Tunnel Through Earth Would Exit",
  description:
    "Click any point to see where a straight tunnel through the center of the Earth would come out.",
};

export default function MapTunnelPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Map Tunnel
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click any starting point — the purple marker shows where a straight
          tunnel through the center of the Earth would emerge.
        </p>
      </header>
      <MapTunnelTool />
    </div>
  );
}
