import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Calculator, MessageSquare, ArrowRight, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function QuickNavigation() {
  const sections = [
    {
      title: "10-Module Curriculum",
      description: "From saving vs investing to NAV, compounding, and capital gains tax awareness.",
      href: "/learn",
      cta: "Explore Modules",
      icon: BookOpen,
      badge: "10 Modules",
    },
    {
      title: "The 7-Stage SIP Journey",
      description: "Visual roadmap of what happens between clicking 'Invest' and units reflecting.",
      href: "/journey",
      cta: "View Lifecycle",
      icon: Sparkles,
      badge: "Visual Flow",
    },
    {
      title: "Interactive Calculators",
      description: "Transparent, deterministic calculations for future value, target goals, and rupee-cost averaging.",
      href: "/calculators",
      cta: "Open Calculators",
      icon: Calculator,
      badge: "Formula-Driven",
    },
    {
      title: "Ask AI Confidence Coach",
      description: "Grounded educational responses strictly citing official SEBI and AMFI documentation.",
      href: "/ask",
      cta: "Preview Coach",
      icon: MessageSquare,
      badge: "Citations Included",
    },
  ];

  return (
    <section className="py-12 border-b border-border/60 bg-surface-subtle/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-groww">
              Structured Learning System
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Everything You Need to Begin Safely
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-2 md:mt-0 max-w-md">
            No stock picks, no hype, no sales pitch. Just clear educational foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group block">
                <Card
                  hoverable
                  className="h-full flex flex-col justify-between p-5 border-border bg-surface-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-groww-subtle border border-groww/20 text-groww group-hover:bg-groww group-hover:text-navy-950 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-elevated text-slate-300 border border-border-subtle">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-groww transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-groww transition-colors">
                    <span>{item.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
