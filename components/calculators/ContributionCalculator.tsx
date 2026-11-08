"use client";

import React, { useState, useId } from "react";
import { PiggyBank, RotateCcw, Calendar, Coins } from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export function ContributionCalculator() {
  const [amount, setAmount] = useState<number>(2000);
  const [frequency, setFrequency] = useState<"weekly" | "monthly" | "quarterly">("monthly");
  const [years, setYears] = useState<number>(5);

  const amountId = useId();
  const yearsId = useId();

  const frequencyMultiplier = {
    weekly: 52,
    monthly: 12,
    quarterly: 4,
  }[frequency];

  const totalInstallments = years * frequencyMultiplier;
  const totalInvested = amount * totalInstallments;
  const yearlyContribution = amount * frequencyMultiplier;

  const handleReset = () => {
    setAmount(2000);
    setFrequency("monthly");
    setYears(5);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-groww-subtle text-groww font-bold text-xs">
              3
            </span>
            <h3 className="text-xl font-bold text-white">Total Contribution Calculator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Pure savings breakdown without market return assumptions. See how consistent discipline accumulates capital.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Amount per instalment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={amountId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Instalment Amount
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-white">
                {formatINR(amount)}
              </div>
            </div>
            <input
              id={amountId}
              type="range"
              min="500"
              max="50000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label="Instalment Amount"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>₹500</span>
              <span>₹25,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Frequency selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Investment Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["weekly", "monthly", "quarterly"] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={cn(
                    "p-2.5 rounded-xl border text-xs font-medium capitalize transition-colors text-center",
                    frequency === freq
                      ? "bg-groww text-navy-950 font-bold border-groww"
                      : "bg-surface-elevated text-slate-300 border-border hover:border-slate-500"
                  )}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={yearsId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Duration
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-white">
                {years} {years === 1 ? "Year" : "Years"}
              </div>
            </div>
            <input
              id={yearsId}
              type="range"
              min="1"
              max="25"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              aria-label="Duration in Years"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>1 Year</span>
              <span>12 Years</span>
              <span>25 Years</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-elevated p-6 border border-border">
          <div className="space-y-4">
            <div className="pb-3 border-b border-border-subtle">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Total Cumulative Contribution
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formatINR(totalInvested)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Pure principal saved over {years} years
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-surface-card border border-border-subtle">
                <span className="text-[11px] text-slate-400 block mb-0.5">Total Debits</span>
                <span className="text-base font-bold text-groww">
                  {totalInstallments} instalments
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-card border border-border-subtle">
                <span className="text-[11px] text-slate-400 block mb-0.5">Annual Total</span>
                <span className="text-base font-bold text-white">
                  {formatINR(yearlyContribution)} / yr
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Deterministic Principle:</span>
            <p>
              This calculation contains no speculative assumptions. It highlights the quiet power of consistency before any compounding or market performance is factored in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
