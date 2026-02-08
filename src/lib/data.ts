// Fed Watch — Data Layer
// All data from fed-watch-reference.md

export type Severity = 'critical' | 'high' | 'medium';
export type Status = 'active' | 'planned' | 'pending' | 'permanent' | 'historical' | 'expired' | 'eroding';

export interface HistoricalEvent {
  id: number;
  date: string;
  era: number;
  eraName: string;
  title: string;
  description: string;
  severity: Severity;
  mechanism: string;
  amount: string;
  status: Status;
  consequence: string;
  btcRelevance: string;
  isAlert?: boolean; // 🚨 events
}

export interface ThreatIndicator {
  name: string;
  score: number;
  level: string;
  detail: string;
}

export interface ChartDataPoint {
  year: string;
  value: number;
}

// === ERA DEFINITIONS ===
export const eras = [
  { id: 1, name: 'End of Sound Money', years: '1971–1987', color: '#8b5cf6' },
  { id: 2, name: 'The Greenspan Era', years: '1987–2006', color: '#3b82f6' },
  { id: 3, name: 'Great Financial Crisis', years: '2007–2013', color: '#ef4444' },
  { id: 4, name: 'Failed Normalization', years: '2015–2019', color: '#f59e0b' },
  { id: 5, name: 'COVID & Everything Bubble', years: '2020–2022', color: '#ec4899' },
  { id: 6, name: 'Current Cycle', years: '2023–Present', color: '#10b981' },
];

