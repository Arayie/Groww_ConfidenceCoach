import { GlossaryEntry } from "../types";

export const GLOSSARY_TERMS: GlossaryEntry[] = [
  {
    id: "sip",
    term: "SIP",
    fullForm: "Systematic Investment Plan",
    category: "Fundamentals",
    definition:
      "A systematic method of investing a fixed predetermined amount of money at regular intervals (such as monthly or quarterly) into a selected mutual fund scheme, promoting disciplined long-term investing.",
    practicalExample:
      "Investing ₹2,000 on the 10th of every month into a diversified equity fund instead of making a single ₹24,000 investment once a year.",
    keyRuleOrGuideline:
      "SIP is an investment route, not a separate asset class or scheme. You can pause, modify, or stop a SIP at any time.",
    authority: "AMFI Investor Education",
    officialReferenceUrl: "https://www.amfiindia.com",
  },
  {
    id: "nav",
    term: "NAV",
    fullForm: "Net Asset Value",
    category: "Fundamentals",
    definition:
      "The market value of a single unit of a mutual fund scheme on a specific business day, calculated by subtracting the scheme's liabilities from its assets and dividing by the total number of outstanding units.",
    practicalExample:
      "If a scheme has net assets worth ₹100 crore and 5 crore outstanding units, the NAV is ₹20 per unit. An investment of ₹1,000 purchases exactly 50 units.",
    keyRuleOrGuideline:
      "NAV is calculated and published daily at the end of every trading day after market close. A lower NAV does not indicate a cheaper or better fund.",
    authority: "AMFI & SEBI",
    officialReferenceUrl: "https://www.amfiindia.com/investor/knowledge-center-info?zoneName=NetAssetValueNAV",
  },
  {
    id: "amc",
    term: "AMC",
    fullForm: "Asset Management Company",
    category: "Fundamentals",
    definition:
      "A registered legal company appointed by the mutual fund trustees to manage the investments of the mutual fund schemes, research financial markets, execute trades, and maintain operations.",
    practicalExample:
      "Examples of AMCs include SBI Funds Management Ltd, HDFC Asset Management Company Ltd, and ICICI Prudential AMC Ltd.",
    keyRuleOrGuideline:
      "AMCs operate under strict regulatory licensing and supervision by SEBI, with trustees overseeing adherence to investor protection mandates.",
    authority: "SEBI Mutual Fund Regulations",
    officialReferenceUrl: "https://investor.sebi.gov.in/understanding_mf.html",
  },
  {
    id: "aum",
    term: "AUM",
    fullForm: "Assets Under Management",
    category: "Metrics & Returns",
    definition:
      "The total aggregate market value of all investments and cash held by a specific mutual fund scheme or an entire asset management company at a given point in time.",
    practicalExample:
      "If a mutual fund scheme has ₹15,000 crore invested across shares, bonds, and money market instruments, its scheme AUM is ₹15,000 crore.",
    keyRuleOrGuideline:
      "AUM changes continuously due to inflows from new investments, redemptions by existing investors, and changes in the market value of underlying securities.",
    authority: "AMFI",
    officialReferenceUrl: "https://www.amfiindia.com",
  },
  {
    id: "ter",
    term: "TER",
    fullForm: "Total Expense Ratio",
    category: "Costs & Documents",
    definition:
      "The annual operating fee, expressed as a percentage of daily net assets, charged by the AMC to cover management fees, custodial services, administrative costs, and distribution expenses.",
    practicalExample:
      "A fund with a 1.0% TER charges ₹10 annually for every ₹1,000 invested. This cost is calculated daily and already deducted from the published NAV.",
    keyRuleOrGuideline:
      "SEBI enforces tiered maximum TER limits based on scheme asset size. Direct plans have a lower TER than Regular plans because no distributor commission is paid.",
    authority: "SEBI Regulations",
    officialReferenceUrl: "https://investor.sebi.gov.in",
  },
  {
    id: "expense-ratio",
    term: "Expense Ratio",
    fullForm: "Annual Operating Expense Ratio",
    category: "Costs & Documents",
    definition:
      "The measure of what it costs an investment company to operate a mutual fund. In Indian mutual funds, this is formally referred to as the Total Expense Ratio (TER).",
    practicalExample:
      "If two index funds track the same index, the fund with the lower expense ratio will generally provide net returns closer to the index benchmark.",
    keyRuleOrGuideline:
      "You do not pay this fee separately by cheque or bank transfer; it is accrued daily within the calculation of the scheme's NAV.",
    authority: "SEBI & AMFI",
    officialReferenceUrl: "https://investor.sebi.gov.in",
  },
  {
    id: "exit-load",
    term: "Exit Load",
    fullForm: "Exit Load / Redemption Fee",
    category: "Costs & Documents",
    definition:
      "A fee or penalty charged by the mutual fund scheme when an investor redeems (withdraws) their units before a predetermined minimum holding duration.",
    practicalExample:
      "A fund may have a '1% exit load if redeemed within 365 days of allotment'. If you withdraw after 400 days, the exit load is 0%.",
    keyRuleOrGuideline:
      "Exit load proceeds are credited back to the scheme for the benefit of remaining long-term investors. For SIPs, each instalment is tracked separately for exit load eligibility.",
    authority: "AMFI Knowledge Centre",
    officialReferenceUrl: "https://www.amfiindia.com",
  },
  {
    id: "units",
    term: "Units",
    fullForm: "Mutual Fund Units",
    category: "Fundamentals",
    definition:
      "The fractional portions representing an investor's ownership in a mutual fund scheme's collective portfolio. Each unit has equal legal rights to the scheme's assets and income.",
    practicalExample:
      "If you invest ₹5,000 when the applicable NAV is ₹125, you are allotted 40.000 units in that scheme.",
    keyRuleOrGuideline:
      "Units can be held in physical/statement format (with an RTA folio number) or in dematerialized form within a depository participant account (NSDL/CDSL).",
    authority: "AMFI",
    officialReferenceUrl: "https://www.amfiindia.com",
  },
  {
    id: "kyc",
    term: "KYC",
    fullForm: "Know Your Customer",
    category: "Operations & Banking",
    definition:
      "A mandatory customer identification and verification process prescribed by SEBI and the Government of India under Prevention of Money Laundering Act (PMLA) regulations.",
    practicalExample:
      "Submitting your PAN, proof of address, and completing an Aadhaar or Video-based In-Person Verification (IPV) to achieve 'KYC Compliant' status.",
    keyRuleOrGuideline:
      "KYC is a one-time process for Indian capital markets. Once registered with a SEBI-registered KRA, you can invest across any mutual fund in India without repeating KYC.",
    authority: "SEBI KRA Regulations",
    officialReferenceUrl: "https://investor.sebi.gov.in",
  },
  {
    id: "folio",
    term: "Folio",
    fullForm: "Mutual Fund Folio Number",
    category: "Operations & Banking",
    definition:
      "A unique account number assigned by an Asset Management Company (AMC) to identify an investor's holdings and records within that specific mutual fund house.",
    practicalExample:
      "Similar to a bank account number, your folio number at an AMC (e.g. Folio No. 10482914) holds all your scheme investments with that specific fund house.",
    keyRuleOrGuideline:
      "An investor can hold multiple schemes under one folio number with the same fund house. Folios are linked to your PAN.",
    authority: "AMFI & RTAs",
    officialReferenceUrl: "https://www.amfiindia.com",
  },
  {
    id: "mandate",
    term: "Mandate",
    fullForm: "Bank Mandate / e-Mandate / NACH",
    category: "Operations & Banking",
    definition:
      "A formal electronic standing authorization granted by an account holder to their bank, permitting a mutual fund or clearing house to debit periodic SIP amounts automatically.",
    practicalExample:
      "Authorizing a UPI AutoPay mandate with a ₹10,000 limit, which allows your mutual fund to deduct ₹1,500 automatically on the 5th of each month.",
    keyRuleOrGuideline:
      "Governed by Reserve Bank of India (RBI) recurring payment regulations. Investors receive mandatory advance pre-debit notifications 24–48 hours prior to each debit.",
    authority: "Reserve Bank of India (RBI)",
    officialReferenceUrl: "https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=13374",
  },
  {
    id: "cagr",
    term: "CAGR",
    fullForm: "Compound Annual Growth Rate",
    category: "Metrics & Returns",
    definition:
      "The annualized geometric progression rate that provides a constant rate of return over a multi-year period, assuming the investment compounded steadily.",
    practicalExample:
      "If a single lump sum of ₹10,000 grows to ₹20,000 over 5 years, the CAGR is approximately 14.87% per annum.",
    keyRuleOrGuideline:
      "CAGR applies accurately to single point-to-point lump-sum cash flows. For multiple periodic cash flows like SIPs, XIRR must be used instead.",
    authority: "SEBI Investor Education",
    officialReferenceUrl: "https://investor.sebi.gov.in",
  },
  {
    id: "xirr",
    term: "XIRR",
    fullForm: "Extended Internal Rate of Return",
    category: "Metrics & Returns",
    definition:
      "The annualized rate of return that equates the present value of multiple staggered periodic cash flows (such as monthly SIP instalments) to the final portfolio valuation.",
    practicalExample:
      "When you invest ₹1,000 every month across 24 different dates, each instalment compounds for a different number of days. XIRR calculates the exact annual return across all instalments.",
    keyRuleOrGuideline:
      "XIRR is the industry-standard and SEBI-recommended performance metric for evaluating SIP returns.",
    authority: "AMFI & SEBI",
    officialReferenceUrl: "https://investor.sebi.gov.in/understanding_mf.html",
  },
  {
    id: "risk-o-meter",
    term: "Risk-o-meter",
    fullForm: "SEBI Product Risk Profiler",
    category: "Investor Protection",
    definition:
      "A standardized visual gauge mandated by SEBI that depicts the risk level of a mutual fund scheme across six standardized categories ranging from Low to Very High.",
    practicalExample:
      "An overnight fund typically features a 'Low' risk rating, while a pure equity mid-cap fund will feature a 'Very High' risk rating.",
    keyRuleOrGuideline:
      "Evaluated and updated on a monthly basis by AMCs based on actual underlying portfolio credit quality, interest rate sensitivity, and equity volatility.",
    authority: "SEBI Circular on Product Labeling",
    officialReferenceUrl: "https://investor.sebi.gov.in",
  },
  {
    id: "cut-off-time",
    term: "Cut-off Time",
    fullForm: "Official Transaction Cut-off Timing",
    category: "Operations & Banking",
    definition:
      "The statutory time deadline on a business day by which an investment or redemption order must be received and funds realized for a specific day's NAV to apply.",
    practicalExample:
      "For equity and debt schemes, the statutory cut-off time is typically 3:00 PM. Orders and payments realized before 3:00 PM get the same business day's NAV.",
    keyRuleOrGuideline:
      "Under current SEBI rules, the closing NAV of the day on which funds are credited to the scheme's bank account before cut-off time will be applicable, irrespective of investment amount.",
    authority: "SEBI Regulations",
    officialReferenceUrl: "https://www.amfiindia.com/investor/knowledge-center-info?zoneName=NetAssetValueNAV",
  },
  {
    id: "direct-plan",
    term: "Direct Plan",
    fullForm: "Direct Plan vs Regular Plan",
    category: "Costs & Documents",
    definition:
      "A plan variant where an investor purchases units directly from the AMC without involving an intermediary broker or distributor, resulting in zero distributor commissions and a lower expense ratio.",
    practicalExample:
      "A Direct plan might have an expense ratio of 0.65%, while the Regular plan of the same scheme has 1.45% due to recurring distributor commissions.",
    keyRuleOrGuideline:
      "Because the expense ratio is lower in Direct plans, the NAV is higher and long-term compounding is mathematically higher than Regular plans.",
    authority: "SEBI Guidelines",
    officialReferenceUrl: "https://investor.sebi.gov.in",
  },
];
