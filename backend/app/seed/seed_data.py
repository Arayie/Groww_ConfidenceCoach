"""
Seed data script for GROWWW SIP Confidence Coach.
Idempotent: running multiple times will not duplicate records.
"""

from sqlalchemy.orm import Session
from app.models.faq import FAQ
from app.models.learning import LearningModule, LearningLesson
from app.models.journey import JourneyStage
from app.models.glossary import GlossaryTerm
from app.models.source import KnowledgeSource

SEED_FAQS = [
    {
        "display_order": 1,
        "question": "What is a SIP?",
        "answer": (
            "A SIP (Systematic Investment Plan) is a disciplined method of investing a fixed sum of money "
            "periodically into a mutual fund scheme, rather than investing all at once. It eliminates the need "
            "to time market highs and lows."
        ),
        "category": "Basics",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 2,
        "question": "How does a SIP work?",
        "answer": (
            "On your chosen date each month, your designated bank account is automatically debited via an e-mandate. "
            "The mutual fund scheme receives the money and allots units to you based on the day's applicable NAV (Net Asset Value)."
        ),
        "category": "Mechanics",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 3,
        "question": "Is SIP a mutual fund?",
        "answer": (
            "No. A mutual fund is the investment vehicle that pools capital into securities, while a SIP is merely "
            "the periodic payment mechanism or method used to invest into that fund."
        ),
        "category": "Basics",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 4,
        "question": "Can I lose money through SIPs?",
        "answer": (
            "Yes. Mutual funds invest in market-linked assets. If the market value of the scheme's underlying assets "
            "drops below your purchase price, your portfolio value can fall. SIP smooths acquisition costs over time but cannot eliminate market risk."
        ),
        "category": "Returns & Risk",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 5,
        "question": "What is NAV?",
        "answer": (
            "NAV stands for Net Asset Value. It represents the per-unit market value of a mutual fund scheme on any given "
            "business day, calculated after market close by subtracting liabilities from total assets and dividing by outstanding units."
        ),
        "category": "Mechanics",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 6,
        "question": "What are mutual-fund units?",
        "answer": (
            "Units represent your proportional fraction of ownership in the total assets and holdings of the mutual fund scheme. "
            "Units allotted = Amount invested ÷ Applicable NAV."
        ),
        "category": "Basics",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 7,
        "question": "What happens after I register a SIP?",
        "answer": (
            "Your bank mandate is verified by NPCI and your destination bank. Your scheduled instalment date is queued, and "
            "you receive an electronic pre-debit alert 24-48 hours before each scheduled deduction as mandated by the RBI."
        ),
        "category": "Operations",
        "difficulty_level": "Intermediate",
    },
    {
        "display_order": 8,
        "question": "What is a bank mandate?",
        "answer": (
            "A bank mandate (e-mandate or NACH) is a formal electronic standing authorization you grant your bank allowing "
            "the mutual fund to debit your agreed SIP amount automatically on scheduled dates without requiring a manual OTP each month."
        ),
        "category": "Operations",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 9,
        "question": "Why can a SIP instalment fail?",
        "answer": (
            "Common causes include insufficient balance in your bank account, an expired or cancelled mandate, technical banking timeouts, "
            "or daily transaction limits. Mutual funds do not penalize you for missed instalments, though your bank may charge a bounce fee."
        ),
        "category": "Operations",
        "difficulty_level": "Intermediate",
    },
    {
        "display_order": 10,
        "question": "Can SIP returns be negative?",
        "answer": (
            "Yes, especially during market downturns or in early investment horizons. Market-linked investments carry no floor protections "
            "or legally assured returns."
        ),
        "category": "Returns & Risk",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 11,
        "question": "What is rupee-cost averaging?",
        "answer": (
            "It is the mathematical outcome of investing a fixed rupee amount regularly. Because the investment sum remains constant, "
            "you automatically buy more units when NAV is low and fewer units when NAV is high, smoothing out your average purchase price."
        ),
        "category": "Mechanics",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 12,
        "question": "Can I pause or cancel a SIP?",
        "answer": (
            "Yes. Mutual fund SIPs are completely flexible. You can pause instalments for 1 to 6 months or cancel the SIP entirely. "
            "Cancelling a SIP stops future deductions; your existing units remain invested until you decide to redeem them."
        ),
        "category": "Operations",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 13,
        "question": "What are expense ratios?",
        "answer": (
            "The Total Expense Ratio (TER) is the annual percentage of fund assets charged by the AMC to cover management fees, administration, "
            "and distribution. SEBI caps TER by scheme size. Daily published NAV is already net of the expense ratio."
        ),
        "category": "Costs & Documents",
        "difficulty_level": "Intermediate",
    },
    {
        "display_order": 14,
        "question": "What is a Risk-o-meter?",
        "answer": (
            "A standardized visual gauge mandated by SEBI that depicts the risk level of a mutual fund scheme across six tiers: "
            "Low, Low to Moderate, Moderate, Moderately High, High, and Very High. It is updated monthly based on actual portfolio holdings."
        ),
        "category": "Returns & Risk",
        "difficulty_level": "Beginner",
    },
    {
        "display_order": 15,
        "question": "How are mutual funds taxed?",
        "answer": (
            "Under Indian tax law, equity funds held over 12 months incur Long Term Capital Gains (LTCG) taxed at 12.5% on gains over ₹1.25 Lakh/year. "
            "Held for 12 months or less, Short Term Capital Gains (STCG) are taxed at 20%. Each SIP instalment has its own individual holding period."
        ),
        "category": "Tax & Regulations",
        "difficulty_level": "Intermediate",
    },
]

