import React from "react";
import { Hero } from "@/components/home/Hero";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { QuickNavigation } from "@/components/home/QuickNavigation";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <QuickNavigation />
      <FaqAccordion />
    </div>
  );
}
