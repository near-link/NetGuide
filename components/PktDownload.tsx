"use client";

import { Download } from "lucide-react";

interface PktDownloadProps {
  starterFile: string;
  completeFile: string;
}

export default function PktDownload({
  starterFile,
  completeFile,
}: PktDownloadProps) {
  return (
    <div className="mb-10">
      <p className="text-sm font-medium text-zinc-700 mb-3">
        Get the Packet Tracer files for this module
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={starterFile}
          download
          className="inline-flex items-center gap-2 text-sm text-zinc-700 border border-zinc-300 rounded-lg px-4 py-2 bg-white hover:bg-zinc-50 transition-colors"
        >
          <Download size={14} />
          Starter File
        </a>
        <a
          href={completeFile}
          download
          className="inline-flex items-center gap-2 text-sm text-zinc-700 border border-zinc-300 rounded-lg px-4 py-2 bg-white hover:bg-zinc-50 transition-colors"
        >
          <Download size={14} />
          Complete File
        </a>
      </div>
      <p className="text-xs text-zinc-400 mt-2">
        Requires Cisco Packet Tracer 8.0 or later
      </p>
    </div>
  );
}
