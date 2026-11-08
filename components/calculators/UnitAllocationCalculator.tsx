"use client";

import React, { useState, useId } from "react";
import { Layers, RotateCcw, ShieldAlert, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils/formatters";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function UnitAllocationCalculator() {
  const [instalmentAmount, setInstalmentAmount] = useState<number>(3000);
  const [scenario, setScenario] = useState<"volatile" | "falling_rising" | "bull">("volatile");

  const [navValues, setNavValues] = useState<number[]>([50, 42, 38, 45, 52, 60]);

  const instalmentId = useId();

  const presets = {
    volatile: {
      name: "Volatile Market (Ups & Downs)",
      navs: [50, 42, 38, 46, 52, 58],
      description: "Shows how buying through a dip lowers your average cost.",
    },
    falling_rising: {
      name: "Deep Correction & Recovery",
      navs: [60, 45, 30, 35, 50, 65],
      description: "Demonstrates dramatic unit accumulation when markets fall.",
    },
    bull: {
      name: "Gradual Upward Market",
      navs: [40, 44, 48, 52, 56, 62],
      description: "Shows how rising NAV buys fewer units over time.",
    },
  };

  const handleScenarioChange = (s: "volatile" | "falling_rising" | "bull") => {
    setScenario(s);
    setNavValues(presets[s].navs);
  };

  const handleNavChange = (index: number, val: number) => {
    const updated = [...navValues];
    updated[index] = Math.max(1, isNaN(val) ? 1 : val);
    setNavValues(updated);
  };

  // Calculations
  const rows = navValues.map((nav, idx) => {
    const units = instalmentAmount / nav;
    return {
      month: `Month ${idx + 1}`,
      invested: instalmentAmount,
      nav: nav,
      units: units,
    };
  });

  const totalInvested = rows.reduce((acc, curr) => acc + curr.invested, 0);
  const totalUnits = rows.reduce((acc, curr) => acc + curr.units, 0);
  const averageNav = totalUnits > 0 ? totalInvested / totalUnits : 0;
  const latestNav = navValues[navValues.length - 1];
  const currentValuation = totalUnits * latestNav;
  const simpleAverageNav =
    navValues.reduce((a, b) => a + b, 0) / navValues.length;

  const handleReset = () => {
    setInstalmentAmount(3000);
    setScenario("volatile");
    setNavValues(presets.volatile.navs);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-groww-subtle text-groww font-bold text-xs">
              4
            </span>
            <h3 className="text-xl font-bold text-white">
              Unit Allocation &amp; Rupee-Cost Averaging
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            See the exact math behind how buying units at changing NAVs smooths out your average purchase price.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="pt-6 space-y-6">
        {/* Preset scenario tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Market NAV Simulation Preset:
            </span>
            <p className="text-xs text-slate-400">{presets[scenario].description}</p>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-elevated p-1 rounded-xl border border-border">
            {(["volatile", "falling_rising", "bull"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleScenarioChange(s)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                  scenario === s
                    ? "bg-groww text-navy-950 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {presets[s].name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Fixed Monthly Instalment Slider */}
        <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor={instalmentId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Fixed Monthly Instalment
            </label>
            <div className="rounded-lg bg-surface-card px-3 py-1 border border-border text-sm font-semibold text-white">
              {formatINR(instalmentAmount)}
            </div>
          </div>
          <input
            id={instalmentId}
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={instalmentAmount}
            onChange={(e) => setInstalmentAmount(Number(e.target.value))}
            aria-label="Fixed Monthly Instalment"
            className="w-full accent-groww bg-surface-card h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Table of Monthly Allocations */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-elevated text-slate-400 uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Invested (₹)</th>
                <th className="py-3 px-4">Hypothetical NAV (₹)</th>
                <th className="py-3 px-4">Units Allotted</th>
                <th className="py-3 px-4">Key Takeaway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle bg-surface-card font-mono">
              {rows.map((row, idx) => {
                const isMinNav = row.nav === Math.min(...navValues);
                const isMaxNav = row.nav === Math.max(...navValues);
                return (
                  <tr key={idx} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="py-3 px-4 text-slate-300 font-sans font-medium">
                      {row.month}
                    </td>
                    <td className="py-3 px-4 text-white">
                      {formatINR(row.invested)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="1"
                          max="500"
                          value={row.nav}
                          onChange={(e) => handleNavChange(idx, Number(e.target.value))}
                          aria-label={`NAV for ${row.month}`}
                          className="w-16 px-2 py-1 bg-surface-elevated border border-border rounded text-white text-xs font-mono focus:outline-none focus:border-groww"
                        />
                        {isMinNav && (
                          <span className="text-[10px] text-groww font-sans font-medium bg-groww-subtle px-1.5 py-0.5 rounded">
                            Lowest NAV
                          </span>
                        )}
                        {isMaxNav && (
                          <span className="text-[10px] text-slate-400 font-sans font-medium bg-surface-elevated px-1.5 py-0.5 rounded">
                            Peak NAV
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-groww font-semibold">
                      {formatNumber(row.units, 3)} units
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-400 text-[11px]">
                      {isMinNav
                        ? "Bought highest number of units"
                        : isMaxNav
                        ? "Bought lowest number of units"
                        : "Steady automated allocation"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Results summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-elevated border border-border">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Total Invested
            </span>
            <div className="text-xl font-bold text-white">
              {formatINR(totalInvested)}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Across {rows.length} months
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated border border-border">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Total Units Accumulated
            </span>
            <div className="text-xl font-bold text-groww">
              {formatNumber(totalUnits, 3)}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Sum of monthly allocations
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated border border-border">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Average Purchase NAV
            </span>
            <div className="text-xl font-bold text-emerald-400">
              ₹ {formatNumber(averageNav, 2)}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              vs Simple Avg: ₹{formatNumber(simpleAverageNav, 2)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-elevated border border-border">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Current Valuation
            </span>
            <div className="text-xl font-bold text-white">
              {formatINR(currentValuation)}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              At latest NAV of ₹{latestNav}
            </span>
          </div>
        </div>

        {/* Education note */}
        <div className="rounded-xl border border-border-subtle bg-surface-subtle p-4 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Rupee-Cost Averaging Lesson:</strong> Notice that your weighted average purchase price per unit (₹{formatNumber(averageNav, 2)}) is lower than the simple average of NAVs (₹{formatNumber(simpleAverageNav, 2)}). This mathematical benefit happens automatically because fixed rupee instalments naturally purchase more units when markets are down.
          </p>
        </div>
      </div>
    </div>
  );
}
