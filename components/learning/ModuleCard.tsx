import React from "react";
import { Clock, BookOpen, ExternalLink, ArrowRight, ShieldAlert } from "lucide-react";
import { LearningModule } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ModuleCardProps {
  module: LearningModule;
  onOpen: (module: LearningModule) => void;
}

export function ModuleCard({ module, onOpen }: ModuleCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-surface-card p-6 transition-all duration-200 hover:border-groww/30 hover:bg-surface-elevated">
      <div>
        {/* Module Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-groww-subtle text-groww font-bold text-xs border border-groww/20">
              {module.moduleNumber}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Module {module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={module.level === "Beginner" ? "teal" : "neutral"}
              size="sm"
            >
              {module.level}
            </Badge>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="h-3 w-3" />
              <span>{module.estimatedMinutes} min</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-snug">
          {module.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {module.description}
        </p>

        {/* Topics covered snippet */}
        <div className="space-y-1.5 pt-2 border-t border-border-subtle mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            Topics in this module:
          </span>
          <ul className="text-xs text-slate-400 space-y-1">
            {module.topics.slice(0, 3).map((topic, i) => (
              <li key={i} className="flex items-center gap-1.5 truncate">
                <span className="h-1 w-1 rounded-full bg-groww shrink-0" />
                <span className="truncate">{topic}</span>
              </li>
            ))}
            {module.topics.length > 3 && (
              <li className="text-[11px] text-slate-500 font-medium pl-2.5">
                + {module.topics.length - 3} more topics
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          <ShieldAlert className="h-3 w-3 shrink-0" />
          <span>Awaiting Review</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpen(module)}
          className="text-xs h-8 px-3 gap-1 hover:border-groww hover:text-groww"
        >
          <span>View Module</span>
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
