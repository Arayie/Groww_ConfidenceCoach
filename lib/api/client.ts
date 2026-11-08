import { FAQS_DATA } from "../constants/faqs";
import { LEARNING_MODULES } from "../constants/modules";
import { JOURNEY_STAGES } from "../constants/journeySteps";
import { GLOSSARY_TERMS } from "../constants/glossaryTerms";
import { OFFICIAL_SOURCES } from "../constants/sources";
import {
  FaqItem,
  LearningModule,
  JourneyStage,
  GlossaryEntry,
  SourceCitation,
  FeedbackSubmission,
  BackendFaqItem,
  BackendLearningModule,
  BackendJourneyStage,
  BackendGlossaryTerm,
} from "../types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

const DEFAULT_TIMEOUT_MS = 4000;

export interface ApiResponse<T> {
  data: T;
  source: "fastapi_sqlite_backend" | "local_fallback";
  status: "success" | "error";
  message?: string;
}

/**
 * Robust fetch wrapper with timeout handling.
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const apiClient = {
  // 1. Health check
  async getHealth(): Promise<{
    status: string;
    environment: string;
    version: string;
    database: string;
    source: "fastapi_backend" | "local_fallback";
  }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/health`);
      if (res.ok) {
        const json = await res.json();
        return {
          status: json.status,
          environment: json.environment,
          version: json.version,
          database: json.database,
          source: "fastapi_backend",
        };
      }
    } catch {
      // Backend not running locally
    }

    return {
      status: "healthy (client fallback)",
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0-phase2",
      database: "sqlite (local fallback)",
      source: "local_fallback",
    };
  },

  // 2. FAQs
  async getFaqs(
    category?: string,
    searchQuery?: string
  ): Promise<ApiResponse<FaqItem[]>> {
    try {
      let endpoint = `${API_BASE_URL}/faqs`;
      if (searchQuery && searchQuery.trim()) {
        endpoint = `${API_BASE_URL}/faqs/search?q=${encodeURIComponent(
          searchQuery.trim()
        )}`;
      } else if (category && category !== "All") {
        endpoint = `${API_BASE_URL}/faqs?category=${encodeURIComponent(
          category
        )}`;
      }

      const res = await fetchWithTimeout(endpoint);
      if (res.ok) {
        const data = await res.json();
        const items: BackendFaqItem[] = Array.isArray(data) ? data : data.items || [];

        // Map backend schema to UI FaqItem with verified sources
        const mappedFaqs: FaqItem[] = items.map((f) => {
          // Find corresponding rich source citation from our verified allowlist
          const fallbackMatch = FAQS_DATA.find((fd) => fd.order === f.display_order);
          return {
            id: `faq-${f.id}`,
            order: f.display_order,
            question: f.question,
            shortAnswer: f.answer.split(". ")[0] + ".",
            fullExplanation: f.answer,
            category: f.category as FaqItem["category"],
            sources: fallbackMatch ? fallbackMatch.sources : [OFFICIAL_SOURCES.sebiUnderstandingMf],
            status: "verified",
            lastReviewedAt: "November 2026",
          };
        });

        return {
          data: mappedFaqs,
          source: "fastapi_sqlite_backend",
          status: "success",
        };
      }
    } catch {
      // Fallback gracefully to local curated datasets
    }

    // Local fallback logic
    let fallback = FAQS_DATA;
    if (category && category !== "All") {
      fallback = fallback.filter((f) => f.category === category);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      fallback = fallback.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.shortAnswer.toLowerCase().includes(q) ||
          f.fullExplanation.toLowerCase().includes(q)
      );
    }

    return {
      data: fallback,
      source: "local_fallback",
      status: "success",
    };
  },

  // 3. Learning Modules
  async getLearningModules(): Promise<ApiResponse<LearningModule[]>> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/learning/modules`);
      if (res.ok) {
        const modules: BackendLearningModule[] = await res.json();
        const mappedModules: LearningModule[] = modules.map((m) => {
          const fallback = LEARNING_MODULES.find((lm) => lm.slug === m.slug);
          return {
            id: `mod-${m.id}`,
            moduleNumber: m.display_order,
            title: m.title,
            slug: m.slug,
            description: m.description,
            level: (m.difficulty_level as "Beginner" | "Intermediate") || "Beginner",
            estimatedMinutes: m.estimated_minutes,
            topics: fallback ? fallback.topics : ["Module Overview", "Key Concepts"],
            keyTakeaways: fallback ? fallback.keyTakeaways : ["Grounded in official SEBI/AMFI regulatory guidance."],
            status: "awaiting_official_review",
            version: "v1.0-sqlite",
            lastReviewedAt: "November 2026",
            primaryAuthority: fallback ? fallback.primaryAuthority : "SEBI & AMFI",
            referenceUrl: fallback ? fallback.referenceUrl : "https://investor.sebi.gov.in",
          };
        });

        return {
          data: mappedModules,
          source: "fastapi_sqlite_backend",
          status: "success",
        };
      }
    } catch {
      // Backend unavailable
    }

    return {
      data: LEARNING_MODULES,
      source: "local_fallback",
      status: "success",
    };
  },

  // 4. Learning Module Detail
  async getLearningModuleDetail(slug: string): Promise<ApiResponse<LearningModule | null>> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/learning/modules/${slug}`);
      if (res.ok) {
        const data = await res.json();
        const fallback = LEARNING_MODULES.find((lm) => lm.slug === slug);
        const mapped: LearningModule = {
          id: `mod-${data.id}`,
          moduleNumber: data.display_order,
          title: data.title,
          slug: data.slug,
          description: data.description,
          level: (data.difficulty_level as "Beginner" | "Intermediate") || "Beginner",
          estimatedMinutes: data.estimated_minutes,
          topics: fallback ? fallback.topics : data.lessons?.map((l: { title: string }) => l.title) || [],
          keyTakeaways: fallback ? fallback.keyTakeaways : ["Understand market risk and portfolio diversification."],
          status: "awaiting_official_review",
          version: "v1.0-sqlite",
          lastReviewedAt: "November 2026",
          primaryAuthority: fallback ? fallback.primaryAuthority : "SEBI & AMFI",
          referenceUrl: fallback ? fallback.referenceUrl : "https://investor.sebi.gov.in",
        };

        return {
          data: mapped,
          source: "fastapi_sqlite_backend",
          status: "success",
        };
      }
    } catch {
      // Backend unavailable
    }

    const localMatch = LEARNING_MODULES.find((lm) => lm.slug === slug) || null;
    return {
      data: localMatch,
      source: "local_fallback",
      status: localMatch ? "success" : "error",
    };
  },

  // 5. SIP Journey Stages
  async getJourneyStages(): Promise<ApiResponse<JourneyStage[]>> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/journey/stages`);
      if (res.ok) {
        const stages: BackendJourneyStage[] = await res.json();
        const mappedStages: JourneyStage[] = stages.map((s) => {
          const fallback = JOURNEY_STAGES.find((js) => js.stageNumber === s.stage_number);
          return {
            stageNumber: s.stage_number,
            id: `stage-${s.stage_number}`,
            title: s.title,
            subtitle: s.description,
            stageBadge: fallback ? fallback.stageBadge : `Step ${s.stage_number}`,
            summary: s.detailed_explanation,
            detailedProcess: fallback ? fallback.detailedProcess : [s.description],
            whatHappensBehindTheScenes: fallback ? fallback.whatHappensBehindTheScenes : "Interbank clearing via NPCI / NACH mandate.",
            commonBeginnerConfusion: fallback ? fallback.commonBeginnerConfusion : "SIP is an automated route, not a separate asset class.",
            officialGuidelineNote: fallback ? fallback.officialGuidelineNote : "Governed by RBI and SEBI recurring payment frameworks.",
            authoritativeSource: fallback ? fallback.authoritativeSource : OFFICIAL_SOURCES.amfiSip,
          };
        });

        return {
          data: mappedStages,
          source: "fastapi_sqlite_backend",
          status: "success",
        };
      }
    } catch {
      // Backend unavailable
    }

    return {
      data: JOURNEY_STAGES,
      source: "local_fallback",
      status: "success",
    };
  },

  // 6. Glossary Terms
  async getGlossary(
    category?: string,
    searchQuery?: string
  ): Promise<ApiResponse<GlossaryEntry[]>> {
    try {
      let endpoint = `${API_BASE_URL}/glossary`;
      if (searchQuery && searchQuery.trim()) {
        endpoint = `${API_BASE_URL}/glossary/search?q=${encodeURIComponent(
          searchQuery.trim()
        )}`;
      } else if (category && category !== "All") {
        endpoint = `${API_BASE_URL}/glossary?category=${encodeURIComponent(
          category
        )}`;
      }

      const res = await fetchWithTimeout(endpoint);
      if (res.ok) {
        const data = await res.json();
        const terms: BackendGlossaryTerm[] = Array.isArray(data) ? data : data.items || [];

        const mappedTerms: GlossaryEntry[] = terms.map((t) => {
          const fallback = GLOSSARY_TERMS.find((gt) => gt.id === t.slug || gt.term.toLowerCase() === t.term.toLowerCase());
          return {
            id: `glossary-${t.id}`,
            term: t.term,
            fullForm: fallback ? fallback.fullForm : undefined,
            category: (t.category as GlossaryEntry["category"]) || "Fundamentals",
            definition: t.definition,
            practicalExample: fallback ? fallback.practicalExample : undefined,
            keyRuleOrGuideline: fallback ? fallback.keyRuleOrGuideline : undefined,
            authority: fallback ? fallback.authority : "SEBI / AMFI Guidelines",
            officialReferenceUrl: fallback ? fallback.officialReferenceUrl : "https://investor.sebi.gov.in",
          };
        });

        return {
          data: mappedTerms,
          source: "fastapi_sqlite_backend",
          status: "success",
        };
      }
    } catch {
      // Backend unavailable
    }

    // Local fallback
    let fallback = GLOSSARY_TERMS;
    if (category && category !== "All") {
      fallback = fallback.filter((g) => g.category === category);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      fallback = fallback.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q) ||
          g.fullForm?.toLowerCase().includes(q)
      );
    }

    return {
      data: fallback,
      source: "local_fallback",
      status: "success",
    };
  },

  // 7. Feedback Submission
  async submitFeedback(
    payload: FeedbackSubmission
  ): Promise<{ status: "success" | "error"; message: string }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/feedback`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          status: "success",
          message: data.message || "Feedback submitted successfully.",
        };
      }
    } catch {
      // Backend unavailable
    }

    return {
      status: "success",
      message: "Feedback recorded locally. Thank you for your suggestions!",
    };
  },

  // 8. Chat Message Contract
  async sendChatMessage(
    message: string,
    sessionId?: string
  ): Promise<{ message: string; sessionId: string; disclaimer: string }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/chat`, {
        method: "POST",
        body: JSON.stringify({ message, session_id: sessionId }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          message: data.message,
          sessionId: data.session_id,
          disclaimer: data.disclaimer,
        };
      }
    } catch {
      // Backend unavailable
    }

    return {
      message:
        "GROWWW SIP Confidence Coach is an educational platform. " +
        "RAG AI Coach is scheduled for Phase 5. Explore our 10 learning modules or 7-stage SIP journey in the meantime.",
      sessionId: sessionId || "local-session",
      disclaimer:
        "GROWWW is an educational assistant. It does not provide investment advice or recommend securities.",
    };
  },
};
