# GROWWW SIP Confidence Coach — Phase 1 Frontend Foundation

An educational web application designed for young adults aged 20–28 who want to start investing through Systematic Investment Plans (SIPs) but have limited practical knowledge and confidence.

> **Statutory Notice & Product Positioning**  
> GROWWW SIP Confidence Coach is an **independent educational prototype**. It is **not** a broker, distributor, investment adviser, portfolio manager, or transaction platform. It never provides stock/fund recommendations, buy/sell/hold opinions, or transaction execution. All educational answers and calculator conventions cite official Indian financial authorities (**SEBI**, **AMFI**, **RBI**, **NPCI**).

---

## 1. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark navy palette & Groww teal accent
- **Icons**: Lucide React
- **Architecture**: Modular, responsive, accessibility-first component architecture
- **Deployment Target**: Vercel

---

## 2. Design System & Visual Direction

- **Background**: Deep dark navy (`#0B0F19`)
- **Card Surfaces**: Clean dark navy cards (`#131C2E`, elevated `#182338`) with subtle borders (`#1E293B`)
- **Accent Colour**: Groww signature teal (`#00D09C`, hover `#00B586`, subtle `rgba(0, 208, 156, 0.10)`)
- **Typography**: Clean, readable sans-serif typography with high-contrast text (`#F8FAFC`) and muted secondary labels (`#94A3B8`)
- **Minimalist Aesthetic**: Zero distracting banners, no FOMO or manipulative nudges, clean spacing, and minimal iconography.

---

## 3. Product Sections Implemented (Phase 1)

### A. Top Navigation (`components/layout/Navbar.tsx`)
- GROWWW logo and "SIP Confidence Coach" branding with an "Educational Prototype" pill.
- Responsive mobile drawer navigation with active route highlights.
- Working links for all 6 core destinations:
  - **Home** (`/`)
  - **Learn SIP** (`/learn`)
  - **SIP Journey** (`/journey`)
  - **Calculators** (`/calculators`)
  - **Ask AI** (`/ask`)
  - **Glossary** (`/glossary`)

### B. Homepage (`app/page.tsx`)
- **Hero Section**:
  - Headline: *"Understand SIPs. Invest with Confidence."*
  - Subheading: *"Learn how systematic investing works, understand the process and make informed financial decisions through education."*
  - Primary CTA: *"Start Learning"* (routes to `/learn`)
  - Secondary CTA: *"Explore SIP Calculator"* (routes to `/calculators`)
  - Three trust pillars: No Jargon, Official Sources Only, Strictly Educational.
- **"New to SIPs? Start Here." FAQ-First Experience**:
  - All **15 core beginner FAQs** curated with verified educational answers and official citations (SEBI, AMFI, RBI, IT Dept):
    1. What is a SIP?
    2. How does a SIP work?
    3. Is SIP a mutual fund?
    4. Can I lose money through SIPs?
    5. What is NAV?
    6. What are mutual-fund units?
    7. What happens after I register a SIP?
    8. What is a bank mandate?
    9. Why can a SIP instalment fail?
    10. Can SIP returns be negative?
    11. What is rupee-cost averaging?
    12. Can I pause or cancel a SIP?
    13. What are expense ratios?
    14. What is a Risk-o-meter?
    15. How are mutual funds taxed?
  - Accordion interaction with quick summaries, in-depth breakdowns, category filtering, search input, and clickable official source URLs.

### C. Learning Section (`app/learn/page.tsx`)
- 10 structured beginner-to-intermediate modules:
  1. *Understanding Money and Investing*
  2. *Mutual Fund Fundamentals*
  3. *SIP Basics*
  4. *How SIPs Actually Work*
  5. *NAV and Units*
  6. *Understanding Returns and Risk*
  7. *Charges, Costs and Documents*
  8. *SIP Management*
  9. *Tax Awareness*
  10. *Investor Safety*
- Card and modal reader interface (`components/learning/ModuleModal.tsx`) showing module level, estimated study duration, topic checklists, key learning outcomes, and primary statutory authority.

### D. SIP Journey Lifecycle (`app/journey/page.tsx`)
- Interactive step-by-step visual roadmap of the 7 stages:
  1. *Understanding SIPs*
  2. *General KYC Information*
  3. *Bank Mandate Registration*
  4. *Instalment Initiation*
  5. *Payment Processing*
  6. *NAV Application and Unit Allotment*
  7. *Investment Statement Reflection*
- Interactive stepper showing what happens behind the scenes (NPCI, bank clearing, RTAs, cut-off timings), common beginner misconceptions resolved, and statutory guidelines.