// === HISTORICAL EVENTS ===
export const events: HistoricalEvent[] = [
  {
    id: 1,
    date: 'Aug 15, 1971',
    era: 1,
    eraName: 'End of Sound Money',
    title: 'Nixon Closes the Gold Window',
    description: "President Nixon unilaterally ended dollar-gold convertibility at $35/oz. Presented as 'temporary' — never reversed. Removed the last hard constraint on money printing. Every manipulation since traces back to this moment.",
    severity: 'critical',
    mechanism: 'Monetary Regime Change',
    amount: '∞',
    status: 'permanent',
    consequence: 'Dollar lost 98%+ purchasing power since. Gold went from $35 to $4,000+.',
    btcRelevance: "Bitcoin's fixed 21M supply is the direct antithesis of this decision.",
  },
  {
    id: 2,
    date: '1973-1974',
    era: 1,
    eraName: 'End of Sound Money',
    title: 'Petrodollar System Established',
    description: 'Kissinger negotiates deal: Saudi Arabia prices oil exclusively in dollars, buys US Treasuries with surplus. In exchange, US provides military protection. Creates artificial global demand for dollars — enabling deficit spending without consequences.',
    severity: 'critical',
    mechanism: 'Geopolitical Arrangement',
    amount: 'Structural',
    status: 'eroding',
    consequence: 'Allowed US to export inflation globally. Every oil-importing nation forced to hold dollars.',
    btcRelevance: 'De-dollarization trend (BRICS) weakens this pillar. BTC benefits as alternative reserve.',
  },
  {
    id: 3,
    date: '1979-1982',
    era: 1,
    eraName: 'End of Sound Money',
    title: 'Volcker Shock — The Last Honest Fed Chair',
    description: "Paul Volcker raises Fed Funds rate to 20% to kill inflation. Causes brutal recession but restores credibility. This was the last time the Fed chose long-term discipline over short-term political convenience.",
    severity: 'medium',
    mechanism: 'Rate Policy (Honest)',
    amount: '20% FFR',
    status: 'historical',
    consequence: 'Proved that pain now prevents catastrophe later. Every subsequent chair chose the opposite.',
    btcRelevance: "Volcker's approach is what Bitcoin enforces algorithmically — rules over discretion.",
  },
  {
    id: 4,
    date: 'Oct 19, 1987',
    era: 2,
    eraName: 'The Greenspan Era',
    title: "Black Monday — Birth of the 'Fed Put'",
    description: "Stock market crashes 22.6% in one day. Greenspan immediately floods system with liquidity and signals Fed will backstop markets. Birth of 'moral hazard' — investors learn the Fed will always rescue them.",
    severity: 'critical',
    mechanism: 'Emergency Liquidity',
    amount: 'Unlimited signals',
    status: 'permanent',
    consequence: 'Created the expectation that the Fed protects asset prices. Still operative today.',
    btcRelevance: "The 'Fed Put' is why risk assets are perpetually inflated — BTC prices this in.",
  },
  {
    id: 5,
    date: '1994-1995',
    era: 2,
    eraName: 'The Greenspan Era',
    title: 'Mexico Bailout (Tequila Crisis)',
    description: 'US Treasury uses Exchange Stabilization Fund ($20B) to bail out Mexico, bypassing Congress. Greenspan cuts rates. Established precedent: executive branch can deploy emergency funds without legislative approval.',
    severity: 'high',
    mechanism: 'Exchange Stabilization Fund',
    amount: '$20B',
    status: 'historical',
    consequence: 'Template for future bailouts using executive discretion. Moral hazard exported globally.',
    btcRelevance: "Emerging market currency crises drive BTC adoption — people learn fiat is fragile.",
  },
  {
    id: 6,
    date: 'Sep 1998',
    era: 2,
    eraName: 'The Greenspan Era',
    title: 'LTCM Bailout — Too Big to Fail v1.0',
    description: "Long-Term Capital Management hedge fund collapses with $125B in assets and $1.25T in derivatives. Fed orchestrates private bailout, cuts rates 3 times in 8 weeks. First 'too big to fail' — the concept that some players are above market discipline.",
    severity: 'critical',
    mechanism: 'Coordinated Private Bailout + Rate Cuts',
    amount: '$3.6B + rate cuts',
    status: 'historical',
    consequence: "Emboldened risk-taking. Directly led to dot-com bubble. 'Heads I win, tails you bail me out.'",
    btcRelevance: 'Bitcoin has no central authority to orchestrate bailouts. Failure is allowed.',
  },
  {
    id: 7,
    date: '2001-2003',
    era: 2,
    eraName: 'The Greenspan Era',
    title: 'Post-9/11 & Dot-Com Rate Cuts',
    description: "Greenspan slashes rates from 6.5% to 1% — lowest in 45 years. Held at 1% for over a year. Rather than allowing a healthy recession after dot-com excess, the Fed planted the seeds of the housing bubble.",
    severity: 'high',
    mechanism: 'Aggressive Rate Cuts',
    amount: '6.5% → 1.0%',
    status: 'historical',
    consequence: '1% rates fueled the housing bubble, subprime lending, and ultimately the 2008 crisis.',
    btcRelevance: "Each 'rescue' creates the next, bigger crisis. The cycle BTC was designed to break.",
  },
  {
    id: 8,
    date: 'Mar 2008',
    era: 3,
    eraName: 'Great Financial Crisis',
    title: 'Bear Stearns Rescue',
    description: 'Fed engineers JPMorgan acquisition of Bear Stearns, providing $30B in guarantees via a special purpose vehicle (Maiden Lane). Weekend deal. No Congressional approval. First direct Fed intervention to rescue a specific Wall Street firm.',
    severity: 'critical',
    mechanism: 'Special Purpose Vehicle',
    amount: '$30B guarantee',
    status: 'historical',
    consequence: 'Set precedent for Lehman decision (let fail) and AIG decision (rescue). Arbitrary.',
    btcRelevance: 'Selective bailouts = central planners picking winners. BTC treats everyone equally.',
  },
  {
    id: 9,
    date: 'Sep-Oct 2008',
    era: 3,
    eraName: 'Great Financial Crisis',
    title: 'TARP + AIG Bailout — The Big One',
    description: "Lehman collapses (allowed to fail). AIG bailed out for $182B. TARP passes Congress ($700B). Fed creates alphabet soup: TAF, TSLF, PDCF, AMLF, CPFF, MMIFF, TALF. Rules invented in real-time. The mask comes fully off — the entire system is a construct held together by Fed willingness to print.",
    severity: 'critical',
    mechanism: 'Multiple Emergency Facilities',
    amount: '$700B TARP + $182B AIG + facilities',
    status: 'historical',
    consequence: 'Banks made whole. Homeowners foreclosed. Wall Street bonuses paid with bailout money.',
    btcRelevance: "Satoshi's genesis block message: 'Chancellor on brink of second bailout for banks.' BTC born from this.",
    isAlert: true,
  },
  {
    id: 10,
    date: 'Jan 3, 2009',
    era: 3,
    eraName: 'Great Financial Crisis',
    title: 'Bitcoin Genesis Block',
    description: "Satoshi Nakamoto mines the first Bitcoin block, embedding The Times headline: 'Chancellor on brink of second bailout for banks.' Not just a timestamp — a mission statement. A direct response to the manipulation we're tracking.",
    severity: 'critical',
    mechanism: 'Cryptographic Protocol',
    amount: '50 BTC (block reward)',
    status: 'permanent',
    consequence: 'The beginning of an alternative. Mathematical rules instead of discretionary intervention.',
    btcRelevance: 'This IS the relevance. Bitcoin exists because of everything else on this timeline.',
    isAlert: true,
  },
  {
    id: 11,
    date: 'Nov 2008 - Oct 2014',
    era: 3,
    eraName: 'Great Financial Crisis',
    title: 'QE1 + QE2 + Operation Twist + QE3',
    description: "QE1: $1.75T (Nov 2008). QE2: $600B (Nov 2010). Op Twist: $667B (Sep 2011). QE3: $85B/month open-ended (Sep 2012). Total: ~$3.7T in asset purchases. Fed balance sheet explodes from $900B to $4.5T. Each round was 'temporary' and 'the last one needed.'",
    severity: 'critical',
    mechanism: 'Quantitative Easing',
    amount: '~$3.7T total',
    status: 'historical',
    consequence: "Asset prices inflated. Inequality exploded. Wealth gap widened. 'Temporary' lasted 6 years.",
    btcRelevance: 'BTC went from $0 to $1,000 during this period. The market priced in the debasement.',
  },
  {
    id: 12,
    date: '2015-2018',
    era: 4,
    eraName: 'Failed Normalization',
    title: "The 'Normalization' That Wasn't",
    description: "Fed raises rates from 0% to 2.5% over 3 years and begins balance sheet runoff. Markets throw tantrum in Q4 2018 (S&P drops 20%). Powell immediately pivots in January 2019. The Fed's 'independence' lasted exactly until markets complained.",
    severity: 'high',
    mechanism: 'Rate Hikes → Pivot',
    amount: '0% → 2.5% → pivot',
    status: 'historical',
    consequence: "Proved the Fed cannot normalize without breaking markets. They're trapped.",
    btcRelevance: 'Each failed normalization attempt confirms the thesis: there is no exit from easy money.',
  },
  {
    id: 13,
    date: 'Sep 17, 2019',
    era: 4,
    eraName: 'Failed Normalization',
    title: 'Repo Market Seizure',
    description: "Overnight repo rates spike from 2% to 10% in hours. Fed forced to inject $75B daily, eventually $500B+ via repo operations and 'not QE' T-bill purchases. The financial system nearly froze — and nobody outside finance noticed.",
    severity: 'critical',
    mechanism: "Emergency Repo Operations + 'Not QE'",
    amount: '$500B+',
    status: 'historical',
    consequence: "Exposed that QT had drained the system too far. 'Not QE' = QE. The template for 2025 SRF.",
    btcRelevance: "EXACT same playbook now with SRF. 'Not QE' → 'routine operations' → stealth expansion.",
    isAlert: true,
  },
  {
    id: 14,
    date: 'Mar 2020',
    era: 5,
    eraName: 'COVID & Everything Bubble',
    title: 'COVID Response — The Floodgates Open',
    description: "Fed cuts to 0%, launches unlimited QE ($120B/month), creates 13 emergency facilities including corporate bond buying (unprecedented — Fed directly buying private sector debt). Congress passes $5T+ in fiscal stimulus. More money created in months than in the prior decade.",
    severity: 'critical',
    mechanism: 'Unlimited QE + 13 Facilities + Fiscal',
    amount: '$4.8T Fed + $5T+ fiscal',
    status: 'historical',
    consequence: 'Inflation hit 9.1%. Asset bubble in everything. Housing unaffordable. Savings destroyed.',
    btcRelevance: 'BTC went from $5K to $69K. The market is a mirror — it reflects the debasement.',
    isAlert: true,
  },
  {
    id: 15,
    date: '2020-2021',
    era: 5,
    eraName: 'COVID & Everything Bubble',
    title: 'Corporate Bond Buying (SPVs)',
    description: "Fed creates Secondary Market Corporate Credit Facility and buys corporate bonds and bond ETFs directly. BlackRock hired to manage purchases. A central bank buying private sector assets through the world's largest asset manager — the conflict of interest is the feature, not the bug.",
    severity: 'critical',
    mechanism: 'Special Purpose Vehicles',
    amount: '$14B purchased',
    status: 'historical',
    consequence: "Corporations borrowed at artificially low rates for buybacks. Rich got richer. Fed crossed the Rubicon into fiscal territory.",
    btcRelevance: "When the central bank buys corporate bonds, it's no longer monetary policy — it's central planning.",
  },
  {
    id: 16,
    date: 'Mar 12, 2023',
    era: 6,
    eraName: 'Current Cycle',
    title: 'BTFP — Weekend Invention',
    description: "Silicon Valley Bank collapses Friday. By Sunday, Fed invents Bank Term Funding Program: loans at PAR VALUE for bonds trading at 80 cents — a 20% instant subsidy. Created over a weekend. No Congressional approval. Rules made up in real-time, again.",
    severity: 'critical',
    mechanism: 'Bank Term Funding Program',
    amount: 'Peak $165B',
    status: 'expired',
    consequence: 'Proved the Fed can invent any facility, any weekend, with any terms. The template is infinitely flexible.',
    btcRelevance: 'BTC rallied 40% in the month following. Market understood: more bailouts = more debasement.',
    isAlert: true,
  },
  {
    id: 17,
    date: 'Oct 31, 2025',
    era: 6,
    eraName: 'Current Cycle',
    title: 'SRF Record Usage Begins',
    description: "$29.4B Standing Repo Facility usage — largest since dot-com era. Bank reserves at 4-year low of $2.8T. Fed calls it 'routine month-end management.' The exact same language as 2019.",
    severity: 'high',
    mechanism: 'Standing Repo Facility',
    amount: '$29.4B',
    status: 'historical',
    consequence: 'Signal that QT drained too much, again. Foreshadowed the policy changes that followed.',
    btcRelevance: "Pattern recognition: same stress → same 'temporary' fixes → same expansion.",
  },
  {
    id: 18,
    date: 'Dec 1, 2025',
    era: 6,
    eraName: 'Current Cycle',
    title: 'QT Officially Ends',
    description: "Quantitative Tightening that began June 2022 officially concludes. Balance sheet reduced from $8.9T to ~$6.4T (~$2.5T reduction). Marketed as 'mission accomplished.' Reality: they stopped because the system was breaking (repo spikes, reserve scarcity).",
    severity: 'high',
    mechanism: 'Balance Sheet Policy',
    amount: '~$2.5T reduced',
    status: 'permanent',
    consequence: 'QT always ends before the balance sheet returns to pre-crisis levels. Ratchet effect.',
    btcRelevance: 'Each QT cycle removes LESS than the previous QE added. Net direction: always expanding.',
  },
  {
    id: 19,
    date: 'Dec 10, 2025',
    era: 6,
    eraName: 'Current Cycle',
    title: 'SRF Cap Removed — Unlimited Backdoor',
    description: 'FOMC eliminates the $500B daily aggregate limit on Standing Repo operations. Full allotment format. Any eligible institution can borrow unlimited amounts overnight against Treasuries/MBS. The backdoor is architecturally unlimited.',
    severity: 'critical',
    mechanism: 'Policy Rule Change',
    amount: '∞ (no cap)',
    status: 'active',
    consequence: "Created permanent infrastructure for unlimited stealth liquidity injection without calling it QE.",
    btcRelevance: 'This is the current backdoor. Monitor SRF daily usage for early warning of expansion.',
    isAlert: true,
  },
  {
    id: 20,
    date: 'Dec 2025',
    era: 6,
    eraName: 'Current Cycle',
    title: "Reserve Management Purchases Begin",
    description: "Fed starts buying short-dated government bonds to 'support monetary policy framework.' The same 'not QE' label from September 2019. In 2019, 'not QE' preceded actual QE by 5 months.",
    severity: 'high',
    mechanism: "Asset Purchases ('Not QE')",
    amount: 'Undisclosed',
    status: 'active',
    consequence: 'Balance sheet ticking up in Jan-Feb 2026. If it follows the 2019 pattern, full QE by mid-2026.',
    btcRelevance: 'Watch balance sheet trajectory. Any sustained increase = stealth QE regardless of label.',
  },
  {
    id: 21,
    date: 'Dec 31, 2025',
    era: 6,
    eraName: 'Current Cycle',
    title: 'SRF All-Time Record',
    description: "$74.6B borrowed in a single day. $31.5B Treasuries + $43.1B MBS as collateral. Set the same month QT ended and the cap was removed. Officials: 'year-end window dressing.' The record was 2.5x the previous record from just 2 months prior.",
    severity: 'critical',
    mechanism: 'Standing Repo Facility',
    amount: '$74.6B',
    status: 'historical',
    consequence: "Demonstrated the new uncapped SRF can move massive volumes. Infrastructure test passed.",
    btcRelevance: 'The plumbing works. When they need to inject $200B+, the mechanism is proven.',
    isAlert: true,
  },
  {
    id: 22,
    date: 'Jan 28, 2026',
    era: 6,
    eraName: 'Current Cycle',
    title: 'FOMC Hold + Dissent',
    description: "Rate held at 3.50-3.75%. Two governors (Waller, Miran) dissent in favor of cuts. The consensus is cracking. Dissent is the first step toward pivot — it provides political cover ('the data changed').",
    severity: 'medium',
    mechanism: 'Rate Policy',
    amount: '3.50-3.75%',
    status: 'active',
    consequence: 'Dissent signals cuts coming. Market now pricing 2 cuts by year-end.',
    btcRelevance: "Rate cuts + SRF unlimited + 'not QE' purchases = liquidity wave building.",
  },
  {
    id: 23,
    date: 'Jan 30, 2026',
    era: 6,
    eraName: 'Current Cycle',
    title: 'Warsh Nominated as Fed Chair',
    description: "Kevin Warsh nominated. Media: 'hawk.' Reality: favors rate cuts via supply-side logic. Historically anti-QE but pragmatic. Invested in crypto startups. The contradiction is strategic — talk tough, act loose.",
    severity: 'high',
    mechanism: 'Leadership Change',
    amount: 'N/A',
    status: 'pending',
    consequence: "Warsh faces impossible trilemma: can't shrink balance sheet without breaking markets. Will pivot.",
    btcRelevance: "Watch actions vs words. If SRF usage rises under Warsh, the 'hawk' narrative is theater.",
  },
  {
    id: 24,
    date: 'Planned 2026',
    era: 6,
    eraName: 'Current Cycle',
    title: 'SRF Central Clearing (Planned)',
    description: "Fed planning central clearing for SRF transactions to free up dealer balance sheet capacity. Translation: increase the throughput of the unlimited backdoor. Building a bigger pipe.",
    severity: 'high',
    mechanism: 'Infrastructure Expansion',
    amount: 'TBD',
    status: 'planned',
    consequence: 'More participants, more volume, more stealth liquidity capacity.',
    btcRelevance: "They're not dismantling the backdoor — they're upgrading it.",
  },
];

