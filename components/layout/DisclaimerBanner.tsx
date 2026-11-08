import React from "react";
import { ShieldCheck } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-navy-950/90 border-b border-border-subtle py-1.5 px-4 text-center text-[11px] text-slate-400">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5 text-groww shrink-0" />
        <span>
          <strong className="text-slate-200">Educational MVP:</strong> Independent learning prototype. Never provides stock/fund advice or transaction execution.
        </span>
      </div>
    </div>
  );
}
