"use client";

import React, { useState } from "react";
import {
  Send,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  BookOpen,
  Info,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { ChatMessage, SourceCitation } from "@/lib/types";
import { OFFICIAL_SOURCES } from "@/lib/constants/sources";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const SAMPLE_ALLOWED_ANSWER: ChatMessage = {
  id: "msg-allowed",
  sender: "assistant",
  timestamp: "Just now",
  content:
    "NAV stands for Net Asset Value. It represents the per-unit value of a mutual-fund scheme. In simplified terms, it is calculated using the value of the scheme's assets minus liabilities, divided by the number of outstanding units.\n\nNAV changes as the value of the underlying investments and other scheme assets changes. The applicable NAV for a transaction depends on the relevant rules, cut-off time and realisation of funds; it is not necessarily the NAV visible at the moment you submit an instruction.",
  sources: [OFFICIAL_SOURCES.amfiNav, OFFICIAL_SOURCES.sebiUnderstandingMf],
};

const SAMPLE_REFUSAL_ANSWER: ChatMessage = {
  id: "msg-refusal",
  sender: "assistant",
  timestamp: "Just now",
  isRefusal: true,
  content:
    "I cannot recommend which stock, mutual fund, ETF or scheme you should buy, or tell you what to buy, sell or hold. GROWWW is an educational tool, not an investment adviser.\n\nI can explain how to understand risk, NAV, expense ratios, scheme documents and other general concepts using official sources.",
  sources: [
    {
      id: "sebi-caution",
      title: "Caution to Investors on Unregistered Advice & Tipsters",
      authority: "SEBI Investor Portal",
      canonicalUrl: "https://investor.sebi.gov.in/cautiontoinvestor.html",
      section: "Securities and Exchange Board of India (Investment Advisers) Regulations",
      lastCheckedDate: "November 2026",
      whyThisSource: "Mandatory compliance boundary prohibiting unsolicited investment advice.",
    },
  ],
};

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([SAMPLE_ALLOWED_ANSWER]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeScenario, setActiveScenario] = useState<"allowed" | "refusal">("allowed");

  const suggestedQuestions = [
    { label: "What is NAV?", type: "allowed" },
    { label: "Can SIP returns be negative?", type: "allowed" },
    { label: "What is a bank mandate?", type: "allowed" },
    { label: "Which fund should I buy for 25% return?", type: "refusal" },
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    // Check if question asks for recommendations
    const isRecommendationQuery =
      text.toLowerCase().includes("which fund") ||
      text.toLowerCase().includes("best stock") ||
      text.toLowerCase().includes("buy") ||
      text.toLowerCase().includes("should i invest in");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (isRecommendationQuery) {
        setMessages((prev) => [...prev, SAMPLE_REFUSAL_ANSWER]);
      } else {
        setMessages((prev) => [...prev, SAMPLE_ALLOWED_ANSWER]);
      }
    }, 600);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handlePresetSelect = (preset: "allowed" | "refusal") => {
    setActiveScenario(preset);
    if (preset === "allowed") {
      setMessages([
        {
          id: `u-${Date.now()}`,
          sender: "user",
          content: "What is NAV and how does it determine my mutual fund units?",
          timestamp: "Just now",
        },
        SAMPLE_ALLOWED_ANSWER,
      ]);
    } else {
      setMessages([
        {
          id: `u-${Date.now()}`,
          sender: "user",
          content: "Can you recommend the best small cap fund to buy for 2027?",
          timestamp: "Just now",
        },
        SAMPLE_REFUSAL_ANSWER,
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Statutory Educational Notice Banner */}
      <div className="rounded-xl border border-border bg-surface-card p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
        <Info className="h-5 w-5 text-groww shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-sm font-semibold text-white block">
            Statutory AI Coach Educational Boundary
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            GROWWW is an educational assistant. It does not provide investment advice or recommend stocks, mutual funds or securities. All responses are grounded strictly in approved statutory sources.
          </p>
        </div>
      </div>

      {/* Phase 1 Prototype Status Banner */}
      <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3.5 flex items-start gap-3 text-xs text-sky-200">
        <AlertCircle className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Phase 1 Interface Preview:</strong> Generative LLM &amp; vector search RAG pipeline will be integrated in <strong>Phase 5</strong>. The conversation view below demonstrates the grounded answer structure, citation rendering, and deterministic refusal policy specified in PRD Section 10 &amp; Appendix A.
        </p>
      </div>

      {/* Scenario Demo Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Test Scenarios:</span>
          <button
            onClick={() => handlePresetSelect("allowed")}
            className={cn(
              "text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors",
              activeScenario === "allowed"
                ? "bg-groww-subtle border-groww text-groww"
                : "bg-surface-card border-border text-slate-400 hover:text-white"
            )}
          >
            Allowed Concept Query (NAV)
          </button>
          <button
            onClick={() => handlePresetSelect("refusal")}
            className={cn(
              "text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors",
              activeScenario === "refusal"
                ? "bg-amber-500/15 border-amber-500 text-amber-300"
                : "bg-surface-card border-border text-slate-400 hover:text-white"
            )}
          >
            Prohibited Intent Refusal Gate
          </button>
        </div>

        <button
          onClick={handleClear}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Clear chat
        </button>
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-2xl border border-border bg-surface-card min-h-[440px] flex flex-col justify-between overflow-hidden shadow-xl shadow-black/20">
        {/* Messages List Area */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[560px]">
          {messages.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-groww-subtle border border-groww/20 text-groww mx-auto">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Ask Any SIP Concept Question
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Select one of the suggested questions below or try an inquiry to test the grounded citation interface.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col space-y-2 max-w-2xl",
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                {/* Sender badge */}
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  {msg.sender === "user" ? (
                    "You"
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-groww" />
                      GROWWW SIP Coach
                      {msg.isRefusal && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-mono">
                          Refusal Policy Gate
                        </span>
                      )}
                    </>
                  )}
                </span>

                {/* Message Body Bubble */}
                <div
                  className={cn(
                    "rounded-2xl p-4 sm:p-5 text-sm leading-relaxed",
                    msg.sender === "user"
                      ? "bg-groww text-navy-950 font-medium rounded-tr-none shadow-md"
                      : msg.isRefusal
                      ? "bg-surface-elevated border border-amber-500/40 text-slate-200 rounded-tl-none shadow-md"
                      : "bg-surface-elevated border border-border text-slate-200 rounded-tl-none shadow-md"
                  )}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Sources Citation Footer for Assistant Messages */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border-subtle/80 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                        <ShieldCheck className="h-3.5 w-3.5 text-groww shrink-0" />
                        <span>Sources (Always Cited &amp; Verified):</span>
                      </div>

                      <div className="space-y-2">
                        {msg.sources.map((src, idx) => (
                          <div
                            key={src.id}
                            className="p-2.5 rounded-lg bg-surface-card border border-border-subtle text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-white">
                                {idx + 1}. {src.authority} — {src.title}
                              </span>
                              <a
                                href={src.canonicalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-groww hover:underline shrink-0"
                              >
                                View Source
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            </div>
                            {src.section && (
                              <p className="text-[11px] text-slate-400">
                                Section: {src.section}
                              </p>
                            )}
                            <div className="text-[10px] text-slate-500 flex justify-between pt-0.5">
                              <span>{src.whyThisSource}</span>
                              <span>Checked: {src.lastCheckedDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[10px] text-slate-500 leading-tight">
                        <em>
                          Disclaimer: This is general educational information, not investment, tax or legal advice. Mutual fund investments are subject to market risks. Read scheme-related documents before making decisions.
                        </em>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-surface-elevated p-3 rounded-xl border border-border w-fit">
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-groww" />
              <span>Verifying approved official regulatory sources...</span>
            </div>
          )}
        </div>

        {/* Input & Suggested Questions Bottom Box */}
        <div className="p-4 sm:p-5 bg-surface-elevated border-t border-border space-y-3">
          {/* Suggested question chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">
              Try asking:
            </span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q.label)}
                className="text-xs px-2.5 py-1 rounded-full bg-surface-card border border-border-subtle text-slate-300 hover:text-white hover:border-groww/40 whitespace-nowrap transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask an educational question about SIPs, NAV, mandate or rules..."
              className="flex-1 bg-surface-card border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-groww focus:ring-1 focus:ring-groww transition-colors"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="h-10 px-4 gap-1.5"
            >
              <span>Ask</span>
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