SEED_MODULES = [
    {
        "display_order": 1,
        "title": "Understanding Money and Investing",
        "slug": "understanding-money-and-investing",
        "description": "Explore foundational personal finance concepts: inflation, compounding, risk vs. return, and the difference between saving and investing.",
        "category": "Fundamentals",
        "difficulty_level": "Beginner",
        "estimated_minutes": 8,
        "lessons": [
            {
                "title": "Saving vs. Investing & The Inflation Drag",
                "slug": "saving-vs-investing",
                "content": (
                    "# Saving vs. Investing\n\nSaving preserves liquidity, while investing deploys capital into assets to outpace inflation. "
                    "At 6% annual inflation, money stored in a zero-interest locker loses half its purchasing power in roughly 12 years."
                ),
                "display_order": 1,
                "estimated_minutes": 4,
            },
            {
                "title": "The Compounding Multiplier & Time Horizons",
                "slug": "compounding-multiplier",
                "content": (
                    "# The Power of Compounding\n\nCompounding occurs when your returns generate their own returns. "
                    "The longer your capital remains invested, the steeper the exponential curve becomes."
                ),
                "display_order": 2,
                "estimated_minutes": 4,
            },
        ],
    },
    {
        "display_order": 2,
        "title": "Mutual Fund Fundamentals",
        "slug": "mutual-fund-fundamentals",
        "description": "Understand what mutual funds are, how pooling works, the role of AMCs and trustees, and essential scheme documents like SID and KIM.",
        "category": "Fundamentals",
        "difficulty_level": "Beginner",
        "estimated_minutes": 10,
        "lessons": [
            {
                "title": "The Collective Investment Vehicle & Trust Structure",
                "slug": "trust-structure",
                "content": (
                    "# How Mutual Funds Work\n\nThousands of investors pool funds into a trust overseen by independent trustees. "
                    "The trust appoints an Asset Management Company (AMC) to research and manage investments under SEBI supervision."
                ),
                "display_order": 1,
                "estimated_minutes": 5,
            },
            {
                "title": "Reading SID, KIM, and Monthly Factsheets",
                "slug": "scheme-documents",
                "content": (
                    "# Scheme Information Documents\n\nThe SID details investment objectives, asset allocation limits, and risk factors. "
                    "The KIM summarizes crucial clauses for retail investors."
                ),
                "display_order": 2,
                "estimated_minutes": 5,
            },
        ],
    },
    {
        "display_order": 3,
        "title": "SIP Basics",
        "slug": "sip-basics",
        "description": "Learn what a Systematic Investment Plan is, how frequency and tenure work, when to choose SIP vs lump-sum, and how step-up SIPs function.",
        "category": "Mechanics",
        "difficulty_level": "Beginner",
        "estimated_minutes": 7,
        "lessons": [
            {
                "title": "Automated Dollar-Cost Averaging",
                "slug": "automated-disciplined-investing",
                "content": (
                    "# What is a SIP?\n\nSIP is an automated recurring debit facility. It eliminates the emotional trap of trying to predict market peaks and troughs."
                ),
                "display_order": 1,
                "estimated_minutes": 4,
            },
            {
                "title": "SIP vs Lump Sum & Step-Up SIPs",
                "slug": "sip-vs-lumpsum",
                "content": (
                    "# Comparing Investment Routes\n\nLump-sum investing deploys all capital at once, exposing it to entry-point timing risk. "
                    "Step-up SIPs automatically increase your contribution by 5% or 10% annually as your income expands."
                ),
                "display_order": 2,
                "estimated_minutes": 3,
            },
        ],
    },
    {
        "display_order": 4,
        "title": "How SIPs Actually Work",
        "slug": "how-sips-actually-work",
        "description": "A deep dive into the technical lifecycle: KYC verification, bank mandate authentication, clearing systems, NAV allocation, and account statements.",
        "category": "Operations",
        "difficulty_level": "Intermediate",
        "estimated_minutes": 12,
        "lessons": [
            {
                "title": "Bank Mandates, NPCI & Pre-Debit Alerts",
                "slug": "mandate-and-clearing",
                "content": (
                    "# The Mandate Lifecycle\n\nWhen registering a SIP, you authorize an e-mandate via NPCI UPI AutoPay or e-NACH. "
                    "RBI mandates that banks send a pre-debit alert at least 24 hours prior to deducting funds."
                ),
                "display_order": 1,
                "estimated_minutes": 6,
            },
            {
                "title": "Realization of Funds & Unit Allotment",
                "slug": "fund-realization-rules",
                "content": (
                    "# Allotment Mechanics\n\nUnder SEBI guidelines, units are allotted only after money reaches the AMC's account before cut-off time, "
                    "not at the exact second the bank debit occurs."
                ),
                "display_order": 2,
                "estimated_minutes": 6,
            },
        ],
    },
    {
        "display_order": 5,
        "title": "NAV and Units",
        "slug": "nav-and-units",
        "description": "Master the math behind Net Asset Value: how units are calculated, why NAV changes every day, and how cut-off timings dictate your allotment price.",
        "category": "Mechanics",
        "difficulty_level": "Beginner",
        "estimated_minutes": 9,
        "lessons": [
            {
                "title": "Demystifying Net Asset Value",
                "slug": "nav-calculation",
                "content": (
                    "# Net Asset Value\n\nNAV = (Assets − Liabilities) ÷ Units. A lower NAV does not make a fund 'cheaper'. "
                    "A fund with ₹20 NAV and a fund with ₹200 NAV both grow at identical rates if their underlying portfolios gain 10%."
                ),
                "display_order": 1,
                "estimated_minutes": 5,
            },
        ],
    },
    {
        "display_order": 6,
        "title": "Understanding Returns and Risk",
        "slug": "understanding-returns-and-risk",
        "description": "Demystify mutual fund performance metrics: Absolute return, CAGR, XIRR, drawdown, volatility, and how to read the SEBI Risk-o-meter.",
        "category": "Returns & Risk",
        "difficulty_level": "Intermediate",
        "estimated_minutes": 11,
        "lessons": [
            {
                "title": "CAGR vs. XIRR for Multiple Cash Flows",
                "slug": "xirr-explained",
                "content": (
                    "# Measuring SIP Returns\n\nCAGR is suitable for single lump sums. For multiple cash flows on different dates, "
                    "XIRR (Extended Internal Rate of Return) is the only mathematically sound metric."
                ),
                "display_order": 1,
                "estimated_minutes": 6,
            },
        ],
    },
    {
        "display_order": 7,
        "title": "Charges, Costs and Documents",
        "slug": "charges-costs-and-documents",
        "description": "Learn about the costs of investing: Total Expense Ratio (TER), Exit Loads, stamp duty, and the difference between Direct and Regular plans.",
        "category": "Costs & Documents",
        "difficulty_level": "Intermediate",
        "estimated_minutes": 10,
        "lessons": [
            {
                "title": "Direct Plans vs Regular Plans & TER",
                "slug": "direct-vs-regular",
                "content": (
                    "# The Impact of Fees\n\nDirect plans do not pay recurring distributor commissions, reducing TER by 0.5%–1.0% annually. "
                    "Over 15–20 years, this difference compounds into substantial wealth preservation."
                ),
                "display_order": 1,
                "estimated_minutes": 5,
            },
        ],
    },
    {
        "display_order": 8,
        "title": "SIP Management",
        "slug": "sip-management",
        "description": "Take control of your active SIPs: managing bank mandates, handling failed debits, pausing or stopping SIPs, and redeeming accumulated units.",
        "category": "Operations",
        "difficulty_level": "Beginner",
        "estimated_minutes": 8,
        "lessons": [
            {
                "title": "Pausing, Modifying & Cancelling Safely",
                "slug": "pause-modify-cancel",
                "content": (
                    "# Managing Active SIPs\n\nIf you face a temporary liquidity crunch, you can pause your SIP for a few months. "
                    "Units already acquired remain intact in your folio and continue compounding."
                ),
                "display_order": 1,
                "estimated_minutes": 4,
            },
        ],
    },
    {
        "display_order": 9,
        "title": "Tax Awareness",
        "slug": "tax-awareness",
        "description": "Essential tax concepts: Long-Term vs Short-Term Capital Gains, equity vs debt fund treatment, and how each SIP instalment is tracked separately.",
        "category": "Tax & Regulations",
        "difficulty_level": "Intermediate",
        "estimated_minutes": 10,
        "lessons": [
            {
                "title": "First-In, First-Out (FIFO) & Holding Periods",
                "slug": "capital-gains-tax-rules",
                "content": (
                    "# Taxation of Mutual Funds\n\nEvery SIP instalment has its own individual start date. "
                    "When redeeming, units purchased earliest are redeemed first under the statutory FIFO convention."
                ),
                "display_order": 1,
                "estimated_minutes": 5,
            },
        ],
    },
    {
        "display_order": 10,
        "title": "Investor Safety",
        "slug": "investor-safety",
        "description": "Protect your financial wellbeing: spotting unapproved schemes, avoiding guaranteed return claims, credential protection, and regulatory verification.",
        "category": "Investor Protection",
        "difficulty_level": "Beginner",
        "estimated_minutes": 9,
        "lessons": [
            {
                "title": "Fraud Red Flags & Official Redressal (SCORES)",
                "slug": "fraud-warning-signs",
                "content": (
                    "# Protecting Your Money\n\nAny entity guaranteeing fixed returns on equity mutual funds is fraudulent. "
                    "Always verify intermediary registration on the SEBI portal and use SCORES / SMART ODR for grievances."
                ),
                "display_order": 1,
                "estimated_minutes": 5,
            },
        ],
    },
]

