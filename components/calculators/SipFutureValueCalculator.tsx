"use client";

import React, { useState, useId } from "react";
import { Calculator, Info, ShieldAlert, RotateCcw } from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils/formatters";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function SipFutureValueCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [timing, setTiming] = useState<"beginning" | "end">("beginning");
  const amountId = useId();
  const rateId = useId();
  const yearsId = useId();

  // Pure derived validation
  const errors = {
    amount:
      isNaN(monthlyAmount) || monthlyAmount < 500
        ? "Minimum monthly SIP amount is ₹500"
        : monthlyAmount > 1000000
        ? "Maximum amount for illustration is ₹10,00,000"
        : undefined,
    rate:
      isNaN(expectedRate) || expectedRate < 0
        ? "Assumed rate cannot be negative"
        : expectedRate > 30
        ? "Assumed rate cannot exceed 30% for realistic illustration"
        : undefined,
    years:
      isNaN(years) || years < 1
        ? "Duration must be at least 1 year"
        : years > 40
        ? "Duration cannot exceed 40 years"
        : undefined,
  };

  const isValid = !errors.amount && !errors.rate && !errors.years;

  // Deterministic calculation
  // i = periodic interest rate (monthly)
  // n = total number of months
  const n = years * 12;
  const totalInvested = monthlyAmount * n;
  let futureValue = totalInvested;

  if (isValid && expectedRate > 0) {
    const i = expectedRate / (12 * 100);
    const ordinaryAnnuity = monthlyAmount * ((Math.pow(1 + i, n) - 1) / i);
    futureValue = timing === "beginning" ? ordinaryAnnuity * (1 + i) : ordinaryAnnuity;
  }

  const estimatedGain = Math.max(0, futureValue - totalInvested);

  const handleReset = () => {
    setMonthlyAmount(5000);
    setExpectedRate(12);
    setYears(10);
    setTiming("beginning");
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-groww-subtle text-groww font-bold text-xs">
              1
            </span>
            <h3 className="text-xl font-bold text-white">SIP Future Value Calculator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Estimates the hypothetical future value of regular monthly investments using standard compound annuity formulas.
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
        {/* Input Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Investment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={amountId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Monthly Investment
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-white">
                ₹ {monthlyAmount.toLocaleString("en-IN")}
              </div>
            </div>
            <input
              id={amountId}
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              aria-label="Monthly Investment Amount"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
            </div>
            {errors.amount && <p className="text-xs text-rose-400">{errors.amount}</p>}
          </div>

          {/* Expected Annual Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={rateId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Assumed Annual Return Rate (p.a.)
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-groww">
                {expectedRate}%
              </div>
            </div>
            <input
              id={rateId}
              type="range"
              min="0"
              max="25"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              aria-label="Assumed Annual Return Rate"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0% (Zero-return benchmark)</span>
              <span>12% (Illustrative)</span>
              <span>25%</span>
            </div>
            {errors.rate && <p className="text-xs text-rose-400">{errors.rate}</p>}
          </div>

          {/* Investment Time Period */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor={yearsId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Time Horizon
              </label>
              <div className="flex items-center rounded-lg bg-surface-elevated px-3 py-1 border border-border text-sm font-semibold text-white">
                {years} {years === 1 ? "Year" : "Years"}
              </div>
            </div>
            <input
              id={yearsId}
              type="range"
              min="1"
              max="35"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              aria-label="Investment Time Horizon"
              className="w-full accent-groww bg-surface-elevated h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>1 Yr</span>
              <span>15 Yrs</span>
              <span>35 Yrs</span>
            </div>
            {errors.years && <p className="text-xs text-rose-400">{errors.years}</p>}
          </div>

          {/* Timing Convention */}
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
            <span className="text-xs text-slate-400">Instalment Timing:</span>
            <div className="flex items-center gap-1 bg-surface-elevated p-1 rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setTiming("beginning")}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                  timing === "beginning"
                    ? "bg-groww text-navy-950 font-semibold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Beginning of month
              </button>
              <button
                type="button"
                onClick={() => setTiming("end")}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                  timing === "end"
                    ? "bg-groww text-navy-950 font-semibold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                End of month
              </button>
            </div>
          </div>
        </div>

        {/* Output Cards & Breakdown (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-elevated p-6 border border-border">
          <div className="space-y-4">
            <div className="pb-3 border-b border-border-subtle">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                Hypothetical Future Value
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-groww tracking-tight">
                {formatINR(futureValue)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Based on {n} instalments of {formatINR(monthlyAmount)}
              </span>
            </div>

            {/* Total Invested vs Estimated Gain */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-surface-card border border-border-subtle">
                <span className="text-[11px] text-slate-400 block mb-0.5">Total Invested</span>
                <span className="text-base font-bold text-white">
                  {formatINR(totalInvested)}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-card border border-border-subtle">
                <span className="text-[11px] text-slate-400 block mb-0.5">Illustrative Gain</span>
                <span className="text-base font-bold text-emerald-400">
                  {formatINR(estimatedGain)}
                </span>
              </div>
            </div>

            {/* Visual Proportion Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                <span>Principal: {formatNumber((totalInvested / futureValue) * 100, 1)}%</span>
                <span>Growth: {formatNumber((estimatedGain / futureValue) * 100, 1)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden flex">
                <div
                  className="bg-slate-400 h-full"
                  style={{ width: `${Math.min(100, (totalInvested / futureValue) * 100)}%` }}
                />
                <div
                  className="bg-groww h-full"
                  style={{ width: `${Math.max(0, (estimatedGain / futureValue) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mandatory Regulatory Assumptions & Disclaimer Box */}
          <div className="mt-6 pt-4 border-t border-border-subtle text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Assumption Transparency &amp; Disclosure:</span>
            </div>
            <p>
              Formula used: Standard compound annuity formula <em>FV = P × [((1+i)ⁿ − 1) ÷ i] × (1+i)</em>.
            </p>
            <p>
              This is a hypothetical scenario for educational illustration only. Mutual funds do NOT offer assured returns. Calculations exclude applicable taxes, STCG/LTCG, stamp duty, and scheme expense ratios (TER).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
