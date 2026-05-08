"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { modules } from "@/data/modules";
import Sidebar from "@/components/Sidebar";
import StepCard from "@/components/StepCard";
import PktDownload from "@/components/PktDownload";
import QuizSection from "@/components/QuizSection";

export default function ModuleGuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const mod = modules.find((m) => m.id === params.slug);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (!mod) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const stepNum = parseInt(
              entry.target.id.replace("step-", ""),
              10
            );
            if (!isNaN(stepNum)) {
              setActiveStep(stepNum);
            }
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    mod.steps.forEach((_, i) => {
      const el = document.getElementById(`step-${i + 1}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mod]);

  if (!mod) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-zinc-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-zinc-900">
            NetGuide
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
            <span className="text-zinc-300">|</span>
            <span className="text-sm text-zinc-900 font-medium">
              {mod.title}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 flex gap-12">
        <Sidebar module={mod} activeStep={activeStep} />

        <div className="flex-1 min-w-0 max-w-3xl">
          <PktDownload
            starterFile={mod.downloads.starter}
            completeFile={mod.downloads.complete}
          />

          <div className="space-y-16">
            {mod.steps.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                stepNumber={i + 1}
                totalSteps={mod.steps.length}
              />
            ))}
          </div>


          <div className="mt-16 pt-8 border-t border-zinc-200">
            <QuizSection questions={mod.quiz} />
          </div>


          <div className="flex items-center justify-between mt-16 pt-8 border-t border-zinc-200">
            {mod.steps.length > 0 && (
              <>
                <div>
                  {activeStep > 1 && (
                    <button
                      onClick={() => {
                        const el = document.getElementById(
                          `step-${activeStep - 1}`
                        );
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Previous Step
                    </button>
                  )}
                </div>
                <div>
                  {activeStep < mod.steps.length ? (
                    <button
                      onClick={() => {
                        const el = document.getElementById(
                          `step-${activeStep + 1}`
                        );
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <Link
                      href="/modules"
                      className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                    >
                      <CheckCircle size={16} />
                      Module Complete
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-sm text-zinc-400 text-center">
            NetGuide | IIUM KICT Student Project 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