SEED_JOURNEY_STAGES = [
    {
        "stage_number": 1,
        "title": "1. Understanding SIPs",
        "description": "Define goals, choose frequency, and pick scheme category.",
        "detailed_explanation": (
            "Before initiating an investment, the investor chooses the scheme category (equity, debt, hybrid), "
            "determines a comfortable recurring amount, and selects a monthly debit date. SIP is an automated route, not a separate asset class."
        ),
        "display_order": 1,
    },
    {
        "stage_number": 2,
        "title": "2. General KYC Information",
        "description": "One-time identity verification through SEBI-registered KRAs.",
        "detailed_explanation": (
            "Know Your Customer (KYC) is a mandatory one-time verification under PMLA regulations. "
            "Submitting PAN, Aadhaar-based verification, and in-person verification (IPV) grants 'KYC Compliant' status valid across all Indian mutual fund houses."
        ),
        "display_order": 2,
    },
    {
        "stage_number": 3,
        "title": "3. Bank Mandate Registration",
        "description": "Setting up automated debits via UPI AutoPay or e-NACH.",
        "detailed_explanation": (
            "You grant a standing electronic authorization to your bank. A Unique Mandate Reference Number (UMRN) "
            "is generated by NPCI, enabling recurring debits without requiring manual OTP confirmation each cycle."
        ),
        "display_order": 3,
    },
    {
        "stage_number": 4,
        "title": "4. Instalment Initiation",
        "description": "Pre-debit alert and queuing of scheduled payment.",
        "detailed_explanation": (
            "Under RBI directions, the bank sends an advance SMS/email alert 24 to 48 hours prior to debit, "
            "confirming the scheduled amount and allowing the user to ensure sufficient cleared funds exist."
        ),
        "display_order": 4,
    },
    {
        "stage_number": 5,
        "title": "5. Payment Processing",
        "description": "Debit from bank account and interbank clearing.",
        "detailed_explanation": (
            "On the scheduled instalment date, your account is debited. Funds are routed via NACH / NPCI clearing "
            "to the mutual fund scheme's collection account."
        ),
        "display_order": 5,
    },
    {
        "stage_number": 6,
        "title": "6. NAV Application & Unit Allotment",
        "description": "Applying the official day's NAV and computing units.",
        "detailed_explanation": (
            "Once funds reach the AMC's bank account before statutory cut-off time, the AMC allots units "
            "using the closing NAV of that business day: Units = Amount ÷ Applicable NAV."
        ),
        "display_order": 6,
    },
    {
        "stage_number": 7,
        "title": "7. Investment Statement Reflection",
        "description": "Folio update, SMS/Email confirmation, and CAS synchronization.",
        "detailed_explanation": (
            "The Registrar and Transfer Agent (RTA) updates your folio. You receive an allotment confirmation, "
            "and holdings synchronize into your monthly Consolidated Account Statement (CAS)."
        ),
        "display_order": 7,
    },
]

