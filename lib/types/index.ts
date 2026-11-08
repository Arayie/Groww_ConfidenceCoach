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
