export type SkillLevel = "Beginner" | "Intermediate" | "All Levels";

export interface SourceCitation {
  id: string;
  title: string;
  authority: string; // e.g. "SEBI", "AMFI", "RBI", "NPCI"
  canonicalUrl: string;
  section?: string;
  lastCheckedDate: string;
  whyThisSource?: string;
}

export interface FaqItem {
  id: string;
  order: number;
  question: string;
  shortAnswer: string;
  fullExplanation: string;
  category: "Basics" | "Mechanics" | "Returns & Risk" | "Operations" | "Costs & Documents" | "Tax & Regulations";
  sources: SourceCitation[];
  status: "verified" | "awaiting_review";
  lastReviewedAt: string;
}

export interface LearningModule {
  id: string;
  moduleNumber: number;
  title: string;
  slug: string;
  description: string;
  level: "Beginner" | "Intermediate";
  estimatedMinutes: number;
  topics: string[];
  keyTakeaways: string[];
  status: "awaiting_official_review" | "draft" | "published";
  version: string;
  lastReviewedAt: string;
  contentMarkdown?: string;
  primaryAuthority: string;
  referenceUrl: string;
}

export interface JourneyStage {
  stageNumber: number;
  id: string;
  title: string;
  subtitle: string;
  stageBadge: string;
  summary: string;
  detailedProcess: string[];
  whatHappensBehindTheScenes: string;
  commonBeginnerConfusion: string;
  officialGuidelineNote: string;
  authoritativeSource: SourceCitation;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  fullForm?: string;
  category: "Fundamentals" | "Metrics & Returns" | "Operations & Banking" | "Costs & Documents" | "Investor Protection";
  definition: string;
  practicalExample?: string;
  keyRuleOrGuideline?: string;
  authority: string;
  officialReferenceUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: SourceCitation[];
  isRefusal?: boolean;
  refusalReason?: string;
}

export interface FeedbackSubmission {
  page: string;
  feedback_type: "clarity" | "suggestion" | "bug" | "content" | "general";
  feedback_text: string;
  rating?: number;
  session_id?: string;
}

export interface BackendFaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty_level: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BackendLearningModule {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty_level: string;
  estimated_minutes: number;
  display_order: number;
  is_published: boolean;
  lessons_count: number;
  created_at: string;
}

export interface BackendJourneyStage {
  id: number;
  stage_number: number;
  title: string;
  description: string;
  detailed_explanation: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export interface BackendGlossaryTerm {
  id: number;
  term: string;
  slug: string;
  definition: string;
  category: string;
  related_terms?: string;
  is_published: boolean;
  created_at: string;
}
