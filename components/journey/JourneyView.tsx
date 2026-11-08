"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Building2,
  CreditCard,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { JOURNEY_STAGES } from "@/lib/constants/journeySteps";
import { JourneyStage } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function JourneyView() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage: JourneyStage = JOURNEY_STAGES[activeStageIndex];

  return (
    <div className="space-y-10">
      {/* Simulation Disclaimer Callout */}
      <div className="rounded-xl border border-border bg-surface-card/60 p-4 flex items-start gap-3 text-xs text-slate-300">
        <ShieldCheck className="h-4 w-4 text-groww shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Educational Simulation:</span> This visual journey explains the statutory and banking mechanics of mutual fund SIPs in India. It does NOT connect to any bank, broker, or payment gateway.
        </div>
      </div>

      {/* Interactive Horizontal Timeline (Desktop/Tablet) & Stepper */}
      <div className="rounded-2xl border border-border bg-surface-card p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-groww">
            Interactive Timeline
          </span>
          <span className="text-xs text-slate-400">
            Stage {activeStageIndex + 1} of {JOURNEY_STAGES.length}
          </span>
        </div>

        {/* Stepper Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 relative group",
                  isActive
                    ? "bg-surface-elevated border-groww text-white shadow-sm ring-1 ring-groww/50"
                    : "bg-surface-card/60 border-border-subtle text-slate-400 hover:border-slate-600 hover:text-slate-200"
                )}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                      isActive
                        ? "bg-groww text-navy-950"
                        : isCompleted
                        ? "bg-slate-700 text-groww"
                        : "bg-slate-800 text-slate-400"
                    )}
                  >
                    {isCompleted ? "✓" : idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Step {idx + 1}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium line-clamp-2 leading-tight",
                    isActive ? "text-white font-semibold" : "text-slate-300"
                  )}
                >
                  {stage.title.replace(/^\d+\.\s*/, "")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Breakdown Panel */}
      <div className="rounded-2xl border border-groww/25 bg-surface-card p-6 sm:p-8 shadow-xl shadow-black/20">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="teal" size="sm">
                Stage {currentStage.stageNumber} of {JOURNEY_STAGES.length}
              </Badge>
              <Badge variant="outline" size="sm">
                {currentStage.stageBadge}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {currentStage.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {currentStage.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              disabled={activeStageIndex === 0}
              onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
              className="text-xs h-9 px-3"
            >
              Previous Step
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={activeStageIndex === JOURNEY_STAGES.length - 1}
              onClick={() =>
                setActiveStageIndex((prev) => Math.min(JOURNEY_STAGES.length - 1, prev + 1))
              }
              className="text-xs h-9 px-3 gap-1"
            >
              <span>Next Step</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          {/* Main Process Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Stage Overview
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-surface-subtle p-4 rounded-xl border border-border-subtle">
                {currentStage.summary}
              </p>
            </div>

            {/* Step-by-Step Flow */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-groww" />
                Operational Workflow
              </h4>
              <div className="space-y-3">
                {currentStage.detailedProcess.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-elevated/70 border border-border-subtle text-xs sm:text-sm text-slate-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-groww-subtle text-groww font-bold text-xs border border-groww/20 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Behind the scenes */}
            <div className="rounded-xl border border-border/70 bg-surface-subtle p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Building2 className="h-4 w-4 text-sky-400" />
                <span>What Happens Behind the Scenes (Banking &amp; Clearing)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentStage.whatHappensBehindTheScenes}
              </p>
            </div>
          </div>

          {/* Sidebar Insights Column (1/3) */}
          <div className="space-y-6">
            {/* Common confusion resolved */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Common Beginner Confusion</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStage.commonBeginnerConfusion}
              </p>
            </div>

            {/* Regulatory guidance note */}
            <div className="rounded-xl border border-border bg-surface-subtle p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <BadgeCheck className="h-4 w-4 text-groww shrink-0" />
                <span>Regulatory Standard</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentStage.officialGuidelineNote}
              </p>
            </div>

            {/* Authoritative Source Box */}
            <div className="rounded-xl border border-border bg-surface-elevated p-4 space-y-2 text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Statutory Authority
              </span>
              <div className="font-medium text-white">
                {currentStage.authoritativeSource.authority}
              </div>
              <div className="text-slate-400 text-[11px]">
                {currentStage.authoritativeSource.title}
              </div>
              <a
                href={currentStage.authoritativeSource.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-groww hover:underline pt-2 font-medium"
              >
                View Regulatory Source
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
