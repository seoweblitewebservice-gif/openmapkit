import Link from "next/link";

const nav = [
  { href: "/tools", label: "Tools" },
  { href: "/maps", label: "Blank Maps" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-stone-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
            OM
          </span>
          OpenMapKit
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-stone-600">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-teal-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