SEED_GLOSSARY_TERMS = [
    {
        "term": "SIP",
        "slug": "sip",
        "category": "Fundamentals",
        "definition": "A systematic method of investing a fixed predetermined amount of money at regular intervals into a mutual fund scheme.",
        "related_terms": "Rupee-Cost Averaging, Lump Sum, Step-Up SIP",
    },
    {
        "term": "NAV",
        "slug": "nav",
        "category": "Fundamentals",
        "definition": "Net Asset Value: The per-unit market value of a mutual fund scheme on a given day.",
        "related_terms": "Units, Cut-off Time, AUM",
    },
    {
        "term": "AMC",
        "slug": "amc",
        "category": "Fundamentals",
        "definition": "Asset Management Company: The SEBI-registered legal entity that manages the mutual fund schemes.",
        "related_terms": "Trustees, Fund Manager, Sponsor",
    },
    {
        "term": "AUM",
        "slug": "aum",
        "category": "Metrics & Returns",
        "definition": "Assets Under Management: Total market value of all investments held by a fund scheme or fund house.",
        "related_terms": "TER, Portfolio, Net Inflows",
    },
    {
        "term": "TER",
        "slug": "ter",
        "category": "Costs & Documents",
        "definition": "Total Expense Ratio: The annual percentage of fund assets charged by the AMC to cover operational and management fees.",
        "related_terms": "Expense Ratio, Direct Plan, Regular Plan",
    },
    {
        "term": "Exit Load",
        "slug": "exit-load",
        "category": "Costs & Documents",
        "definition": "A fee or percentage penalty charged by the mutual fund if an investor redeems units before a specified holding period.",
        "related_terms": "Redemption, Lock-in, TER",
    },
    {
        "term": "Units",
        "slug": "units",
        "category": "Fundamentals",
        "definition": "Fractional shares of ownership in a mutual fund scheme allotted in proportion to the capital invested.",
        "related_terms": "NAV, Folio, Allotment",
    },
    {
        "term": "KYC",
        "slug": "kyc",
        "category": "Operations & Banking",
        "definition": "Know Your Customer: A mandatory one-time identity and address verification required by SEBI before investing in Indian securities.",
        "related_terms": "CKYC, KRA, PAN Verification",
    },
    {
        "term": "Folio",
        "slug": "folio",
        "category": "Operations & Banking",
        "definition": "A unique account number assigned by an AMC to identify an investor's holdings within that fund house.",
        "related_terms": "Account Statement, CAS, RTA",
    },
    {
        "term": "Mandate",
        "slug": "mandate",
        "category": "Operations & Banking",
        "definition": "An electronic standing instruction (e-mandate / NACH / UPI AutoPay) authorizing recurring automated debits for SIP instalments.",
        "related_terms": "UMRN, Pre-Debit Alert, NPCI",
    },
    {
        "term": "CAGR",
        "slug": "cagr",
        "category": "Metrics & Returns",
        "definition": "Compound Annual Growth Rate: Annualized geometric growth rate of an investment over a multi-year period for a single point-to-point investment.",
        "related_terms": "XIRR, Absolute Return, Compounding",
    },
    {
        "term": "XIRR",
        "slug": "xirr",
        "category": "Metrics & Returns",
        "definition": "Extended Internal Rate of Return: The annualized rate of return across multiple staggered cash flows on different calendar dates.",
        "related_terms": "CAGR, SIP Returns, Cash Flow",
    },
    {
        "term": "Risk-o-meter",
        "slug": "risk-o-meter",
        "category": "Investor Protection",
        "definition": "A 6-level visual gauge mandated by SEBI indicating scheme portfolio risk from Low to Very High.",
        "related_terms": "Volatility, Drawdown, Scheme Information Document",
    },
    {
        "term": "Expense Ratio",
        "slug": "expense-ratio",
        "category": "Costs & Documents",
        "definition": "The operating cost of running a mutual fund, accrued daily and deducted from the NAV.",
        "related_terms": "TER, Management Fee, Direct Plan",
    },
    {
        "term": "Cut-off Time",
        "slug": "cut-off-time",
        "category": "Operations & Banking",
        "definition": "The statutory deadline on a business day by which investment orders and fund realization must occur for same-day NAV applicability.",
        "related_terms": "Applicable NAV, Realization, Business Day",
    },
    {
        "term": "Direct Plan",
        "slug": "direct-plan",
        "category": "Costs & Documents",
        "definition": "A mutual fund plan purchased without an intermediary distributor, with zero distributor commissions and a lower expense ratio.",
        "related_terms": "Regular Plan, TER, Distributor Commission",
    },
    {
        "term": "Regular Plan",
        "slug": "regular-plan",
        "category": "Costs & Documents",
        "definition": "A mutual fund plan purchased through an intermediary distributor or broker who receives ongoing trail commission paid from fund assets.",
        "related_terms": "Direct Plan, Distributor, Trail Commission",
    },
    {
        "term": "CKYC",
        "slug": "ckyc",
        "category": "Operations & Banking",
        "definition": "Central KYC: A centralized registry of KYC records for customers across the entire financial services sector in India.",
        "related_terms": "KYC, KRA, CERSAI",
    },
    {
        "term": "Step-Up SIP",
        "slug": "step-up-sip",
        "category": "Fundamentals",
        "definition": "A feature that automatically increments your recurring SIP instalment amount by a fixed amount or percentage at scheduled intervals (e.g., yearly).",
        "related_terms": "SIP, Top-Up, Compounding",
    },
    {
        "term": "Redemption",
        "slug": "redemption",
        "category": "Operations & Banking",
        "definition": "The process of selling or withdrawing mutual fund units back to the fund house in exchange for cash credited to your registered bank account.",
        "related_terms": "Exit Load, Settlement, T+1 Cycle",
    },
]

