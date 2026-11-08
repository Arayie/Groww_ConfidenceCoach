import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, Shield, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/60">
      {/* Background glow subtle effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-groww/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Audience badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-border text-xs font-medium text-slate-300 mb-6 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-groww" />
          <span>Designed for First-Time Investors (Aged 20–28)</span>
          <span className="text-slate-600">•</span>
          <span className="text-groww">100% Free &amp; Educational</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Understand SIPs. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-groww">
            Invest with Confidence.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
          Learn how systematic investing works, understand the process and make informed financial decisions through education.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/learn" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-7">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/calculators" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto gap-2 text-base px-6 border-slate-700 hover:border-slate-500"
            >
              <Calculator className="h-4 w-4 text-groww" />
              Explore SIP Calculator
            </Button>
          </Link>
        </div>

        {/* Three Trust Pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-border/40 text-left">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-card/40 border border-border-subtle">
            <CheckCircle2 className="h-5 w-5 text-groww shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">No Jargon, Pure Clarity</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Step-by-step explanations written for beginners with practical analogies.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-card/40 border border-border-subtle">
            <Shield className="h-5 w-5 text-groww shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Official Sources Only</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every concept grounded in verified SEBI, AMFI, and RBI regulatory guidelines.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-card/40 border border-border-subtle">
            <TrendingUp className="h-5 w-5 text-groww shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Strictly Educational</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Zero product selling, zero stock tips, zero pressure to open accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
