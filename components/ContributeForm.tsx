"use client";

import { useState } from "react";

export default function ContributeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Module title
        </label>
        <input
          type="text"
          placeholder="e.g. EtherChannel Configuration with LACP"
          className="border border-zinc-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Your name or GitHub username
        </label>
        <input
          type="text"
          placeholder="e.g. Ahmad or github.com/ahmad"
          className="border border-zinc-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Difficulty
        </label>
        <select className="border border-zinc-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Topics covered
        </label>
        <input
          type="text"
          placeholder="e.g. EtherChannel, LACP, Port Aggregation"
          className="border border-zinc-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Module description
        </label>
        <textarea
          rows={4}
          placeholder="Briefly describe what this module covers and who it is for"
          className="border border-zinc-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Configuration steps
        </label>
        <textarea
          rows={6}
          placeholder="Paste your step-by-step configuration here. Include CLI commands and explanations for each step."
          className="border border-zinc-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-vertical"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Starter file (.pkt)
        </label>
        <input type="file" accept=".pkt" className="text-sm" />
        <p className="text-xs text-zinc-400 mt-1">
          Topology built and cabled, no configuration done
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Complete file (.pkt)
        </label>
        <input type="file" accept=".pkt" className="text-sm" />
        <p className="text-xs text-zinc-400 mt-1">
          Fully configured and verified
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Screenshots
        </label>
        <input type="file" accept="image/*" multiple className="text-sm" />
        <p className="text-xs text-zinc-400 mt-1">
          Topology view, show commands, ping results
        </p>
      </div>

      <div>
        <button
          onClick={handleSubmit}
          disabled={submitting || submitted}
          className="bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {submitting ? "Submitting..." : "Submit for review"}
        </button>
        {submitted && (
          <p className="text-sm text-green-600 mt-3">
            Thanks for your submission. We will review it shortly.
          </p>
        )}
      </div>
    </div>
  );
}
