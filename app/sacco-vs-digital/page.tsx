import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, TrendingDown, Users, Clock, Trophy, ChevronRight } from '@/components/Icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sacco Loans vs Digital Loan Apps Kenya 2026 | Which is Cheaper?',
  description:
    'Head-to-head comparison of Sacco loans vs digital loan apps (Tala, Branch, M-Shwari) in Kenya 2026. Interest rates, limits, speed, requirements — and a clear verdict on who wins.',
  keywords: 'Sacco loans vs digital apps Kenya, Sacco loan interest rate Kenya, Sacco vs Tala, Sacco vs M-Shwari, cheapest loan Kenya',
  alternates: { canonical: 'https://loanapp.co.ke/sacco-vs-digital' },
  openGraph: {
    title: 'Sacco Loans vs Digital Apps Kenya 2026 | Full Comparison',
    description: 'Is a Sacco loan cheaper than Tala or M-Shwari? Full interest rate and cost comparison for Kenyan borrowers.',
  },
};

type ComparisonRow = {
  criteria: string;
  sacco: string;
  digital: string;
  winner: 'sacco' | 'digital' | 'tie';
  note?: string;
};

const COMPARISON: ComparisonRow[] = [
  { criteria: 'Interest Rate', sacco: '1–1.5% per month (12–18% p.a.)', digital: '6–15% per month (72–180% p.a.)', winner: 'sacco', note: 'Saccos are dramatically cheaper — typically 5–10x lower effective cost' },
  { criteria: 'Loan Limit', sacco: '3× your savings (up to KES 5M for large Saccos)', digital: 'KES 500 – 300,000 depending on app', winner: 'sacco', note: 'Saccos offer far higher limits for established members' },
  { criteria: 'Speed of Disbursement', sacco: '3–14 days (application & approval process)', digital: 'Instant to 10 minutes', winner: 'digital', note: 'Digital apps win decisively on speed' },
  { criteria: 'Repayment Term', sacco: '12–48 months for development loans', digital: '7–90 days typically', winner: 'sacco', note: 'Saccos offer much longer terms — better for large amounts' },
  { criteria: 'Collateral / Security', sacco: 'Savings as collateral (3× rule). Guarantors sometimes required', digital: 'None — data-based credit scoring only', winner: 'digital', note: 'Digital apps require nothing upfront' },
  { criteria: 'CRB Impact', sacco: 'Reports to CRB — default is serious', digital: 'Most report to CRB — default affects all future borrowing', winner: 'tie', note: 'Both report to CRB. Neither is safe to default on.' },
  { criteria: 'Membership Required', sacco: 'Yes — months to years of saving first', digital: 'No — download and apply same day', winner: 'digital', note: 'Digital apps have zero barrier to entry' },
  { criteria: 'Emergency Use', sacco: 'Emergency loans available but still take 1–5 days', digital: 'Best option for genuine financial emergencies', winner: 'digital', note: 'Hustler Fund or M-Shwari for true emergencies' },
  { criteria: 'Total Cost on KES 50,000 / 12 months', sacco: '~KES 54,500 (at 1% monthly)', digital: '~KES 107,000+ (at 10% monthly)', winner: 'sacco', note: 'Sacco is ~2× cheaper for medium-term borrowing' },
];

const SACCO_PROS = [
  'Dramatically lower interest rates (1–1.5% vs 6–15% monthly)',
  'Much higher loan limits — up to 3× your savings',
  'Long repayment terms reduce monthly burden',
  'Member dividends — your savings earn interest too',
  'Cannot call your contacts or use abusive collection',
  'Profits shared back to members annually',
];

const DIGITAL_PROS = [
  'Instant disbursement — money in minutes',
  'No membership, savings, or waiting period',
  'Available 24/7 including weekends',
  'No guarantors or paperwork required',
  'Builds a digital credit history quickly',
  'Useful for micro-amounts under KES 5,000',
];