### E. Financial Calculators (`app/calculators/page.tsx`)
- 4 deterministic calculators:
  1. **SIP Future Value**: Calculates compound ordinary annuity projections with monthly compounding and start-of-month timing options. Handles $i=0$ zero-return scenarios.
  2. **Goal-Based SIP**: Computes the required monthly contribution to reach a hypothetical target amount.
  3. **Total Contribution Calculator**: Pure principal accumulator without market return assumptions.
  4. **Unit Allocation & Rupee-Cost Averaging Simulator**: Monthly NAV table and unit allotment demonstration ($Amount \div NAV$). Includes 3 market presets (Volatile, Deep Correction, Bull Market) proving why average acquisition cost is lower than peak market prices.
- Transparent formula breakdowns, slider and number inputs, strict boundary validation, and prominent regulatory risk disclosures.

### F. Ask AI Chat Interface (`app/ask/page.tsx`)
- Interactive preview of the SIP Confidence Coach interface.
- Suggested prompt pills.
- Grounded conversational layout displaying supporting official source citations (AMFI, SEBI) beneath responses.
- Interactive **Refusal Gate Test** demonstrating compliance: attempts to ask for stock/fund recommendations trigger the mandatory PRD refusal response without giving financial advice.
- Notice banner: *"GROWWW is an educational assistant. It does not provide investment advice or recommend stocks, mutual funds or securities."*

### G. Searchable Glossary (`app/glossary/page.tsx`)
- Comprehensive dictionary of essential investment terms: **SIP, NAV, AMC, AUM, TER, Exit Load, Units, KYC, Folio, Mandate, CAGR, XIRR, Risk-o-meter, Expense Ratio, Cut-off Time, Direct Plan**.
- Real-time search, category filtering, clear definition cards, practical examples, and links to official authorities.

---

## 4. File Structure

```
├── app/
│   ├── ask/
│   │   └── page.tsx              # Ask AI Coach page
│   ├── calculators/
│   │   └── page.tsx              # Financial calculators page
│   ├── glossary/
│   │   └── page.tsx              # Searchable glossary page
│   ├── journey/
│   │   └── page.tsx              # 7-stage visual SIP journey page
│   ├── learn/
│   │   └── page.tsx              # 10-module curriculum page
│   ├── globals.css               # Dark theme & Tailwind base
│   ├── layout.tsx                # Root shell with Navbar & Footer
│   └── page.tsx                  # FAQ-first Homepage
├── components/
│   ├── calculators/
│   │   ├── ContributionCalculator.tsx
│   │   ├── GoalSipCalculator.tsx
│   │   ├── SipFutureValueCalculator.tsx
│   │   └── UnitAllocationCalculator.tsx
│   ├── chat/
│   │   └── ChatInterface.tsx
│   ├── glossary/
│   │   └── GlossaryView.tsx
│   ├── home/
│   │   ├── FaqAccordion.tsx
│   │   ├── Hero.tsx
│   │   └── QuickNavigation.tsx
│   ├── journey/
│   │   └── JourneyView.tsx
│   ├── layout/
│   │   ├── DisclaimerBanner.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── learning/
│   │   ├── ModuleCard.tsx
│   │   └── ModuleModal.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Modal.tsx
├── lib/
│   ├── api/
│   │   └── client.ts             # Typed API integration layer (ready for FastAPI)
│   ├── constants/
│   │   ├── faqs.ts               # 15 core FAQs with official citations
│   │   ├── glossaryTerms.ts      # Curated terms & definitions
│   │   ├── journeySteps.ts       # 7 journey stages & operations
│   │   ├── modules.ts            # 10 learning curriculum modules
│   │   └── sources.ts            # Official regulatory source allowlist (SEBI, AMFI, RBI)
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── utils/
│       ├── cn.ts                 # Classname utility
│       └── formatters.ts         # INR, percentage & number formatters
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 5. Getting Started & Local Execution

### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v24)
- npm 9+

### Installation & Run

1. Clone or navigate to the repository directory:
   ```bash
   cd Coach
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. To build and test the production bundle:
   ```bash
   npm run build
   npm run start
   ```

---

## 6. Phase 1 Acceptance Criteria Checklist

- [x] Next.js App Router + TypeScript + Tailwind CSS configured cleanly.
- [x] Responsive layout with dark navy palette (`#0B0F19`), subtle borders, and Groww teal accents.
- [x] Responsive navigation bar with mobile toggle and active page indicators.
- [x] FAQ-first Homepage with hero copy and 15 beginner questions with official source attributions.
- [x] Learning landing page with 10 curriculum modules and interactive modal preview.
- [x] 7-Stage visual SIP Journey with interactive operational walkthrough.
- [x] 4 Deterministic calculators (SIP Future Value, Goal SIP, Contribution, Unit Allocation & Cost Averaging) with input validation and zero-return scenario handling.
- [x] Ask AI interface with grounded citations, suggested prompts, and compliance refusal gate demonstration.
- [x] Searchable glossary with all 14 required financial terms plus bonus entries.
- [x] Clean API client layer in `lib/api/client.ts` prepared for future FastAPI backend on Render.
- [x] Zero backend/database dependencies in Phase 1 (no Firebase, Supabase, or MongoDB).
- [x] Clean production build with zero TypeScript or compilation errors.