// === CHART DATA ===

export const balanceSheetData: ChartDataPoint[] = [
  { year: '2007', value: 0.9 },
  { year: '2009', value: 2.1 },
  { year: '2010', value: 2.3 },
  { year: '2011', value: 2.8 },
  { year: '2013', value: 3.5 },
  { year: '2014', value: 4.5 },
  { year: '2015', value: 4.5 },
  { year: '2016', value: 4.4 },
  { year: '2018', value: 4.1 },
  { year: '2019', value: 3.8 },
  { year: '2020 Q1', value: 4.2 },
  { year: '2020 Q3', value: 7.0 },
  { year: '2021', value: 8.2 },
  { year: '2022 Q1', value: 8.9 },
  { year: '2023', value: 8.0 },
  { year: '2024', value: 7.1 },
  { year: '2025', value: 6.4 },
  { year: '2026', value: 6.44 },
];

export const fedFundsRateData: ChartDataPoint[] = [
  { year: '1971', value: 5.0 },
  { year: '1975', value: 5.5 },
  { year: '1980', value: 20.0 },
  { year: '1983', value: 9.0 },
  { year: '1987', value: 7.0 },
  { year: '1992', value: 3.0 },
  { year: '1995', value: 6.0 },
  { year: '2000', value: 6.5 },
  { year: '2003', value: 1.0 },
  { year: '2006', value: 5.25 },
  { year: '2008', value: 0.15 },
  { year: '2015', value: 0.25 },
  { year: '2018', value: 2.5 },
  { year: '2019', value: 1.75 },
  { year: '2020', value: 0.08 },
  { year: '2023', value: 5.5 },
  { year: '2024', value: 4.5 },
  { year: '2026', value: 3.63 },
];