const POPULAR_SACCOS = [
  { name: 'Mwalimu National SACCO', focus: 'Teachers', rate: '1% per month', ussd: '*387#' },
  { name: 'Stima SACCO', focus: 'Kenya Power employees + public', rate: '1% per month', ussd: '*488#' },
  { name: 'Kenya Police SACCO', focus: 'Police officers', rate: '1.2% per month', ussd: 'App only' },
  { name: 'Unaitas SACCO', focus: 'Open membership', rate: '1.5% per month', ussd: '*400#' },
  { name: 'Safaricom SACCO', focus: 'Safaricom staff + public', rate: '1% per month', ussd: 'App only' },
  { name: 'Harambee SACCO', focus: 'Civil servants + public', rate: '1% per month', ussd: '*767#' },
];

export default function SaccoVsDigitalPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sacco Loans vs Digital Loan Apps Kenya 2026',
    description: 'Full comparison of Sacco loan rates, limits, and terms against digital loan apps like Tala, Branch, and M-Shwari.',
    url: 'https://loanapp.co.ke/sacco-vs-digital',
    dateModified: '2026-04-06',
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      {/* Hero */}
      <section className="py-14 px-4 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-emerald-600 text-emerald-600 px-3 py-1 mb-6 inline-flex items-center gap-2">
            <Scale className="w-4 h-4" /> Updated April 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-none mb-6 tracking-tight">
            Sacco Loans vs Digital Apps: Which Is Cheaper in Kenya?
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed text-lg">
            If you qualify for a Sacco loan, you are almost certainly paying too much by using Tala, Branch, or M-Shwari. Here is the full side-by-side breakdown.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">

        {/* Verdict cards */}
        <section className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          <div className="p-6 bg-emerald-50">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold font-serif text-lg">Winner: Sacco (for planned loans)</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              For any loan above KES 10,000 that you can plan 3+ days ahead, a Sacco loan is 5–10× cheaper than a digital app. The rate difference is transformational.
            </p>
          </div>
          <div className="p-6 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold font-serif text-lg">Winner: Digital (for emergencies)</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              For genuine financial emergencies — hospital bill tonight, school fees due tomorrow — a digital app like Hustler Fund or M-Shwari is your only realistic option. Use it, but pay off fast.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-5">Full Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-black font-mono text-sm min-w-[600px]">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider">Criteria</th>
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider text-emerald-400">Sacco Loan</th>
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider text-blue-400">Digital App</th>
                  <th className="p-4 text-center border-b-2 border-black font-bold uppercase tracking-wider">Winner</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b-2 border-black hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r-2 border-black">
                      <div className="font-bold text-gray-900">{row.criteria}</div>
                      {row.note && <div className="text-xs text-gray-500 mt-0.5">{row.note}</div>}
                    </td>
                    <td className="p-4 border-r-2 border-black text-gray-700">{row.sacco}</td>
                    <td className="p-4 border-r-2 border-black text-gray-700">{row.digital}</td>
                    <td className="p-4 text-center">
                      <span className={`text-xs font-bold px-2.5 py-1 border-2 uppercase tracking-wide ${
                        row.winner === 'sacco'   ? 'bg-emerald-100 text-emerald-700 border-emerald-400' :
                        row.winner === 'digital' ? 'bg-blue-100 text-blue-700 border-blue-400' :
                                                   'bg-gray-100 text-gray-600 border-gray-400'
                      }`}>
                        {row.winner === 'sacco' ? 'Sacco ✓' : row.winner === 'digital' ? 'Digital ✓' : 'Tie'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Real example */}
        <section className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <h2 className="font-serif text-xl font-bold mb-5 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            Real Example: KES 100,000 Loan over 12 Months
          </h2>
          <div className="grid sm:grid-cols-3 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { name: 'Sacco Loan', rate: '1% per month', monthly: '~KES 8,885', total: '~KES 106,620', interest: 'KES 6,620', color: 'emerald' },
              { name: 'M-Shwari / KCB M-Pesa', rate: '7.5–8.64% per month', monthly: '~KES 20,000+', total: '~KES 191,700', interest: 'KES 91,700', color: 'amber' },
              { name: 'Tala / Branch', rate: '10–15% per month', monthly: 'Not viable (30-day max)', total: 'Not comparable', interest: 'Much higher if rolled', color: 'red' },
            ].map(item => (
              <div key={item.name} className={`p-5 ${item.color === 'emerald' ? 'bg-emerald-50' : item.color === 'amber' ? 'bg-amber-50' : 'bg-red-50'}`}>
                <h3 className="font-bold font-serif mb-3">{item.name}</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div><span className="text-gray-500">Rate:</span> <span className="text-gray-700">{item.rate}</span></div>
                  <div><span className="text-gray-500">Monthly:</span> <span className="text-gray-700">{item.monthly}</span></div>
                  <div><span className="text-gray-500">Total repaid:</span> <span className={`font-bold ${item.color === 'emerald' ? 'text-emerald-700' : item.color === 'amber' ? 'text-amber-700' : 'text-red-700'}`}>{item.total}</span></div>
                  <div><span className="text-gray-500">Interest paid:</span> <span className="text-gray-700">{item.interest}</span></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-gray-500 mt-4">
            A Sacco member saves over <strong className="text-emerald-600">KES 85,000</strong> in interest versus a comparable M-Shwari loan. This is not a rounding error — it is a fundamentally different product.
          </p>
        </section>

        {/* Pros/cons */}
        <section className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          <div className="p-6">
            <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" /> Why Saccos Win
            </h2>
            <div className="space-y-2.5">
              {SACCO_PROS.map((pro, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span> {pro}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" /> When Digital Apps Win
            </h2>
            <div className="space-y-2.5">
              {DIGITAL_PROS.map((pro, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold mt-0.5">✓</span> {pro}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Saccos */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-5">Popular Kenyan Saccos Open to the Public</h2>
          <div className="border-2 border-black divide-y-2 divide-black">
            {POPULAR_SACCOS.map(sacco => (
              <div key={sacco.name} className="flex items-start justify-between gap-3 p-4 hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-bold font-serif">{sacco.name}</h3>
                  <p className="text-xs font-mono text-gray-500 mt-0.5">{sacco.focus}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-emerald-600 text-sm">{sacco.rate}</div>
                  {sacco.ussd !== 'App only' && <code className="text-xs font-mono text-gray-500">{sacco.ussd}</code>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-gray-400 mt-3">
            To join a Sacco, visit the Sacco&apos;s offices or website with your national ID and first month&apos;s savings. Most Saccos require 3–6 months of savings before your first loan.
          </p>
        </section>

        {/* CTA */}
        <section className="border-2 border-black p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold mb-1">Need a loan right now?</h2>
            <p className="text-gray-600 text-sm">Compare the cheapest regulated digital apps while you work toward Sacco membership.</p>
          </div>
          <Link href="/#compare"
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-bold font-mono border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors uppercase tracking-wide whitespace-nowrap">
            Compare Apps <ChevronRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { href: '/cbk-licensed',         emoji: '✅', title: 'CBK Licensed Apps',   desc: 'All regulated digital loan options compared' },
              { href: '/total-cost-calculator', emoji: '🧮', title: 'True Cost Calculator', desc: 'Compare SACCO vs app costs side by side' },
              { href: '/loan-finder',           emoji: '🔍', title: 'Loan Finder',          desc: 'Find the right option for your situation' },
              { href: '/crb-check',             emoji: '📊', title: 'CRB Check Guide',      desc: 'Check your credit before applying to a SACCO' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="flex items-start gap-3 p-5 hover:bg-gray-50 transition-colors group">
                <span className="text-xl shrink-0">{g.emoji}</span>
                <div>
                  <p className="font-bold font-serif group-hover:text-emerald-600 transition-colors">{g.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 font-mono">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
