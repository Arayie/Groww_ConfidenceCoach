"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, ShieldCheck, Clock, RefreshCw, Database } from "lucide-react";
import { LearningModule } from "@/lib/types";
import { apiClient } from "@/lib/api/client";
import { ModuleCard } from "@/components/learning/ModuleCard";
import { ModuleModal } from "@/components/learning/ModuleModal";
import { cn } from "@/lib/utils/cn";

export default function LearnPage() {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [dataSource, setDataSource] = useState<string>("loading");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All" | "Beginner" | "Intermediate">("All");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    apiClient
      .getLearningModules()
      .then((res) => {
        if (isMounted) {
          setModules(res.data);
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
  }, []);

  const filteredModules = modules.filter((mod) => {
    const matchesLevel = levelFilter === "All" || mod.level === levelFilter;
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const handleOpenModule = (mod: LearningModule) => {
    setSelectedModule(mod);
    setIsModalOpen(true);
  };

  const handleCloseModule = () => {
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  const totalMinutes = modules.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);

  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-groww-subtle border border-groww/20 text-xs font-semibold text-groww mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Structured Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Learn SIP From the Ground Up
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            10 foundational modules designed specifically for aspiring and first-time investors aged 20–28. Understand compounding, navigate market volatility, and master the lifecycle before committing your money.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-surface-card px-3 py-1 rounded-md border border-border">
              <BookOpen className="h-3.5 w-3.5 text-groww" />
              10 Comprehensive Modules
            </span>
            <span className="flex items-center gap-1.5 bg-surface-card px-3 py-1 rounded-md border border-border">
              <Clock className="h-3.5 w-3.5 text-groww" />
              ~{totalMinutes} Minutes Total Duration
            </span>
            <span className="flex items-center gap-1.5 bg-surface-card px-3 py-1 rounded-md border border-border">
              <Database className="h-3.5 w-3.5 text-groww" />
              Source: {dataSource === "fastapi_sqlite_backend" ? "FastAPI SQLite Store" : "Verified Seed Corpus"}
            </span>
            <span className="flex items-center gap-1.5 bg-surface-card px-3 py-1 rounded-md border border-border">
              <ShieldCheck className="h-3.5 w-3.5 text-groww" />
              Aligned with SEBI &amp; AMFI Guidelines
            </span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. NAV, tax, compounding)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-card border border-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-groww focus:ring-1 focus:ring-groww transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Level:</span>
            {(["All", "Beginner", "Intermediate"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  levelFilter === lvl
                    ? "bg-groww text-navy-950 font-semibold"
                    : "bg-surface-card text-slate-400 hover:text-white border border-border-subtle"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-16 text-xs text-slate-400">
            <RefreshCw className="h-4 w-4 animate-spin text-groww" />
            <span>Loading modules from database...</span>
          </div>
        )}

        {/* Modules Grid */}
        {!isLoading && filteredModules.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-dashed border-border bg-surface-card/40 p-8">
            <p className="text-slate-400 text-sm">No modules found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setLevelFilter("All");
              }}
              className="mt-3 text-xs text-groww hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onOpen={handleOpenModule}
              />
            ))}
          </div>
        )}

        {/* Interactive Reader Modal */}
        <ModuleModal
          module={selectedModule}
          isOpen={isModalOpen}
          onClose={handleCloseModule}
        />
      </div>
    </div>
  );
}
