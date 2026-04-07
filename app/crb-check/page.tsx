import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, FileText, AlertTriangle, CheckCircle2, ExternalLink, Phone, Clock } from '@/components/Icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CRB Check Kenya 2026 | How to Check & Clear Your CRB Status',
  description:
    'Complete guide to checking your CRB status in Kenya, getting a clearance certificate from Metropol or TransUnion, and repairing a bad CRB listing. Free and paid methods covered.',
  keywords: 'CRB check Kenya, CRB clearance certificate Kenya, how to clear CRB Kenya, Metropol CRB, TransUnion Kenya, CRB blacklist Kenya',
  alternates: { canonical: 'https://loanapp.co.ke/crb-check' },
  openGraph: {
    title: 'CRB Check & Clearance Guide Kenya 2026',
    description: 'Step-by-step: check your CRB status, get a clearance certificate, and fix a bad listing. Both Metropol and TransUnion covered.',
  },
};

export default function CRBCheckPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check Your CRB Status and Get a Clearance Certificate in Kenya',
    description: 'Step-by-step guide to checking CRB status via Metropol or TransUnion and obtaining a clearance certificate.',
    url: 'https://loanapp.co.ke/crb-check',
    step: [
      { '@type': 'HowToStep', position: 1, text: 'Dial *433# on Safaricom to check Metropol CRB status (free, basic check)' },
      { '@type': 'HowToStep', position: 2, text: 'Visit creditinfo.co.ke or metropol.co.ke for a full credit report' },
      { '@type': 'HowToStep', position: 3, text: 'If listed, contact the reporting institution to settle the debt or dispute' },
      { '@type': 'HowToStep', position: 4, text: 'Request a CRB clearance certificate after 60 days of settlement' },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      {/* Hero */}
      <section className="py-14 px-4 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-blue-600 text-blue-600 px-3 py-1 mb-6 inline-flex items-center gap-2">
            <Search className="w-4 h-4" /> CRB Hub — Updated April 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-none mb-6 tracking-tight">
            How to Check Your CRB Status & Get a Clearance Certificate.
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed text-lg">
            A bad CRB listing can block you from loans, jobs, and even rental agreements. This guide covers every method to check, dispute, and clear your CRB record in Kenya.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">

        {/* What is CRB */}
        <section className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <h2 className="font-serif text-2xl font-bold mb-4">What is CRB and Why Does it Matter?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            Kenya has three licensed Credit Reference Bureaus (CRBs): <strong className="text-gray-900">Metropol</strong>,{' '}
            <strong className="text-gray-900">TransUnion (CreditInfo)</strong>, and{' '}
            <strong className="text-gray-900">Creditinfo Kenya</strong>. Lenders share your repayment history with them.
            A bad listing — called a &quot;negative listing&quot; — means you missed a payment above KES 1,000 on a regulated loan.
          </p>
          <div className="grid sm:grid-cols-3 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { icon: '🏦', title: 'Blocks bank loans', desc: 'No bank will lend to a CRB-listed person' },
              { icon: '📱', title: 'Blocks loan apps', desc: 'Tala, Branch, M-Shwari all check CRB' },
              { icon: '💼', title: 'Affects employment', desc: 'Some employers check CRB for finance roles' },
            ].map(item => (
              <div key={item.title} className="p-5 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold font-serif mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs font-mono">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1 — Check */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-6">Step 1: Check Your CRB Status</h2>
          <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {/* Metropol */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border-2 border-emerald-600 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold font-serif">Metropol CRB</h3>
                  <p className="text-xs font-mono text-gray-500">Fastest — via USSD</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Free basic check', code: 'Dial *433#', note: 'Works on any Safaricom line. Gives basic pass/fail status.' },
                  { label: 'Full credit report — KES 50', note: 'Visit metropol.co.ke or dial *433# and select "Credit Report." Shows all listings.' },
                  { label: 'Clearance certificate — KES 2,200', note: 'Available at metropol.co.ke after all listings are cleared. Needed for jobs and bank applications.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border-2 border-black p-3">
                    <p className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wide">{item.label}</p>
                    {item.code && <code className="text-emerald-600 font-mono font-bold">{item.code}</code>}
                    <p className="text-xs text-gray-600 mt-1">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TransUnion */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border-2 border-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold font-serif">TransUnion CreditInfo</h3>
                  <p className="text-xs font-mono text-gray-500">Most detailed report</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Free annual report', note: 'You are entitled to one free credit report per year from each CRB. Apply at creditinfo.co.ke' },
                  { label: 'Additional reports — KES 50–200', note: 'Visit creditinfo.co.ke, create an account, and request your report online. Results in 24 hours.' },
                  { label: 'Clearance certificate — KES 2,200', note: 'Same price as Metropol. Some employers and banks accept either bureau\'s certificate.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border-2 border-black p-3">
                    <p className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wide">{item.label}</p>
                    <p className="text-xs text-gray-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 — Clear */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-6">Step 2: If You Are Listed — How to Clear It</h2>
          <div className="border-2 border-black divide-y-2 divide-black">
            {[
              { step: '1', title: 'Find out who listed you', desc: 'Your full credit report shows the institution name, amount, and date of listing. Download the full report from Metropol or TransUnion to identify all negative entries.', timeframe: '1 day', color: 'blue' },
              { step: '2', title: 'Pay the outstanding debt', desc: 'Contact the lender directly to arrange full payment. Get a written settlement confirmation letter — you will need this later. If the listing is wrong, proceed to the dispute step instead.', timeframe: '1–7 days', color: 'emerald' },
              { step: '3', title: 'Request the lender to update CRB', desc: 'After settlement, the lender must instruct the CRB to update your listing from "non-performing" to "settled." Follow up after 14 days if not done.', timeframe: '14–30 days', color: 'emerald' },
              { step: '4', title: 'Wait for the 60-day clearing period', desc: 'CBK rules require settled listings to be removed from your active credit file within 60 days of settlement.', timeframe: '60 days', color: 'amber' },
              { step: '5', title: 'Apply for your clearance certificate', desc: 'Once your record is clear, apply at metropol.co.ke or creditinfo.co.ke. Cost: KES 2,200. Valid for 6 months.', timeframe: 'After 60 days', color: 'emerald' },
            ].map((item) => (
              <div key={item.step} className="p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <span className="w-9 h-9 bg-black text-white flex items-center justify-center shrink-0 font-bold font-mono">
                  {item.step}
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-bold font-serif">{item.title}</h3>
                    <span className="flex items-center gap-1 text-xs font-mono text-gray-500 shrink-0">
                      <Clock className="w-3 h-3" /> {item.timeframe}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dispute */}
        <section className="border-2 border-amber-500 p-6 bg-amber-50">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <h2 className="font-serif text-xl font-bold">Disputing a Wrong CRB Listing</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-5">
            If a loan app has listed you incorrectly — for example, listing a loan you never took, or listing you after you paid on time — this is a legal violation. You have strong rights under the Credit Reference Bureau Regulations 2020.
          </p>
          <div className="space-y-3">
            {[
              'Write to the lender directly disputing the listing — send via email with read receipt or registered post',
              'If the lender does not respond within 30 days, file a formal dispute with the CRB directly at metropol.co.ke/disputes or creditinfo.co.ke',
              'If unresolved, file a complaint with the CBK at centralbank.go.ke — CBK can compel lenders to correct false listings',
              'For serious cases involving data misuse, file with the ODPC (Office of the Data Protection Commissioner) at odpc.go.ke',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-6 h-6 bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold font-mono text-xs">{i + 1}</span>
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* Apps that don't report to CRB */}
        <section className="border-2 border-black p-6">
          <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Loan Apps That Do NOT Report to CRB
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            If you are currently listed and need a loan while repairing your CRB, these regulated apps do not report to CRB (or report minimally):
          </p>
          <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { name: 'Hustler Fund', note: 'Government-backed, does not report to CRB for standard loans', rate: '8% p.a.' },
              { name: 'Fuliza', note: 'Overdraft — does not do standard CRB check', rate: '1%/day' },
            ].map(app => (
              <div key={app.name} className="p-5 bg-emerald-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold font-serif">{app.name}</h3>
                    <p className="text-gray-600 text-xs mt-0.5">{app.note}</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 text-sm">{app.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Official links */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-5">Official CRB Resources</h2>
          <div className="grid sm:grid-cols-3 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { name: 'Metropol CRB', url: 'https://metropol.co.ke', desc: 'USSD *433# or online report & clearance', ussd: '*433#' },
              { name: 'CreditInfo Kenya (TransUnion)', url: 'https://creditinfo.co.ke', desc: 'Free annual report + paid options' },
              { name: 'CBK Complaints', url: 'https://www.centralbank.go.ke', desc: 'Consumer Protection Department for disputes' },
            ].map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                className="block p-5 hover:bg-emerald-50 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold font-serif group-hover:text-emerald-600 transition-colors text-sm">{link.name}</h3>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </div>
                <p className="text-gray-500 text-xs font-mono">{link.desc}</p>
                {link.ussd && <code className="text-emerald-600 font-mono text-xs font-bold mt-1 block">{link.ussd}</code>}
              </a>
            ))}
          </div>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { href: '/blacklist',  emoji: '🚫', title: 'Loan App Blacklist',   desc: 'Which apps illegally list borrowers on CRB' },
              { href: '/crb-quiz',   emoji: '❓', title: 'CRB Status Quiz',      desc: 'Find out if you are likely listed — 2 minutes' },
              { href: '/cbk-licensed', emoji: '✅', title: 'CBK Licensed Apps', desc: 'Borrow safely from regulated lenders' },
              { href: '/loan-finder',emoji: '🔍', title: 'Loan Finder',          desc: 'Match to loans available even with CRB issues' },
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
