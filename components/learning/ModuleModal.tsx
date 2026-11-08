import React from "react";
import { Clock, ShieldAlert, CheckCircle2, ExternalLink, BookOpen, AlertCircle } from "lucide-react";
import { LearningModule } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ModuleModalProps {
  module: LearningModule | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModuleModal({ module, isOpen, onClose }: ModuleModalProps) {
  if (!module) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Module ${module.moduleNumber}: ${module.title}`}
      subtitle={`${module.level} Level • ${module.estimatedMinutes} minutes study time • Version ${module.version}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Phase 1 Editorial Disclaimer Notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block text-amber-300">
              Phase 1 Educational Content Notice:
            </span>
            <p className="text-amber-200/90 leading-relaxed">
              This module curriculum is currently in outline structure, awaiting final editorial sign-off against official SEBI and AMFI source documentation (scheduled for Phase 3). No financial opinions or fund recommendations are included.
            </p>
          </div>
        </div>

        {/* Overview Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Module Overview
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-surface-subtle p-3.5 rounded-lg border border-border-subtle">
            {module.description}
          </p>
        </div>

        {/* Syllabus / Detailed Topics Breakdown */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-groww" />
            Curriculum Topics ({module.topics.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {module.topics.map((topic, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-card border border-border-subtle text-xs text-slate-200"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-surface-elevated text-groww font-semibold text-[10px]">
                  {i + 1}
                </span>
                <span className="mt-0.5">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Key Learning Outcomes
          </h4>
          <div className="space-y-2">
            {module.keyTakeaways.map((takeaway, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-xs text-slate-300 bg-groww-subtle/50 p-2.5 rounded-lg border border-groww/20"
              >
                <CheckCircle2 className="h-4 w-4 text-groww shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Statutory Reference */}
        <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block text-[11px]">Primary Authority Reference:</span>
            <span className="text-slate-300 font-medium">{module.primaryAuthority}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={module.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-groww hover:underline bg-surface-elevated px-3 py-1.5 rounded-lg border border-border-subtle font-medium"
            >
              Verify on Official Portal
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </Modal>
  );
}
