import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-subtle text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-groww-subtle border border-groww/30 text-groww font-bold text-sm">
                G
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                GROWWW <span className="text-groww font-normal">SIP Confidence Coach</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              An educational web application designed for young adults (aged 20–28) and first-time investors to learn systematic investing concepts, understand the investment lifecycle, and navigate personal finance with clarity and confidence.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-groww shrink-0" />
              <span>Educational only — No fund recommendations, no transactions.</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-groww transition-colors">
                  Home & FAQs
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-groww transition-colors">
                  SIP Curriculum (10 Modules)
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-groww transition-colors">
                  Visual SIP Journey
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-groww transition-colors">
                  SIP Calculators
                </Link>
              </li>
              <li>
                <Link href="/ask" className="hover:text-groww transition-colors">
                  Ask AI Coach
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-groww transition-colors">
                  Financial Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Indian Regulatory Sources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Official Regulatory Authorities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://investor.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-groww transition-colors"
                >
                  SEBI Investor Portal
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.amfiindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-groww transition-colors"
                >
                  AMFI India
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-groww transition-colors"
                >
                  Reserve Bank of India (RBI)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-groww transition-colors"
                >
                  SEBI SCORES (Grievances)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Educational Boundary Box */}
        <div className="rounded-xl border border-border/80 bg-surface-card/60 p-4 text-xs leading-relaxed text-slate-400 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300">
            <Info className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Statutory Educational Disclaimer & Independence Notice</span>
          </div>
          <p>
            GROWWW SIP Confidence Coach is an independent educational prototype. It is NOT affiliated with, authorized by, or endorsed by Nextbillion Technology Pvt Ltd (Groww) or any registered Asset Management Company.
          </p>
          <p>
            This application does not provide investment advice, financial planning, portfolio recommendations, or buy/sell/hold opinions on securities or mutual fund schemes. Mutual fund investments are subject to market risks; read all scheme-related documents carefully before investing. Historical returns do not guarantee future performance.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-6 border-t border-border-subtle">
          <p>© 2026 GROWWW SIP Confidence Coach. Built for Educational Research & MVP Evaluation.</p>
          <p className="mt-2 sm:mt-0">Phase 1: Frontend Foundation &amp; UI/UX</p>
        </div>
      </div>
    </footer>
  );
}
