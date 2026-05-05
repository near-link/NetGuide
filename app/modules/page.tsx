import Link from "next/link";
import { modules } from "@/data/modules";
import type { Metadata } from "next";

const pad = (n: number) => String(n).padStart(2, "0");

export const metadata: Metadata = {
  title: "Modules | NetGuide",
  description:
    "Choose a networking module. Each covers a core enterprise networking concept with step-by-step Cisco configuration guides.",
};

export default function ModulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-baseline">
            <span className="font-black text-2xl tracking-tight text-zinc-900">
              NetGuide
            </span>
            <span className="text-xs font-mono text-blue-600 ml-1 align-super">
              beta
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/modules"
              className="text-sm text-blue-600 font-medium"
            >
              Modules
            </Link>
            <Link
              href="/contribute"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Contribute
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-black text-zinc-900 mb-2">
          Choose a Module
        </h1>
        <p className="text-zinc-500 mb-10">
          Each module covers a core enterprise networking concept. Work through
          them in order or jump to what you need.
        </p>
        <div>
          {modules.map((m) => (
            <div
              key={m.id}
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 py-6 border-b border-zinc-100"
            >
              <span className="text-4xl font-black text-zinc-100 w-16 shrink-0 select-none">
                {pad(m.number)}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-zinc-900">
                  {m.title}
                </h3>
                <p className="text-sm text-zinc-500 max-w-lg">
                  {m.description}
                </p>
              </div>
              <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                <span className="text-xs font-mono text-zinc-400 hidden sm:block">
                  {m.difficulty.toLowerCase()}
                </span>
                <Link
                  href={`/modules/${m.id}`}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Start →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="font-black text-sm text-zinc-900">NetGuide</span>
            <span className="text-xs font-mono text-blue-600 ml-1 align-super">
              beta
            </span>
          </div>
          <span className="text-xs text-zinc-400">
            IIUM KICT Student Project 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
