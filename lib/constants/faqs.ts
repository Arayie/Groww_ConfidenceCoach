import { FaqItem } from "../types";
import { OFFICIAL_SOURCES } from "./sources";

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    order: 1,
    question: "What is a SIP?",
    shortAnswer:
      "A SIP (Systematic Investment Plan) is a disciplined method of investing a fixed sum of money periodically into a mutual fund scheme, rather than investing all at once.",
    fullExplanation:
      "A Systematic Investment Plan (SIP) is not an investment product in itself; rather, it is a disciplined facility offered by mutual funds. Through a SIP, an investor commits to investing a predetermined amount (for example, ₹500, ₹1,000, or more) at regular intervals—most commonly monthly—into an open-ended mutual fund scheme. This eliminates the need to time market highs and lows.",
    category: "Basics",
    sources: [OFFICIAL_SOURCES.amfiSip, OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-2",
    order: 2,
    question: "How does a SIP work?",
    shortAnswer:
      "On your chosen date each month, your designated bank account is automatically debited, and mutual fund units are allotted to you based on that day's applicable NAV.",
    fullExplanation:
      "When you set up a SIP, you authorize a recurring payment mandate (e-mandate or NACH) with your bank. On the scheduled SIP instalment date, your bank transfers the specified amount to the mutual fund's collection account. Once the funds are received and reconciled before the cut-off time, the Asset Management Company (AMC) allocates units of the selected scheme at the applicable Net Asset Value (NAV). Over time, you accumulate units across different market price points.",
    category: "Mechanics",
    sources: [OFFICIAL_SOURCES.amfiSip, OFFICIAL_SOURCES.rbiEmandate],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-3",
    order: 3,
    question: "Is SIP a mutual fund?",
    shortAnswer:
      "No. A mutual fund is the investment vehicle that pools money into securities, while a SIP is merely the payment mechanism or method used to invest into that fund.",
    fullExplanation:
      "This is one of the most common beginner confusions. A Mutual Fund is a collective investment scheme managed by an Asset Management Company (AMC) that invests pooled capital into assets such as equities, bonds, or money market instruments. A SIP is simply the automated periodic instalment route used to purchase units of that mutual fund scheme. You can also invest in a mutual fund via a single lump sum.",
    category: "Basics",
    sources: [OFFICIAL_SOURCES.sebiUnderstandingMf, OFFICIAL_SOURCES.amfiSip],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-4",
    order: 4,
    question: "Can I lose money through SIPs?",
    shortAnswer:
      "Yes. Mutual funds invest in market-linked assets. If the market value of the scheme's underlying assets drops below your purchase price, your portfolio value can fall.",
    fullExplanation:
      "Investing via SIP does not eliminate market risk or guarantee positive returns. Mutual fund investments are subject to market risks, economic cycles, and asset price fluctuations. If the underlying securities held by the fund decline in value, the scheme's NAV drops, which means your accumulated units may be worth less than your total invested principal in the short to medium term. SIP helps smooth out the average purchase cost, but it cannot prevent market-driven downturns.",
    category: "Returns & Risk",
    sources: [OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-5",
    order: 5,
    question: "What is NAV?",
    shortAnswer:
      "NAV stands for Net Asset Value. It represents the market value per unit of a mutual fund scheme on any given business day.",
    fullExplanation:
      "Net Asset Value (NAV) is calculated daily after market closing. In simple terms: NAV = (Total Scheme Assets − Total Scheme Liabilities) ÷ Total Outstanding Units. The NAV reflects the price at which you purchase new units or redeem existing ones. Note that a lower NAV does not mean a fund is 'cheaper' or better value than one with a higher NAV; it merely reflects how the fund's asset base is divided into units.",
    category: "Mechanics",
    sources: [OFFICIAL_SOURCES.amfiNav, OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-6",
    order: 6,
    question: "What are mutual-fund units?",
    shortAnswer:
      "Units represent your proportional fraction of ownership in the total assets and holdings of the mutual fund scheme.",
    fullExplanation:
      "When you invest in a mutual fund, your money is pooled with that of thousands of other investors. In exchange, the scheme issues 'units' to you. The number of units you receive is calculated as: Units = Amount Invested ÷ Applicable NAV. Every unit carries an identical entitlement to the income, gains, or losses of the scheme's portfolio.",
    category: "Basics",
    sources: [OFFICIAL_SOURCES.amfiNav, OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-7",
    order: 7,
    question: "What happens after I register a SIP?",
    shortAnswer:
      "Your bank mandate is verified, your first scheduled instalment date is queued, and you receive confirmation details including your Folio number.",
    fullExplanation:
      "After completing your SIP setup: 1) The electronic mandate is submitted to your bank for registration. 2) Once approved (usually takes 1–3 business days depending on bank and UPI/Netbanking mode), your schedule is active. 3) Two to three business days before the debit date, you receive a pre-debit alert as required by RBI. 4) On the debit date, the instalment amount is collected and transmitted to the fund house for unit allocation.",
    category: "Operations",
    sources: [OFFICIAL_SOURCES.rbiEmandate, OFFICIAL_SOURCES.amfiSip],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-8",
    order: 8,
    question: "What is a bank mandate?",
    shortAnswer:
      "A bank mandate is a formal electronic standing authorization you give your bank allowing the mutual fund to automatically debit your agreed SIP instalment amount on scheduled dates.",
    fullExplanation:
      "Under Reserve Bank of India (RBI) and NPCI frameworks, recurring debits without manual OTP entry each month require a one-time electronic mandate (e-mandate or NACH). You authenticate this mandate once using UPI AutoPay, Net Banking, or Debit Card. The mandate sets an upper limit on the debit amount and a validity period, protecting your account from unauthorized deductions.",
    category: "Operations",
    sources: [OFFICIAL_SOURCES.rbiEmandate],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-9",
    order: 9,
    question: "Why can a SIP instalment fail?",
    shortAnswer:
      "Common causes include insufficient bank account balance on the debit date, an inactive bank mandate, technical banking timeouts, or daily transaction limits.",
    fullExplanation:
      "A scheduled SIP debit might fail if: 1) Your bank account balance is lower than the instalment amount. 2) The underlying e-mandate expired or was cancelled. 3) The issuing bank's core banking server faced a technical downtime during the debit processing window. If a debit fails due to insufficient balance, mutual funds generally do not penalize you, but your bank may charge an ECS/NACH bounce fee.",
    category: "Operations",
    sources: [OFFICIAL_SOURCES.rbiEmandate, OFFICIAL_SOURCES.sebiCharter],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-10",
    order: 10,
    question: "Can SIP returns be negative?",
    shortAnswer:
      "Yes, especially during market corrections or in early investment horizons. Market-linked investments do not carry floor protections or assured returns.",
    fullExplanation:
      "During market drawdowns, the current NAV may drop below the average NAV at which you bought your units, causing the portfolio value to show a negative return. Over short periods (such as a few months or 1–2 years), market volatility can lead to negative XIRR. Historically, rupee-cost averaging helps over longer horizons, but no return is ever legally assured or guaranteed by regulators.",
    category: "Returns & Risk",
    sources: [OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-11",
    order: 11,
    question: "What is rupee-cost averaging?",
    shortAnswer:
      "It is an inherent mathematical outcome of periodic investing where you automatically buy more units when prices (NAV) are low and fewer units when prices are high.",
    fullExplanation:
      "Because you invest a constant fixed sum (e.g. ₹2,000 every month), when the market declines and the fund's NAV drops from ₹50 to ₹40, your ₹2,000 purchases 50 units instead of 40. When the market rallies and NAV rises to ₹50, you purchase 40 units. Over time, your average acquisition cost per unit tends to be lower than the peak market prices, reducing the anxiety of trying to 'time the bottom'.",
    category: "Mechanics",
    sources: [OFFICIAL_SOURCES.amfiSip],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-12",
    order: 12,
    question: "Can I pause or cancel a SIP?",
    shortAnswer:
      "Yes. A SIP is completely flexible. You can pause instalments for a specified duration or cancel the mandate entirely without forfeiting previously accumulated units.",
    fullExplanation:
      "Unlike fixed insurance premiums or recurring deposits with lock-ins, mutual fund SIPs provide liquidity and flexibility. Most AMCs allow you to 'Pause' a SIP for 1 to 6 months if you face a cash crunch. You can also cancel the SIP mandate at any time before the cut-off date (typically 10–14 days prior). Cancelling a SIP only stops future debits; the units already allotted remain invested until you decide to redeem them.",
    category: "Operations",
    sources: [OFFICIAL_SOURCES.amfiSip, OFFICIAL_SOURCES.sebiCharter],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-13",
    order: 13,
    question: "What are expense ratios?",
    shortAnswer:
      "The Total Expense Ratio (TER) is the annual percentage of fund assets charged by the AMC to cover fund management, compliance, administrative, and distribution costs.",
    fullExplanation:
      "Mutual funds incur operational costs including fund manager salaries, auditing, custodian charges, registrar expenses, and marketing. The Total Expense Ratio (TER) is capped by SEBI regulations according to scheme AUM. The NAV published daily is already net of the expense ratio. Direct plans have a lower TER than Regular plans because Direct plans do not pay intermediary distributor commissions.",
    category: "Costs & Documents",
    sources: [OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-14",
    order: 14,
    question: "What is a Risk-o-meter?",
    shortAnswer:
      "A standardized visual gauge mandated by SEBI that categorizes the investment risk level of a mutual fund scheme across six standardized tiers.",
    fullExplanation:
      "SEBI mandates that every mutual fund scheme display a Risk-o-meter in all scheme documents, factsheets, and advertisements. The six risk levels are: Low, Low to Moderate, Moderate, Moderately High, High, and Very High. The rating is evaluated monthly based on portfolio characteristics like credit risk, duration, and liquidity for debt, and market cap and volatility for equity.",
    category: "Returns & Risk",
    sources: [OFFICIAL_SOURCES.sebiUnderstandingMf],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
  {
    id: "faq-15",
    order: 15,
    question: "How are mutual funds taxed?",
    shortAnswer:
      "Taxation depends on the fund category (Equity-oriented vs Debt/Other) and your holding duration (Short Term vs Long Term Capital Gains).",
    fullExplanation:
      "Under prevailing Indian tax laws: For equity-oriented mutual funds (minimum 65% domestic equity), holding units for more than 12 months constitutes Long Term Capital Gains (LTCG), taxable at 12.5% on gains exceeding ₹1.25 Lakh per financial year (as per Finance Act 2024 revisions). Holding for 12 months or less is Short Term Capital Gains (STCG), taxed at 20%. For debt funds acquired after April 1, 2023, gains are added to taxable income and taxed at marginal income tax slab rates regardless of holding period. Each SIP instalment is treated as a separate purchase for calculating holding periods.",
    category: "Tax & Regulations",
    sources: [OFFICIAL_SOURCES.itDeptTax],
    status: "verified",
    lastReviewedAt: "November 2026",
  },
];
