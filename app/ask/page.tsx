import React from "react";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function AskPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-groww-subtle border border-groww/20 text-xs font-semibold text-groww mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Educational AI Companion</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Ask the SIP Confidence Coach
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Get plain-language answers grounded strictly in approved Indian regulatory frameworks (SEBI, AMFI, RBI). No speculation, no stock tips, and every material fact is backed by verifiable sources.
          </p>
        </div>

        <ChatInterface />
      </div>
    </div>
  );
}
