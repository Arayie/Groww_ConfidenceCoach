"use client";

import React, { useState } from "react";
import { Calculator, Target, PiggyBank, Layers, ShieldCheck } from "lucide-react";
import { SipFutureValueCalculator } from "@/components/calculators/SipFutureValueCalculator";
import { GoalSipCalculator } from "@/components/calculators/GoalSipCalculator";
import { ContributionCalculator } from "@/components/calculators/ContributionCalculator";
import { UnitAllocationCalculator } from "@/components/calculators/UnitAllocationCalculator";
import { cn } from "@/lib/utils/cn";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"future-value" | "goal-sip" | "contribution" | "unit-allocation">("future-value");

  const calculatorTabs = [
    {
      id: "future-value",
      label: "SIP Future Value",
      icon: Calculator,
      description: "Compound growth estimator",
    },
    {
      id: "goal-sip",
      label: "Goal-Based SIP",
      icon: Target,
      description: "Reverse planning target",
    },
    {
      id: "contribution",
      label: "Total Contribution",
      icon: PiggyBank,
      description: "Zero-return savings total",
    },
    {
      id: "unit-allocation",
      label: "Unit Allocation & Cost Averaging",
      icon: Layers,
      description: "NAV and units simulator",
    },
  ] as const;

  return (
    <div className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-groww-subtle border border-groww/20 text-xs font-semibold text-groww mb-3">
            <Calculator className="h-3.5 w-3.5" />
            <span>Deterministic Financial Calculators</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Explore Systematic Investing Numbers
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            All calculations are performed by deterministic application code without generative AI guessing. Experiment with contribution sizes, timelines, and market fluctuations to visualize how compounding and rupee-cost averaging work.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {calculatorTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200",
                  isActive
                    ? "bg-surface-elevated border-groww text-white shadow-md ring-1 ring-groww/40"
                    : "bg-surface-card border-border text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={cn("h-4 w-4", isActive ? "text-groww" : "text-slate-400")} />
                  <span className="text-xs font-bold text-white tracking-tight">
                    {tab.label}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {tab.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Calculator Component */}
        <div className="transition-all duration-300">
          {activeTab === "future-value" && <SipFutureValueCalculator />}
          {activeTab === "goal-sip" && <GoalSipCalculator />}
          {activeTab === "contribution" && <ContributionCalculator />}
          {activeTab === "unit-allocation" && <UnitAllocationCalculator />}
        </div>
      </div>
    </div>
  );
}
