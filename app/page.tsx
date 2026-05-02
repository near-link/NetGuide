import Link from "next/link";
import { modules } from "@/data/modules";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
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
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
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

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-20">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="lg:w-[55%]">
              <p className="text-xs font-mono tracking-widest text-zinc-400 mb-4 uppercase">
                Free and open source
              </p>
              <h1 className="text-5xl font-black leading-tight tracking-tight text-zinc-900">
                Learn Cisco.
                <br />
                Configure with confidence.
              </h1>
              <p className="text-base text-zinc-500 mt-4 max-w-sm">
                Step-by-step guides for enterprise networking, built around
                Cisco Packet Tracer.
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Built by students. Open for contributions.
              </p>
              <div className="flex items-center gap-6 mt-8">
                <Link
                  href="/modules"
                  className="bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Modules
                </Link>
                <a
                  href="#modules"
                  className="text-zinc-500 underline underline-offset-4 text-sm hover:text-zinc-900 transition-colors"
                >
                  How it works ↓
                </a>
              </div>
            </div>
            <div className="lg:w-[45%] flex flex-col items-end">
              <span className="text-[180px] font-black text-zinc-100 leading-none select-none">
                {pad(modules.length)}
              </span>
              <span className="text-xs text-zinc-300 font-mono text-right">
                modules available
              </span>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6">
          <div className="border-y border-zinc-200 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
              {[
                {
                  label: "Step-by-Step",
                  desc: "Every command explained, in order.",
                },
                {
                  label: "Simulation-Based",
                  desc: "All configs verified in Cisco Packet Tracer.",
                },
                {
                  label: "Open to Contribute",
                  desc: "Submit your own module and PKT files.",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`text-center py-4 sm:py-0 ${i === 0 ? "sm:pr-6" : i === 1 ? "sm:px-6" : "sm:pl-6"}`}
                >
                  <p className="text-sm font-semibold text-zinc-800">
                    {item.label}
                  </p>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">
            What You&apos;ll Learn
          </h2>
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
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-[55%]">
              <p className="text-xs font-mono tracking-widest text-zinc-400 mb-3 uppercase">
                Community driven
              </p>
              <h2 className="text-3xl font-black text-zinc-900 mb-4">
                Add your own module.
              </h2>
              <p className="text-sm text-zinc-500 mb-2">
                If you have configured something in Packet Tracer that you think
                other students would benefit from, share it here. Submit your
                topology, CLI steps, and verification screenshots.
              </p>
              <p className="text-sm text-zinc-500 mb-6">
                Submitted modules are reviewed for technical accuracy before
                going live.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/contribute"
                  className="bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit a Module
                </Link>
                <Link
                  href="/contribute"
                  className="text-zinc-500 underline underline-offset-4 text-sm hover:text-zinc-900 transition-colors"
                >
                  Learn more ↓
                </Link>
              </div>
            </div>
            <div className="lg:w-[45%]">
              <div className="py-6 border-b border-zinc-100">
                <p className="text-xs font-mono text-blue-500 mb-1">
                  Community
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <span className="text-4xl font-black text-zinc-100 w-16 shrink-0 select-none">
                    04
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      EtherChannel with LACP
                    </h3>
                    <p className="text-sm text-zinc-500 max-w-lg">
                      Configure link aggregation using LACP to increase
                      bandwidth and provide redundancy between switches.
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-xs font-mono text-zinc-300">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 mt-3">
                  Example of a community-submitted module
                </p>
              </div>
            </div>
          </div>
        </section>
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
