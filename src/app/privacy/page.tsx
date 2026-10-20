import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900">
        Privacy Policy
      </h1>
      <div className="mt-6 space-y-4 text-stone-600 leading-relaxed">
        <p>
          OpenMapKit is designed to be private by default. Most tools run
          entirely in your browser. We do not require accounts and we do not
          store the locations you search or click.
        </p>
        <p>
          When a tool needs external data (for example map tiles), requests go
          directly from your browser to public open-data services such as
          OpenFreeMap. Those services have their own privacy policies.
        </p>
        <p className="text-sm text-stone-400">
          Last updated: October 2026
        </p>
      </div>
    </div>
  );
}