SEED_SOURCES = [
    {
        "organisation": "SEBI",
        "source_title": "SEBI Investor Portal — Mutual Fund Fundamentals & Investor Charter",
        "source_url": "https://investor.sebi.gov.in/understanding_mf.html",
        "source_type": "regulatory_portal",
        "publication_date": "2026",
        "verification_status": "pending_official_review_phase3",
    },
    {
        "organisation": "AMFI",
        "source_title": "AMFI Investor Education — Systematic Investment Plans & NAV Rules",
        "source_url": "https://www.amfiindia.com/investor/knowledge-center-info?zoneName=NetAssetValueNAV",
        "source_type": "industry_association",
        "publication_date": "2026",
        "verification_status": "pending_official_review_phase3",
    },
    {
        "organisation": "RBI",
        "source_title": "RBI Master Directions on Recurring Payment Mandates & Processing",
        "source_url": "https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=13374",
        "source_type": "statutory_direction",
        "publication_date": "2026",
        "verification_status": "pending_official_review_phase3",
    },
    {
        "organisation": "NPCI",
        "source_title": "NPCI NACH & UPI AutoPay Operational Framework",
        "source_url": "https://www.npci.org.in",
        "source_type": "payment_framework",
        "publication_date": "2026",
        "verification_status": "pending_official_review_phase3",
    },
    {
        "organisation": "Income Tax Department",
        "source_title": "Income Tax Provisions Relating to Capital Gains on Mutual Funds",
        "source_url": "https://incometaxindia.gov.in",
        "source_type": "statutory_act",
        "publication_date": "2026",
        "verification_status": "pending_official_review_phase3",
    },
]


