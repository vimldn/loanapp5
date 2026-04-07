import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, XCircle, Phone, Users, Database, ShieldOff, CheckCircle2 } from '@/components/Icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Loan App Blacklist Kenya 2026 | Predatory & Unlicensed Apps to Avoid',
  description:
    'The wall of shame: loan apps in Kenya that are unlicensed, predatory, or banned by CBK. Protects Kenyan borrowers from harassment, contact shaming, and illegal debt collection.',
  keywords: 'loan app blacklist Kenya, predatory loan apps Kenya, unlicensed loan apps Kenya, loan apps to avoid Kenya 2026',
  alternates: { canonical: 'https://loanapp.co.ke/blacklist' },
  openGraph: {
    title: 'Loan App Blacklist Kenya 2026 | Apps to Avoid',
    description: 'Protect yourself from predatory loan apps. See which apps are unlicensed, harass borrowers, or have been flagged by CBK.',
  },
};

const LAST_VERIFIED = 'April 2026';

type BlacklistEntry = {
  name: string;
  reason: string[];
  severity: 'high' | 'medium' | 'warning';
  cbkStatus: string;
  complaints: string;
};

const BLACKLIST: BlacklistEntry[] = [
  {
    name: 'OKash',
    reason: ['Contacts shaming — calls relatives without borrower consent', 'Misleading interest rate advertising', 'Aggressive SMS harassment campaigns'],
    severity: 'high',
    cbkStatus: 'Operating — CBK NDTCP licence pending/unclear as of 2026',
    complaints: 'Hundreds of consumer complaints on Google Play and Twitter',
  },
  {
    name: 'iPesa',
    reason: ['Reads full contact list and shares debt status with contacts', 'Interest rates up to 25% per month not clearly disclosed', 'GPS tracking used for debt collection pressure'],
    severity: 'high',
    cbkStatus: 'Not on CBK licensed NDTCP register as of April 2026',
    complaints: 'Flagged by CBK consumer protection desk',
  },
  {
    name: 'LionCash',
    reason: ['Contact shaming — mass messages sent to borrower\'s entire phone book', 'Hidden fees not disclosed at application', 'No complaint resolution channel available'],
    severity: 'high',
    cbkStatus: 'Not CBK licensed',
    complaints: 'Multiple viral complaints on social media 2024–2025',
  },
  {
    name: 'Flash Loan',
    reason: ['Misleading "instant approval" advertising', 'Weekly rollover fees not disclosed upfront', 'Reports borrowers to CRB even during dispute resolution'],
    severity: 'medium',
    cbkStatus: 'Licence status unclear — not on public CBK register',
    complaints: 'Frequent Play Store reviews citing hidden charges',
  },
  {
    name: 'Kashway',
    reason: ['Short-term loans with effective APR exceeding 500%', 'Automatic loan rollovers without borrower consent', 'Contact access used for shaming'],
    severity: 'high',
    cbkStatus: 'Not CBK licensed — Chinese-owned operator',
    complaints: 'Featured in CBK consumer alerts 2023',
  },
  {
    name: 'Opesa',
    reason: ['Contact list reading used for debt collection', 'Interest rate discrepancies between app and actual charges', 'No cooling-off period offered'],
    severity: 'high',
    cbkStatus: 'Not on CBK NDTCP licensed register',
    complaints: 'Flagged by Kenya Bankers Association 2024',
  },
  {
    name: 'PesaX',
    reason: ['Very high effective APR not prominently disclosed', 'Rollover charges that compound rapidly', 'App permissions include SMS and contacts used for shaming'],
    severity: 'medium',
    cbkStatus: 'Licence status not verified on CBK register',
    complaints: 'Consumer complaints about hidden rollover fees',
  },
  {
    name: 'CreditHela',
    reason: ['Loan approval followed by undisclosed insurance charges deducted from principal', 'Difficult or no account deletion process', 'Customer support effectively unreachable'],
    severity: 'warning',
    cbkStatus: 'Not on CBK licensed list',
    complaints: 'Moderate complaints on app stores',
  },
];

const SEVERITY_CONFIG = {
  high:    { label: 'HIGH RISK — Avoid', color: 'bg-red-50 border-red-400',    badge: 'bg-red-100 text-red-700 border-red-400',    icon: XCircle },
  medium:  { label: 'MEDIUM RISK',       color: 'bg-amber-50 border-amber-400', badge: 'bg-amber-100 text-amber-700 border-amber-400', icon: AlertTriangle },
  warning: { label: 'USE CAUTION',       color: 'bg-yellow-50 border-yellow-400', badge: 'bg-yellow-100 text-yellow-700 border-yellow-400', icon: AlertTriangle },
};

