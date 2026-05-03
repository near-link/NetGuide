"use client";

import type { Module } from "@/data/modules";

interface SidebarProps {
  module: Module;
  activeStep: number;
}

export default function Sidebar({ module, activeStep }: SidebarProps) {
  const handleClick = (stepNumber: number) => {
    const el = document.getElementById(`step-${stepNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-8">
        <h2 className="text-sm font-semibold text-zinc-900 mb-1">
          {module.title}
        </h2>
        <p className="text-xs text-zinc-400 mb-4">
          Step {activeStep} of {module.steps.length}
        </p>
        <nav>
          <ol className="space-y-1">
            {module.steps.map((step, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === activeStep;
              return (
                <li key={stepNum}>
                  <button
                    onClick={() => handleClick(stepNum)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="mr-2">{stepNum}.</span>
                    {step.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
