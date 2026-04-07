import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle2, XCircle, AlertTriangle, ExternalLink, Calendar } from '@/components/Icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CBK Licensed Loan Apps Kenya 2026 | Official Regulated List',
  description:
    'The complete list of loan apps licensed and regulated by the Central Bank of Kenya (CBK) in 2026. Know which apps are legal and which to avoid.',
  keywords: 'CBK licensed loan apps Kenya, regulated loan apps Kenya 2026, Central Bank Kenya approved loans',
  alternates: { canonical: 'https://loanapp.co.ke/cbk-licensed' },
  openGraph: {
    title: 'CBK Licensed Loan Apps Kenya 2026 | Official Regulated List',
    description: 'Know which loan apps are officially licensed by the Central Bank of Kenya. Avoid unlicensed predatory lenders.',
  },
};

const LAST_VERIFIED = 'April 2026';

type LicensedApp = {
  name: string;
  type: string;
  licenseType: string;
  licenseNo?: string;
  cbkCategory: string;
  status: 'licensed' | 'bank-backed' | 'government';
  ussd?: string;
  note?: string;
};

const LICENSED_APPS: LicensedApp[] = [
  { name: 'Hustler Fund', type: 'Government Digital Credit', licenseType: 'Government-Backed (Hustler Fund Act)', cbkCategory: 'Government Initiative', status: 'government', ussd: '*254#', note: 'Operated by Safaricom under presidential mandate. Cheapest rates at 8% p.a.' },
  { name: 'M-Shwari', type: 'Mobile Money Loan', licenseType: 'CBK Licensed Bank (NCBA)', licenseNo: 'NCBA Bank', cbkCategory: 'Commercial Bank Product', status: 'bank-backed', ussd: '*334#', note: 'Joint product of Safaricom and NCBA Bank. Fully regulated under Banking Act.' },
  { name: 'KCB M-Pesa', type: 'Mobile Money Loan', licenseType: 'CBK Licensed Bank (KCB)', licenseNo: 'KCB Group', cbkCategory: 'Commercial Bank Product', status: 'bank-backed', ussd: '*334#', note: 'KCB Bank Kenya is a fully licensed commercial bank under CBK.' },
  { name: 'Fuliza', type: 'Overdraft Facility', licenseType: 'CBK Licensed Bank (NCBA)', cbkCategory: 'Overdraft — Commercial Bank Product', status: 'bank-backed', ussd: '*334#', note: 'Safaricom + NCBA product. Regulated. Watch daily fees — expensive for long-term use.' },
  { name: 'Eazzy Loan (Equity Bank)', type: 'Bank Mobile Loan', licenseType: 'CBK Licensed Bank (Equity Group)', cbkCategory: 'Commercial Bank Product', status: 'bank-backed', ussd: '*247#', note: 'Equity Bank is a tier-one CBK licensed bank. Very competitive rates at 14% p.a.' },
  { name: 'Timiza (Absa Bank)', type: 'Bank Mobile Loan', licenseType: 'CBK Licensed Bank (Absa)', cbkCategory: 'Commercial Bank Product', status: 'bank-backed', ussd: '*848#', note: 'Absa Kenya (formerly Barclays) is a fully licensed CBK commercial bank.' },
  { name: 'Tala Kenya', type: 'Digital Credit Provider', licenseType: 'CBK Regulated — Non-Deposit Taking Credit Provider', licenseNo: 'CBK/NDTCP/2023', cbkCategory: 'Non-Deposit Taking Credit Provider (NDTCP)', status: 'licensed', note: 'Tala was among the first fintechs licensed under CBK\'s 2023 NDTCP framework.' },
  { name: 'Branch Kenya', type: 'Digital Credit Provider', licenseType: 'CBK Regulated — Non-Deposit Taking Credit Provider', cbkCategory: 'Non-Deposit Taking Credit Provider (NDTCP)', status: 'licensed', note: 'Branch International holds a CBK NDTCP licence. Regulated since 2023.' },
  { name: 'Zenka Finance', type: 'Digital Credit Provider', licenseType: 'CBK Regulated — Non-Deposit Taking Credit Provider', cbkCategory: 'Non-Deposit Taking Credit Provider (NDTCP)', status: 'licensed', note: 'Zenka holds a CBK licence. First loan is often free — useful for building credit.' },
  { name: 'Faulu Microfinance', type: 'Microfinance Bank', licenseType: 'CBK Licensed Microfinance Bank', cbkCategory: 'Microfinance Bank', status: 'licensed', note: 'Faulu is a fully licensed microfinance bank under CBK with deposit-taking powers.' },
  { name: 'KWFT (Kenya Women Finance Trust)', type: 'Microfinance Bank', licenseType: 'CBK Licensed Microfinance Bank', cbkCategory: 'Microfinance Bank', status: 'licensed', note: 'Licensed microfinance bank focused on women entrepreneurs.' },
];

