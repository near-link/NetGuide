import type { Step } from "@/data/modules";
import CLIBlock from "./CLIBlock";
import { Info, Terminal } from "lucide-react";

interface StepCardProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
}

export default function StepCard({
  step,
  stepNumber,
  totalSteps,
}: StepCardProps) {
  return (
    <section id={`step-${stepNumber}`} className="scroll-mt-24">
      <div className="mb-2">
        <span className="text-xs font-medium text-blue-600">
          Step {stepNumber} of {totalSteps}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-zinc-900 mb-3">{step.title}</h2>
      <p className="text-zinc-600 leading-relaxed mb-6">{step.explanation}</p>

      {step.topologyDiagram && (
        <div className="border-2 border-dashed border-zinc-300 bg-zinc-50 rounded-lg p-8 flex items-center justify-center mb-6">
          <span className="text-sm text-zinc-400">
            {/* TODO: replace with actual Packet Tracer screenshot */}
            [Topology Diagram: Step {stepNumber}]
          </span>
        </div>
      )}

      {step.cli && (
        <div className="mb-6">
          <CLIBlock code={step.cli} />
        </div>
      )}

      {step.whatThisDoes && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Info size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                What this does
              </p>
              <p className="text-sm text-blue-800 leading-relaxed">
                {step.whatThisDoes}
              </p>
            </div>
          </div>
        </div>
      )}

      {step.verification && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <Terminal
              size={18}
              className="text-zinc-500 mt-0.5 flex-shrink-0"
            />
            <div className="w-full">
              <p className="text-sm font-medium text-zinc-700 mb-2">
                Verification
              </p>
              <pre className="text-sm text-zinc-600 bg-white border border-zinc-200 rounded p-3 overflow-x-auto font-mono">
                {step.verification}
              </pre>
              {step.verificationNote && (
                <p className="text-xs text-zinc-500 mt-2">
                  {step.verificationNote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
