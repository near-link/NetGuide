import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Module } from "@/data/modules";

const badgeColors: Record<string, string> = {
  Beginner: "bg-green-50 text-green-700 border-green-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

export default function ModuleCard({ module }: { module: Module }) {
  return (
    <Link
      href={`/modules/${module.id}`}
      className="group block border border-zinc-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm font-medium text-zinc-400">
          Module {module.number}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${badgeColors[module.difficulty]}`}
        >
          {module.difficulty}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 mb-2">
        {module.title}
      </h3>
      <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
        {module.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {module.topics.map((topic) => (
          <span
            key={topic}
            className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded"
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">{module.stepCount} steps</span>
        <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
          Start Module <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