def seed_all_data(db: Session) -> dict:
    """
    Idempotent seeding function.
    Safely seeds FAQs, learning modules, journey stages, glossary terms, and knowledge sources.
    """
    counts = {"faqs": 0, "modules": 0, "lessons": 0, "journey": 0, "glossary": 0, "sources": 0}

    # 1. Seed FAQs
    for faq_data in SEED_FAQS:
        existing = db.query(FAQ).filter(FAQ.question == faq_data["question"]).first()
        if not existing:
            faq = FAQ(**faq_data)
            db.add(faq)
            counts["faqs"] += 1
        else:
            # Update fields to match latest seed content
            existing.answer = faq_data["answer"]
            existing.category = faq_data["category"]
            existing.difficulty_level = faq_data["difficulty_level"]
            existing.display_order = faq_data["display_order"]

    # 2. Seed Modules & Lessons
    for mod_data in SEED_MODULES:
        lessons_data = mod_data.pop("lessons", [])
        existing_mod = db.query(LearningModule).filter(LearningModule.slug == mod_data["slug"]).first()
        if not existing_mod:
            mod = LearningModule(**mod_data)
            db.add(mod)
            db.flush()
            counts["modules"] += 1
            mod_id = mod.id
        else:
            existing_mod.title = mod_data["title"]
            existing_mod.description = mod_data["description"]
            existing_mod.category = mod_data["category"]
            existing_mod.difficulty_level = mod_data["difficulty_level"]
            existing_mod.estimated_minutes = mod_data["estimated_minutes"]
            existing_mod.display_order = mod_data["display_order"]
            mod_id = existing_mod.id

        # Seed lessons for this module
        for lesson_data in lessons_data:
            existing_lesson = (
                db.query(LearningLesson)
                .filter(
                    LearningLesson.module_id == mod_id,
                    LearningLesson.slug == lesson_data["slug"],
                )
                .first()
            )
            if not existing_lesson:
                lesson = LearningLesson(module_id=mod_id, **lesson_data)
                db.add(lesson)
                counts["lessons"] += 1
            else:
                existing_lesson.title = lesson_data["title"]
                existing_lesson.content = lesson_data["content"]
                existing_lesson.estimated_minutes = lesson_data["estimated_minutes"]

        # Restore lessons list to mod_data for re-use if needed
        mod_data["lessons"] = lessons_data

    # 3. Seed Journey Stages
    for stage_data in SEED_JOURNEY_STAGES:
        existing_stage = (
            db.query(JourneyStage)
            .filter(JourneyStage.stage_number == stage_data["stage_number"])
            .first()
        )
        if not existing_stage:
            stage = JourneyStage(**stage_data)
            db.add(stage)
            counts["journey"] += 1
        else:
            existing_stage.title = stage_data["title"]
            existing_stage.description = stage_data["description"]
            existing_stage.detailed_explanation = stage_data["detailed_explanation"]
            existing_stage.display_order = stage_data["display_order"]

    # 4. Seed Glossary Terms
    for term_data in SEED_GLOSSARY_TERMS:
        existing_term = (
            db.query(GlossaryTerm)
            .filter(GlossaryTerm.slug == term_data["slug"])
            .first()
        )
        if not existing_term:
            term = GlossaryTerm(**term_data)
            db.add(term)
            counts["glossary"] += 1
        else:
            existing_term.term = term_data["term"]
            existing_term.definition = term_data["definition"]
            existing_term.category = term_data["category"]
            existing_term.related_terms = term_data["related_terms"]

    # 5. Seed Knowledge Sources
    for src_data in SEED_SOURCES:
        existing_src = (
            db.query(KnowledgeSource)
            .filter(KnowledgeSource.source_title == src_data["source_title"])
            .first()
        )
        if not existing_src:
            src = KnowledgeSource(**src_data)
            db.add(src)
            counts["sources"] += 1
        else:
            existing_src.source_url = src_data["source_url"]
            existing_src.organisation = src_data["organisation"]

    db.commit()
    return counts
