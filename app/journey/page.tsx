import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { JourneyView } from "@/components/journey/JourneyView";

export default function JourneyPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-groww-subtle border border-groww/20 text-xs font-semibold text-groww mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Educational Roadmap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The 7 Stages of a Mutual Fund SIP
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Wondering what actually happens between clicking &ldquo;Start SIP&rdquo; and seeing units in your portfolio? Explore the entire lifecycle from KYC verification and bank mandates to NAV cut-off times and account statement generation.
          </p>
        </div>

        <JourneyView />
      </div>
    </div>
  );
}
