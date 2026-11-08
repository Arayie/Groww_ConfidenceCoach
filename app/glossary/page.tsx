import React from "react";
import { BookmarkCheck, ShieldCheck } from "lucide-react";
import { GlossaryView } from "@/components/glossary/GlossaryView";

export default function GlossaryPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-groww-subtle border border-groww/20 text-xs font-semibold text-groww mb-3">
            <BookmarkCheck className="h-3.5 w-3.5" />
            <span>Official Definitions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            SIP &amp; Mutual Fund Glossary
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Financial acronyms and industry terminology explained clearly without gatekeeping. All terms are aligned with official SEBI and AMFI definitions.
          </p>
        </div>

        <GlossaryView />
      </div>
    </div>
  );
}