const WHAT_NDTCP_MEANS = [
  'Must disclose the Total Cost of Credit (TCC) before disbursement',
  'Cannot charge more than the CBK-set maximum interest rate',
  'Must report to Credit Reference Bureaus (CRBs) fairly and accurately',
  'Cannot use abusive debt collection practices',
  'Must give borrowers a 7-day cooling-off period',
  'Subject to CBK supervisory inspections and consumer complaints process',
];

const STATUS_CONFIG = {
  'licensed':    { label: 'CBK Licensed NDTCP',   color: 'bg-emerald-100 text-emerald-700 border-emerald-400' },
  'bank-backed': { label: 'Licensed Bank Product', color: 'bg-blue-100 text-blue-700 border-blue-400' },
  'government':  { label: 'Government Initiative', color: 'bg-purple-100 text-purple-700 border-purple-400' },
};

export default function CBKLicensedPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'CBK Licensed Loan Apps Kenya 2026',
    description: 'Complete list of loan apps licensed by the Central Bank of Kenya.',
    url: 'https://loanapp.co.ke/cbk-licensed',
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
            <Shield className="w-4 h-4" /> Last verified: {LAST_VERIFIED}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-none mb-6 tracking-tight">
            CBK Licensed Loan Apps — Kenya 2026.
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed text-lg">
            The Central Bank of Kenya regulates loan apps under the 2023 Non-Deposit Taking Credit Provider (NDTCP) framework.
            Only borrow from apps on this list — unlicensed lenders have no legal accountability to you.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">

        {/* What CBK licensing means */}
        <section className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <h2 className="font-serif text-2xl font-bold mb-5 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            What CBK Regulation Requires Loan Apps to Do
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {WHAT_NDTCP_MEANS.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Licensed apps list */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl font-bold">{LICENSED_APPS.length} Verified Licensed Apps</h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 uppercase tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              Updated {LAST_VERIFIED}
            </div>
          </div>

          <div className="border-2 border-black divide-y-2 divide-black">
            {LICENSED_APPS.map((app) => {
              const sc = STATUS_CONFIG[app.status];
              return (
                <div key={app.name} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold font-serif text-lg">{app.name}</h3>
                        <span className={`text-xs font-mono font-bold px-2.5 py-0.5 border-2 uppercase tracking-wide ${sc.color}`}>
                          {sc.label}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-gray-500 mb-2">{app.licenseType} · {app.cbkCategory}</p>
                      {app.note && <p className="text-sm text-gray-600">{app.note}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      {app.ussd && (
                        <span className="text-xs font-mono font-bold border-2 border-black px-2.5 py-1 text-emerald-700">
                          {app.ussd}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Warning section */}
        <section>
          <div className="border-2 border-red-600 p-6 bg-red-50">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <h2 className="font-serif text-xl font-bold">Apps Not on This List</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Loan apps not registered with the CBK operate without legal oversight. If they mistreat you — abusive calls,
              sharing contacts, wrong CRB listings — you have no formal regulator to complain to.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/blacklist"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold font-mono border-2 border-red-600 hover:bg-red-700 transition-colors uppercase tracking-wide text-sm">
                <XCircle className="w-4 h-4" /> See the Blacklist
              </Link>
              <a href="https://www.centralbank.go.ke" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black text-gray-900 font-bold font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-wide text-sm">
                <ExternalLink className="w-4 h-4" /> CBK Official Site
              </a>
            </div>
          </div>
        </section>

        {/* How to verify */}
        <section className="border-2 border-black p-6">
          <h2 className="font-serif text-xl font-bold mb-5">How to Verify an App Yourself</h2>
          <ol className="space-y-4">
            {[
              'Visit the CBK website at centralbank.go.ke and navigate to "Licensing" → "Credit Providers"',
              'Check the CBK Consumer Protection page for the latest list of licensed NDTCPs',
              'Search the app name on the CBK public register — licensed apps are listed by company name, not always app name',
              'For bank-backed products (M-Shwari, KCB M-Pesa), check the partner bank\'s CBK licence status',
              'If in doubt, call CBK on 020 286 0000 or email ccpd@centralbank.go.ke',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-7 h-7 bg-black text-white flex items-center justify-center shrink-0 font-bold font-mono text-xs">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { href: '/blacklist',          emoji: '🚫', title: 'Loan App Blacklist',   desc: 'Apps to avoid — and why they are dangerous' },
              { href: '/crb-check',          emoji: '📊', title: 'CRB Check Guide',      desc: 'Check your credit status before borrowing' },
              { href: '/total-cost-calculator', emoji: '🧮', title: 'True Cost Calculator', desc: 'See the real cost of any loan including fees' },
              { href: '/loan-finder',        emoji: '🔍', title: 'Loan Finder',          desc: 'Match to the right licensed app for your needs' },
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
