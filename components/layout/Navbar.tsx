"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  Calculator,
  MessageSquare,
  BookmarkCheck,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/learn", label: "Learn SIP", icon: BookOpen },
    { href: "/journey", label: "SIP Journey", icon: Sparkles },
    { href: "/calculators", label: "Calculators", icon: Calculator },
    { href: "/ask", label: "Ask AI", icon: MessageSquare },
    { href: "/glossary", label: "Glossary", icon: BookmarkCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Minimalist Groww-inspired Logo emblem */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-groww-subtle border border-groww/30 text-groww transition-all group-hover:scale-105 group-hover:bg-groww group-hover:text-navy-950">
              <span className="font-bold text-lg tracking-tight">G</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-white">
                  GROWWW
                </span>
                <span className="text-xs font-medium text-groww tracking-wide">
                  COACH
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                SIP Confidence Coach
              </span>
            </div>
          </Link>
          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/60 ml-2">
            Educational Prototype
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-groww-subtle text-groww border border-groww/25"
                    : "text-slate-300 hover:text-white hover:bg-surface-card"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-groww" : "text-slate-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Badge / Status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-card border border-border text-[11px] text-slate-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-groww animate-pulse" />
            FastAPI + SQLite Active
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-card focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-surface-card px-4 pt-2 pb-4 space-y-1">
          <div className="mb-2 pb-2 border-b border-border-subtle flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Independent Educational Platform
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-groww-subtle text-groww font-medium border border-groww/20">
              Phase 1
            </span>
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-groww-subtle text-groww font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-surface-elevated"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-groww" : "text-slate-400")} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