export const debtToGdpData: ChartDataPoint[] = [
  { year: '1971', value: 35 },
  { year: '1980', value: 32 },
  { year: '1990', value: 55 },
  { year: '2000', value: 57 },
  { year: '2008', value: 68 },
  { year: '2010', value: 93 },
  { year: '2015', value: 101 },
  { year: '2020', value: 129 },
  { year: '2023', value: 120 },
  { year: '2026', value: 124 },
];

export const srfUsageData: ChartDataPoint[] = [
  { year: 'Jul 25', value: 0 },
  { year: 'Aug 25', value: 2.1 },
  { year: 'Sep 25', value: 8.4 },
  { year: 'Oct 25', value: 29.4 },
  { year: 'Nov 25', value: 24.0 },
  { year: 'Dec 10', value: 15.2 },
  { year: 'Dec 31', value: 74.6 },
  { year: 'Jan 26', value: 12.3 },
  { year: 'Feb 26', value: 8.7 },
];

// === THREAT INDICATORS ===
export const threatIndicators: ThreatIndicator[] = [
  { name: 'SRF Infrastructure', score: 91, level: 'Critical', detail: 'Cap removed. Unlimited allotment. Central clearing planned.' },
  { name: 'Narrative vs Reality Gap', score: 88, level: 'Critical', detail: "'Not QE' purchases active while talking hawkish. 2019 playbook." },
  { name: 'Reserve Scarcity', score: 78, level: 'Elevated', detail: "Reserves $2.81T — near Waller's 10% GDP threshold." },
  { name: 'Balance Sheet Direction', score: 65, level: 'Warning', detail: "QT ended. Expanding via 'reserve management.'" },
  { name: 'Political Pressure', score: 70, level: 'Warning', detail: 'Warsh nomination + FOMC dissent growing.' },
  { name: 'Historical Pattern Match', score: 95, level: 'Critical', detail: "Current sequence matches 2019 repo → 'not QE' → QE exactly." },
];

