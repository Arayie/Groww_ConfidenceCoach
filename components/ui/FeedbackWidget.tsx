"use client";

import React, { useState } from "react";
import { MessageSquarePlus, Star, CheckCircle2, X } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [feedbackType, setFeedbackType] = useState<"clarity" | "suggestion" | "bug" | "content">("clarity");
  const [rating, setRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);
    await apiClient.submitFeedback({
      page,
      feedback_type: feedbackType,
      feedback_text: feedbackText.trim(),
      rating,
    });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFeedbackText("");
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-groww transition-colors px-2.5 py-1 rounded-md bg-surface-card border border-border-subtle"
      >
        <MessageSquarePlus className="h-3.5 w-3.5 text-groww" />
        <span>Share Educational Feedback</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share Educational Feedback"
        subtitle="Help us improve SIP Confidence Coach for beginners"
        maxWidth="md"
      >
        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-groww mx-auto" />
            <h4 className="text-base font-semibold text-white">Thank You!</h4>
            <p className="text-xs text-slate-400">
              Your feedback has been recorded in our backend database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Section / Page
              </label>
              <select
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full bg-surface-elevated border border-border rounded-lg p-2 text-white focus:outline-none focus:border-groww"
              >
                <option value="home">Homepage &amp; FAQs</option>
                <option value="learn">Learning Modules</option>
                <option value="journey">SIP Journey Lifecycle</option>
                <option value="calculators">Financial Calculators</option>
                <option value="ask">Ask AI Coach</option>
                <option value="glossary">Glossary</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Feedback Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "clarity", label: "Concept Clarity" },
                  { id: "suggestion", label: "Suggestion" },
                  { id: "content", label: "Source / Content" },
                  { id: "bug", label: "Bug Report" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFeedbackType(t.id as any)}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      feedbackType === t.id
                        ? "bg-groww-subtle border-groww text-groww font-semibold"
                        : "bg-surface-elevated border-border text-slate-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Helpfulness Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Comments
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What was clear or what could be explained better?"
                rows={3}
                required
                className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-groww"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                isLoading={isSubmitting}
                disabled={!feedbackText.trim()}
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
