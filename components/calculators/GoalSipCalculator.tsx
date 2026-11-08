"use client";

import React, { useState, useId } from "react";
import { Target, RotateCcw, ShieldAlert, ArrowRight } from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";

export function GoalSipCalculator() {
  const [targetAmount, setTargetAmount] = useState<number>(1000000); // 10 Lakhs
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const targetId = useId();
  const rateId = useId();
  const yearsId = useId();

  // Pure derived validation
  const errors = {
    target:
      isNaN(targetAmount) || targetAmount < 10000
        ? "Minimum target amount is ₹10,000"
        : targetAmount > 100000000
        ? "Target amount exceeds maximum limit"
        : undefined,
    rate:
      isNaN(expectedRate) || expectedRate < 0
        ? "Assumed rate cannot be negative"
        : expectedRate > 25
        ? "Assumed rate cannot exceed 25%"
        : undefined,
    years:
      isNaN(years) || years < 1
        ? "Duration must be at least 1 year"
        : years > 40
        ? "Duration cannot exceed 40 years"
        : undefined,
  };

  const isValid = !errors.target && !errors.rate && !errors.years;

  const n = years * 12;
  let requiredMonthly = 0;

  if (isValid) {
    if (expectedRate === 0) {
      requiredMonthly = Math.ceil(targetAmount / n);
    } else {
      const i = expectedRate / (12 * 100);
      // P = FV * i / (((1+i)^n - 1) * (1+i))
      requiredMonthly = Math.ceil(targetAmount / (((Math.pow(1 + i, n) - 1) / i) * (1 + i)));
    }
  }

  const totalInvested = requiredMonthly * n;
  const estimatedGain = Math.max(0, targetAmount - totalInvested);

  const handleReset = () => {
    setTargetAmount(1000000);
    setExpectedRate(12);
    setYears(10);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-groww-subtle text-groww font-bold text-xs">
              2
            </span>
            <h3 className="text-xl font-bold text-white">Goal-Based SIP Calculator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Work backwards from your future target to estimate the hypothetical monthly SIP needed.
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
        {/* Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={targetId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Target Wealth Goal
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-white">
                {formatINR(targetAmount)}
              </div>
            </div>
            <input
              id={targetId}
              type="range"
              min="50000"
              max="20000000"
              step="50000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              aria-label="Target Wealth Goal"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>₹50,000</span>
              <span>₹1 Crore</span>
              <span>₹2 Crore</span>
            </div>
            {errors.target && <p className="text-xs text-rose-400">{errors.target}</p>}
          </div>

          {/* Assumed Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={rateId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Assumed Annual Return Rate
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-groww">
                {expectedRate}%
              </div>
            </div>
            <input
              id={rateId}
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              aria-label="Assumed Annual Return Rate"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0% (Zero-growth)</span>
              <span>12% (Illustrative)</span>
              <span>20%</span>
            </div>
            {errors.rate && <p className="text-xs text-rose-400">{errors.rate}</p>}
          </div>

          {/* Time Horizon */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={yearsId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Target Horizon (Years)
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-white">
                {years} {years === 1 ? "Year" : "Years"}
              </div>
            </div>
            <input
              id={yearsId}
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              aria-label="Target Horizon in Years"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>1 Yr</span>
              <span>15 Yrs</span>
              <span>30 Yrs</span>
            </div>
            {errors.years && <p className="text-xs text-rose-400">{errors.years}</p>}
          </div>
        </div>

        {/* Output Section (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-elevated p-6 border border-border">
          <div className="space-y-4">
            <div className="pb-3 border-b border-border-subtle">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Required Monthly SIP (Hypothetical)
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-groww tracking-tight">
                {formatINR(requiredMonthly)}
                <span className="text-sm font-normal text-slate-400"> / month</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Over {n} months ({years} years) to aim for {formatINR(targetAmount)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-surface-card border border-border-subtle">
                <span className="text-[11px] text-slate-400 block mb-0.5">Total Out-of-Pocket</span>
                <span className="text-base font-bold text-white">
                  {formatINR(totalInvested)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-card border border-border-subtle">
                <span className="text-[11px] text-slate-400 block mb-0.5">Assumed Growth</span>
                <span className="text-base font-bold text-emerald-400">
                  {formatINR(estimatedGain)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Crucial Educational Caveat:</span>
            </div>
            <p>
              Actual returns are unpredictable and fluctuating. Mutual funds cannot guarantee that an assumed {expectedRate}% return will be achieved. This tool shows mathematical contribution requirements only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