export const compositeScore = 81;

// === CURRENT READINGS ===
export const currentReadings = [
  { metric: 'Fed Funds Rate', value: '3.50-3.75%', note: '2 dissenters favor cuts', status: 'warning' as const },
  { metric: 'SRF Cap', value: 'UNLIMITED', note: 'Removed Dec 2025', status: 'critical' as const },
  { metric: 'QT Status', value: 'ENDED', note: 'Dec 2025', status: 'critical' as const },
  { metric: 'Fed Balance Sheet', value: '$6.44T', note: 'Expanding ↑', status: 'warning' as const },
  { metric: 'Bank Reserves', value: '$2.81T', note: "Near 'scarce' zone", status: 'warning' as const },
  { metric: 'ON RRP', value: '$6B', note: 'Buffer depleted (was $2.5T)', status: 'critical' as const },
  { metric: "'Not QE' Purchases", value: 'ACTIVE', note: 'Short-dated bonds', status: 'critical' as const },
  { metric: 'Warsh', value: 'PENDING', note: 'Assumes May 2026', status: 'info' as const },
  { metric: '2019 Pattern Match', value: '95%', note: "Repo stress → 'not QE' → QE", status: 'critical' as const },
];

// === 5-PHASE MAP ===
export const phases = [
  { id: 1, name: 'Talk Tough', description: 'Nominate hawks, signal discipline, let markets correct', status: 'completed' as const },
  { id: 2, name: 'Build Backdoors', description: 'Remove caps, create facilities, expand infrastructure silently', status: 'completed' as const },
  { id: 3, name: 'Manufacture Crisis', description: 'Data deteriorates, markets crash, employment weakens', status: 'active' as const },
  { id: 4, name: 'Forced Pivot', description: "'Emergency' justifies intervention. 'Not QE' becomes QE", status: 'pending' as const },
  { id: 5, name: 'Take Credit', description: "'Leadership 'saves' economy. Debasement continues", status: 'pending' as const },
];

