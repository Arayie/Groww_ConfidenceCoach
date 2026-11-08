"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ExternalLink, HelpCircle, Search, ShieldCheck, Database, RefreshCw } from "lucide-react";
import { FaqItem } from "@/lib/types";
import { apiClient } from "@/lib/api/client";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function FaqAccordion() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [dataSource, setDataSource] = useState<string>("loading");
  const [isLoading, setIsLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Basics",
    "Mechanics",
    "Returns & Risk",
    "Operations",
    "Costs & Documents",
    "Tax & Regulations",
  ];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    apiClient
      .getFaqs(selectedCategory, searchQuery)
      .then((res) => {
        if (isMounted) {
          setFaqs(res.data);
          setDataSource(res.source);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-groww-subtle border border-groww/20 text-xs font-semibold text-groww mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Essential Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            New to SIPs? Start Here.
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            15 core questions every beginner asks before starting their first SIP. Answers are verified and sourced from official regulatory bodies.
          </p>

          {/* Database connection indicator */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Database className="h-3 w-3 text-groww" />
            <span>Data Provider:</span>
            <span className="font-mono text-slate-300">
              {dataSource === "fastapi_sqlite_backend" ? "FastAPI + SQLite DB" : "Curated Educational Corpus"}
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., NAV, bank mandate, returns, tax, fail)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-card border border-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-groww focus:ring-1 focus:ring-groww transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                  selectedCategory === cat
                    ? "bg-groww text-navy-950 font-semibold"
                    : "bg-surface-card text-slate-400 hover:text-white border border-border-subtle"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-8 text-xs text-slate-400">
            <RefreshCw className="h-4 w-4 animate-spin text-groww" />
            <span>Loading FAQs from knowledge base...</span>
          </div>
        )}

        {/* FAQs List */}
        {!isLoading && faqs.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-dashed border-border bg-surface-card/40 p-8">
            <p className="text-slate-400 text-sm">No FAQs match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-xs text-groww hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "rounded-xl border transition-all duration-200 overflow-hidden",
                    isOpen
                      ? "border-groww/40 bg-surface-card shadow-lg shadow-black/20"
                      : "border-border bg-surface-card/60 hover:border-slate-700 hover:bg-surface-card"
                  )}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-start sm:items-center gap-3 pr-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-elevated text-xs font-semibold text-groww border border-border-subtle">
                        {faq.order}
                      </span>
                      <span className="text-base sm:text-lg font-medium text-white">
                        {faq.question}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-block">
                        <Badge variant="outline" size="sm">
                          {faq.category}
                        </Badge>
                      </span>
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg bg-surface-elevated text-slate-400 transition-transform duration-200",
                          isOpen && "rotate-180 text-groww"
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-6 pt-1 border-t border-border/50 text-slate-300 text-sm space-y-4">
                      {/* Short Answer Summary Box */}
                      <div className="rounded-lg bg-groww-subtle border border-groww/20 p-3.5 text-slate-200 leading-relaxed font-normal">
                        <strong className="text-groww block text-xs font-semibold uppercase tracking-wider mb-1">
                          Quick Summary
                        </strong>
                        {faq.shortAnswer}
                      </div>

                      {/* Full Detailed Explanation */}
                      <div className="leading-relaxed text-slate-300 space-y-2">
                        <p>{faq.fullExplanation}</p>
                      </div>

                      {/* Source & Citation Footer */}
                      <div className="mt-4 pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                            <ShieldCheck className="h-3.5 w-3.5 text-groww shrink-0" />
                            <span>Official Source Reference:</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {faq.sources &&
                              faq.sources.map((src) => (
                                <a
                                  key={src.id}
                                  href={src.canonicalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-slate-300 hover:text-groww hover:underline bg-surface-elevated px-2 py-0.5 rounded border border-border-subtle"
                                >
                                  {src.authority} — {src.title}
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              ))}
                          </div>
                        </div>

                        <div className="shrink-0 text-slate-500 text-[11px]">
                          Reviewed: {faq.lastReviewedAt}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
