"use client";

import React, { useState } from "react";
import { Search, BookmarkCheck, ExternalLink, ShieldCheck, X } from "lucide-react";
import { GLOSSARY_TERMS } from "@/lib/constants/glossaryTerms";
import { GlossaryEntry } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function GlossaryView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Fundamentals",
    "Metrics & Returns",
    "Operations & Banking",
    "Costs & Documents",
    "Investor Protection",
  ];

  const filteredTerms = GLOSSARY_TERMS.filter((entry) => {
    const matchesCat =
      selectedCategory === "All" || entry.category === selectedCategory;
    const termQuery = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !termQuery ||
      entry.term.toLowerCase().includes(termQuery) ||
      entry.fullForm?.toLowerCase().includes(termQuery) ||
      entry.definition.toLowerCase().includes(termQuery) ||
      entry.practicalExample?.toLowerCase().includes(termQuery);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search financial terms, acronyms or definitions (e.g. NAV, XIRR, TER, Mandate)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-surface-card border border-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-groww focus:ring-1 focus:ring-groww transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                selectedCategory === cat
                  ? "bg-groww text-navy-950 font-bold"
                  : "bg-surface-card text-slate-400 hover:text-white border border-border-subtle"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Count & Results Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-border/50">
        <span>
          Showing <strong className="text-white">{filteredTerms.length}</strong> terms
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </span>
        <span className="text-[11px] text-slate-500">
          Source: Official SEBI &amp; AMFI Definitions
        </span>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-border bg-surface-card/40 p-8">
          <p className="text-slate-400 text-sm">
            No terms found matching &ldquo;{searchTerm}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-xs text-groww hover:underline"
          >
            Clear search filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-surface-card p-5 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      {item.term}
                    </h3>
                    {item.fullForm && (
                      <span className="text-xs text-groww font-medium block mt-0.5">
                        {item.fullForm}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" size="sm">
                    {item.category}
                  </Badge>
                </div>

                {/* Definition */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.definition}
                </p>

                {/* Practical Example Box */}
                {item.practicalExample && (
                  <div className="p-3 rounded-lg bg-surface-subtle border border-border-subtle text-xs text-slate-400">
                    <strong className="text-slate-300 block text-[11px] mb-1">
                      Practical Context:
                    </strong>
                    {item.practicalExample}
                  </div>
                )}
              </div>

              {/* Authority Footer */}
              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">Source: {item.authority}</span>
                {item.officialReferenceUrl && (
                  <a
                    href={item.officialReferenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-groww hover:underline shrink-0"
                  >
                    Official Portal
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
