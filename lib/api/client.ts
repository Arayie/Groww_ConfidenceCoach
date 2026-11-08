import { FAQS_DATA } from "../constants/faqs";
import { LEARNING_MODULES } from "../constants/modules";
import { GLOSSARY_TERMS } from "../constants/glossaryTerms";
import { OFFICIAL_SOURCES } from "../constants/sources";
import { FaqItem, LearningModule, GlossaryEntry, SourceCitation } from "../types";

/**
 * Backend API Client Interface
 * Prepared for the future FastAPI backend on Render.
 * In Phase 1 (Frontend Foundation), this layer returns verified local mock datasets
 * without external network dependencies, ensuring backend independence.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface ApiResponse<T> {
  data: T;
  source: "local_mock_phase1" | "fastapi_backend";
  status: "success" | "error";
  message?: string;
}

export const apiClient = {
  // Health check
  async getHealth(): Promise<{ status: string; environment: string; version: string }> {
    return {
      status: "healthy (frontend mock mode)",
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0-phase1",
    };
  },

  // FAQs
  async getFaqs(): Promise<ApiResponse<FaqItem[]>> {
    return {
      data: FAQS_DATA,
      source: "local_mock_phase1",
      status: "success",
    };
  },

  // Lessons
  async getLessons(): Promise<ApiResponse<LearningModule[]>> {
    return {
      data: LEARNING_MODULES,
      source: "local_mock_phase1",
      status: "success",
    };
  },

  async getLessonBySlug(slug: string): Promise<ApiResponse<LearningModule | null>> {
    const lesson = LEARNING_MODULES.find((m) => m.slug === slug) || null;
    return {
      data: lesson,
      source: "local_mock_phase1",
      status: lesson ? "success" : "error",
      message: lesson ? undefined : `Lesson with slug ${slug} not found`,
    };
  },

  // Glossary
  async getGlossary(searchTerm = ""): Promise<ApiResponse<GlossaryEntry[]>> {
    const term = searchTerm.toLowerCase().trim();
    const filtered = term
      ? GLOSSARY_TERMS.filter(
          (item) =>
            item.term.toLowerCase().includes(term) ||
            item.fullForm?.toLowerCase().includes(term) ||
            item.definition.toLowerCase().includes(term)
        )
      : GLOSSARY_TERMS;

    return {
      data: filtered,
      source: "local_mock_phase1",
      status: "success",
    };
  },

  // Source details
  async getSourceById(id: string): Promise<ApiResponse<SourceCitation | null>> {
    const source = Object.values(OFFICIAL_SOURCES).find((s) => s.id === id) || null;
    return {
      data: source,
      source: "local_mock_phase1",
      status: source ? "success" : "error",
    };
  },
};
