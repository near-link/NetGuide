import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContributeForm from "@/components/ContributeForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute | NetGuide",
  description:
    "Submit your own networking module to NetGuide. Share configuration guides, Packet Tracer files, and screenshots with other students.",
};

export default function ContributePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
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
              className="text-sm text-blue-600 font-medium"
            >
              Contribute
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-16 w-full">
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">
          Contribute a Module
        </h1>
        <p className="text-zinc-500 leading-relaxed mb-16">
          NetGuide is built on the idea that networking knowledge should be free
          and accessible. If you have configured something worth sharing, submit
          it here and help other students learn faster.
        </p>

        <section className="mb-16">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                num: "1",
                title: "Prepare your files",
                desc: "Write your configuration steps, export your Packet Tracer topology, and take screenshots of the key verification outputs.",
              },
              {
                num: "2",
                title: "Fill in the form",
                desc: "Describe your module, list the topics covered, and attach your files below.",
              },
              {
                num: "3",
                title: "We review and publish",
                desc: "Submitted modules are reviewed for technical accuracy before going live on the platform.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-zinc-50 border border-zinc-200 rounded-lg p-5"
              >
                <span className="text-2xl font-bold text-zinc-300 mb-2 block">
                  {step.num}
                </span>
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">
            Submit a module
          </h2>
          <ContributeForm />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">
            NetGuide is open source
          </h2>
          <p className="text-sm text-zinc-500 mb-2">
            Want to contribute directly to the codebase instead? The project is
            on GitHub. You can open a pull request to add a module, fix an error,
            or improve the platform.
          </p>
          <Link
            href="https://github.com/near-link/NetGuide"
            className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
          >
            View on GitHub <ArrowRight size={14} />
          </Link>
        </section>
      </main>

      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="font-black text-sm text-zinc-900">NetGuide</span>
            <span className="text-xs font-mono text-blue-600 ml-1 align-super">beta</span>
          </div>
          <span className="text-xs text-zinc-400">IIUM KICT Student Project 2026</span>
        </div>
      </footer>
    </div>
  );
}