// === PLAYBOOK COMPARISON ===
export const playbook2019 = [
  { step: 1, date: 'Sep 2019', event: 'Repo market spike (2% → 10%)' },
  { step: 2, date: 'Sep-Oct 2019', event: "Fed injects $75B/day in repos. 'Temporary.'" },
  { step: 3, date: 'Oct 2019', event: "Fed announces T-bill purchases. 'NOT QE.'" },
  { step: 4, date: 'Nov-Dec 2019', event: 'Balance sheet grows. Markets rise.' },
  { step: 5, date: 'Mar 2020', event: 'COVID arrives. Unlimited QE. $4.8T added.' },
];

export const playbook2025 = [
  { step: 1, date: 'Oct 2025', event: 'SRF spike record ($29.4B). Reserves at low.' },
  { step: 2, date: 'Dec 2025', event: "QT ends. SRF cap eliminated. 'Routine.'" },
  { step: 3, date: 'Dec 2025', event: "Fed buys short-dated bonds. 'NOT QE' again." },
  { step: 4, date: 'Jan 2026', event: 'Balance sheet rising. Warsh nominated.' },
  { step: 5, date: '???', event: 'Crisis? → QE? The backdoor is already built.' },
];

// === RATCHET EFFECT DATA ===
export const ratchetData = [
  { label: 'Pre-crisis 2008', from: 0.9, to: 4.5, change: '5x' },
  { label: 'QT 2018', from: 4.5, to: 3.8, change: '-15%' },
  { label: 'COVID QE', from: 3.8, to: 8.9, change: '2.3x' },
  { label: 'QT 2022-25', from: 8.9, to: 6.4, change: '-28%' },
];