const WARNING_SIGNS = [
  { icon: Phone,        label: 'Calls your contacts', desc: 'Reads your phone book and contacts relatives to shame you about debt.' },
  { icon: Users,        label: 'Group shaming SMS',   desc: 'Sends messages to your employer, friends, or family about your loan.' },
  { icon: Database,     label: 'Hidden rollover fees',desc: 'Automatically rolls your loan over with fees you never agreed to.' },
  { icon: ShieldOff,    label: 'No CBK licence',      desc: 'Not registered with the Central Bank of Kenya — no legal protection for you.' },
  { icon: AlertTriangle,label: 'Undisclosed APR',     desc: 'Shows a low "rate" but doesn\'t tell you the effective annual cost.' },
];

export default function BlacklistPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Loan App Blacklist Kenya 2026 — Predatory Apps to Avoid',
    description: 'Loan apps in Kenya flagged for predatory behaviour, contact shaming, or operating without CBK licence.',
    url: 'https://loanapp.co.ke/blacklist',
    dateModified: '2026-04-06',
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />

      {/* Hero */}
      <section className="py-14 px-4 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-red-600 text-red-600 px-3 py-1 mb-6 inline-flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Consumer Protection Warning — {LAST_VERIFIED}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-none mb-6 tracking-tight">
            Wall of Shame: Loan Apps to Avoid in Kenya.
          </h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed text-lg mb-3">
            These apps have been flagged for predatory behaviour, operating without a CBK licence, or using illegal debt collection tactics. We publish this list to protect Kenyan borrowers.
          </p>
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wide">
            Know an app that should be listed? Use the CBK complaints link below to report it.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">

        {/* Warning signs */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">5 Warning Signs of a Predatory Loan App</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 border-2 border-black lg:grid-cols-5">
            {WARNING_SIGNS.map((sign, i) => (
              <div key={sign.label} className="p-5 border-b-2 border-r-2 border-black last:border-r-0 hover:bg-red-50 transition-colors">
                <div className="w-10 h-10 border-2 border-red-600 flex items-center justify-center mb-3">
                  <sign.icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold font-mono text-xs uppercase tracking-wide mb-1">{sign.label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{sign.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The blacklist */}
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6">{BLACKLIST.length} Apps Flagged — Avoid These</h2>
          <div className="space-y-4">
            {BLACKLIST.map((entry) => {
              const sc = SEVERITY_CONFIG[entry.severity];
              const Icon = sc.icon;
              return (
                <div key={entry.name} className={`border-2 p-6 ${sc.color} hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-red-600 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold font-serif text-lg">{entry.name}</h3>
                        <p className="text-xs font-mono text-gray-500">{entry.cbkStatus}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-mono font-bold px-3 py-1 border-2 uppercase tracking-wide shrink-0 ${sc.badge}`}>
                      {sc.label}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {entry.reason.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        {r}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 text-xs font-mono text-gray-600 bg-white/60 border border-gray-300 px-3 py-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{entry.complaints}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* What to do */}
        <section>
          <div className="border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <h2 className="font-serif text-2xl font-bold mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              What to Do If an App Has Harassed You
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { step: '1', title: 'File a CBK complaint', desc: 'Visit centralbank.go.ke → Consumer Protection → File a Complaint. The CBK Consumer Protection Department investigates all complaints.' },
                { step: '2', title: 'Report to the DCI', desc: 'Contact the Directorate of Criminal Investigations (DCI) if an app threatened you or shared your data illegally. File a report at dci.go.ke.' },
                { step: '3', title: 'Contact the ODPC', desc: 'The Office of the Data Protection Commissioner (ODPC) handles illegal use of your contacts. File at odpc.go.ke.' },
                { step: '4', title: 'Block the app immediately', desc: 'Revoke app permissions in your phone settings (Settings → Apps → Permissions). Uninstall the app and change your M-Pesa PIN.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 font-bold font-mono text-sm">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-bold font-serif mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-wrap gap-4">
          <Link href="/cbk-licensed" className="px-6 py-3 bg-black text-white font-bold font-mono border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors uppercase tracking-wide">
            See CBK Licensed Apps →
          </Link>
          <Link href="/#compare" className="px-6 py-3 border-2 border-black text-gray-900 font-bold font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-wide">
            Compare Safe Loan Apps
          </Link>
        </section>

        {/* Related guides */}
        <section>
          <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
            {[
              { href: '/cbk-licensed',         emoji: '✅', title: 'CBK Licensed Apps',    desc: 'The safe, regulated alternatives to use instead' },
              { href: '/crb-check',            emoji: '📊', title: 'CRB Check Guide',      desc: 'If a blacklisted app listed you on CRB — fix it here' },
              { href: '/total-cost-calculator',emoji: '🧮', title: 'True Cost Calculator', desc: 'Compare real costs before choosing an app' },
              { href: '/loan-finder',          emoji: '🔍', title: 'Find a Safe Loan',     desc: 'Match to a regulated lender for your situation' },
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

        <p className="text-xs font-mono text-gray-400 leading-relaxed border-t-2 border-black pt-6">
          This blacklist is compiled from public CBK consumer protection alerts, verified social media complaints, and app store reviews.
          For informational purposes only. Apps listed here may have updated their practices since publication. Last updated {LAST_VERIFIED}.
        </p>
      </main>

      <Footer />
    </div>
  );
}
