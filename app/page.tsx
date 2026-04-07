'use client';

import { useState, useMemo } from 'react';
import { loanApps, formatCurrency, LoanApp } from '@/data/loanApps';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from '@/components/Icons';

type SortField = 'interestRateMonthly' | 'maxAmount' | 'maxTermDays' | 'playStoreRating';
type SortOrder = 'asc' | 'desc';
type CategoryFilter = 'all' | 'mobile-money' | 'bank' | 'fintech';

const hubLinks = [
  { href: '/cbk-licensed',   label: 'CBK Licensed Apps' },
  { href: '/blacklist',      label: 'Blacklist ⚠️' },
  { href: '/crb-check',      label: 'CRB Guide' },
  { href: '/sacco-vs-digital', label: 'Sacco vs Digital' },
];

export default function Home() {
  const [loanAmount, setLoanAmount]   = useState<number>(5000);
  const [loanTerm, setLoanTerm]       = useState<number>(30);
  const [sortField, setSortField]     = useState<SortField>('interestRateMonthly');
  const [sortOrder, setSortOrder]     = useState<SortOrder>('asc');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);

  const filteredAndSortedApps = useMemo(() => {
    let apps = [...loanApps];
    if (categoryFilter !== 'all') apps = apps.filter(app => app.category === categoryFilter);
    apps = apps.filter(app => app.minAmount <= loanAmount && app.maxAmount >= loanAmount);
    apps.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return apps;
  }, [categoryFilter, loanAmount, sortField, sortOrder]);

  const calculateRepayment = (app: LoanApp, amount: number, days: number) => {
    const months = days / 30;
    const interest = amount * (app.interestRateMonthly / 100) * months;
    return amount + interest;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="border-b-2 border-black px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/logo-256.png" alt="LoanApp logo" width={36} height={36} priority className="border-2 border-black" />
          <div>
            <div className="text-lg font-bold font-serif tracking-tighter leading-none">LoanApp.co.ke</div>
            <div className="text-xs font-mono uppercase tracking-wider text-gray-500">Compare loan apps in Kenya</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 font-mono text-sm font-bold uppercase">
          {[['#calculator','Calculator'],['#compare','Compare'],['#tips','Tips'],['#tools','Tools'],].map(([href, label]) => (
            <a key={href} href={href} className="relative group px-4 py-2 overflow-hidden border-2 border-transparent hover:border-black transition-all duration-300">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{label}</span>
              <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </a>
          ))}
          <div className="relative group">
            <button className="relative flex items-center gap-1 px-4 py-2 overflow-hidden border-2 border-transparent hover:border-black transition-all duration-300">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Guides</span>
              <ChevronDown className="w-3.5 h-3.5 relative z-10 group-hover:text-white" />
              <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </button>
            <div className="absolute top-full left-0 w-56 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-1 group-hover:translate-y-0 z-50">
              {hubLinks.map(l => (
                <Link key={l.href} href={l.href} className="block px-4 py-3 text-sm text-gray-900 hover:bg-black hover:text-white border-b border-gray-200 last:border-b-0 transition-colors font-mono font-bold uppercase tracking-wide">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <a href="#compare" className="ml-2 px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors">
            Get a Loan
          </a>
        </div>

        <button className="md:hidden p-2 border-2 border-black hover:bg-black hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b-2 border-black px-4 py-4 flex flex-col gap-1 font-mono text-sm font-bold uppercase sticky top-[74px] z-40 shadow-[0_8px_0px_0px_rgba(0,0,0,1)]">
          {[['#calculator','Calculator'],['#compare','Compare'],['#tips','Tips'],['#tools','Tools']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)} className="p-3 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all duration-200">{label}</a>
          ))}
          <div className="border-t-2 border-black pt-2 mt-1">
            {hubLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-emerald-600 border-b border-gray-100 last:border-b-0 transition-colors">{l.label}</Link>
            ))}
          </div>
          <a href="#compare" onClick={() => setMobileOpen(false)} className="mt-2 block w-full text-center px-4 py-2.5 bg-black text-white font-bold border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors">
            Get a Loan
          </a>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── Hero / Calculator ── */}
        <header id="calculator" className="py-16 md:py-24 border-b-2 border-black grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-black px-3 py-1 mb-6 inline-block hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
              Market Analysis
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 font-serif tracking-tight">
              Compare Loan Apps in Kenya.
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-serif italic">
              Find the cheapest mobile loans. Analyze interest rates, limits, and hidden fees across Kenya&apos;s top lending platforms.
            </h2>
            <p className="text-gray-600 max-w-lg leading-relaxed">
              Interest rates on mobile loans in Kenya vary wildly — from 0.67% to over 30% per month. Use our data-driven index to calculate exactly what you owe before you borrow.
            </p>
          </div>

          {/* Calculator widget */}
          <div className="border-2 border-black p-6 sm:p-10 bg-gray-50 relative group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-black group-hover:bg-emerald-500 transition-colors duration-300" />
            <h3 className="font-serif text-2xl font-bold mb-8">Real-Time Cost Calculator</h3>

            <div className="mb-8">
              <label className="block font-mono text-sm font-bold uppercase mb-2 text-gray-500">Principal Amount (KES)</label>
              <div className="flex items-center border-b-2 border-black focus-within:border-emerald-600 transition-colors">
                <span className="font-mono text-2xl font-bold mr-2">KES</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full bg-transparent text-4xl sm:text-5xl font-mono focus:outline-none py-2"
                />
              </div>
              <input type="range" min="500" max="100000" step="500" value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full mt-3" />
              <div className="flex justify-between text-xs font-mono text-gray-500 mt-1">
                <span>KES 500</span><span>KES 100,000</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-mono text-sm font-bold uppercase mb-2 text-gray-500">Loan Term (Days)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-transparent border-b-2 border-black text-4xl sm:text-5xl font-mono focus:outline-none focus:border-emerald-600 transition-colors py-2"
              />
            </div>

            {/* Top 3 preview */}
            <div className="border-t-2 border-black pt-6">
              <h4 className="font-mono text-sm font-bold uppercase tracking-wide mb-4 text-gray-700">Top 3 Cheapest — What You Pay Back</h4>
              <div className="space-y-2">
                {filteredAndSortedApps.slice(0, 3).map((app) => {
                  const repayment = calculateRepayment(app, loanAmount, Math.min(loanTerm, app.maxTermDays));
                  const interest  = repayment - loanAmount;
                  return (
                    <div key={app.id} className="flex items-center justify-between border-2 border-black p-3 hover:bg-emerald-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{app.logo}</span>
                        <div>
                          <div className="font-bold font-serif text-sm">{app.name}</div>
                          <div className="text-xs font-mono text-gray-500">{app.interestRate}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-mono">{formatCurrency(repayment)}</div>
                        <div className="text-xs font-mono text-red-600">+{formatCurrency(interest)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a href="#compare" className="block text-center font-mono text-sm font-bold text-emerald-600 hover:text-emerald-700 mt-4 border-2 border-emerald-600 py-2 hover:bg-emerald-600 hover:text-white transition-all">
                See all {filteredAndSortedApps.length} options →
              </a>
            </div>

            <p className="font-mono text-xs text-gray-500 uppercase mt-4">
              * Estimates based on advertised monthly flat rates. Actual APR may vary by credit profile.
            </p>
          </div>
        </header>

        {/* ── Quick Stats ── */}
        <section className="border-b-2 border-black py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x-2 divide-black">
            {[
              { value: '12+',    label: 'Loan Apps Compared' },
              { value: '0.67%',  label: 'Lowest Monthly Rate' },
              { value: 'KES 3M', label: 'Highest Limit' },
              { value: 'Instant',label: 'Fastest Disbursement' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-6 px-4 first:border-l-0">
                <div className="text-3xl font-bold font-mono text-emerald-600">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section id="compare" className="py-16 border-b-2 border-black">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">The Kenya Loan Index</h2>
              <p className="text-gray-600">Comprehensive comparison of mobile lending rates (Updated 2026).</p>
            </div>
            <div className="font-mono text-sm font-bold uppercase bg-black text-white px-4 py-2">
              Base: KES {loanAmount.toLocaleString()} / {loanTerm} days
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-0 mb-8 border-2 border-black w-fit">
            {(['all', 'mobile-money', 'bank', 'fintech'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 font-mono text-sm font-bold uppercase tracking-wide border-r-2 border-black last:border-r-0 transition-colors ${
                  categoryFilter === cat ? 'bg-black text-white' : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All' : cat === 'mobile-money' ? 'M-Pesa' : cat === 'bank' ? 'Banks' : 'Fintech'}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-black font-mono text-sm min-w-[800px]">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider">App</th>
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-800" onClick={() => handleSort('interestRateMonthly')}>
                    Interest Rate {sortField === 'interestRateMonthly' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="p-4 text-right border-b-2 border-black font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-800" onClick={() => handleSort('maxAmount')}>
                    Max Limit {sortField === 'maxAmount' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-800" onClick={() => handleSort('maxTermDays')}>
                    Term {sortField === 'maxTermDays' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider">Speed</th>
                  <th className="p-4 text-left border-b-2 border-black font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-800" onClick={() => handleSort('playStoreRating')}>
                    Rating {sortField === 'playStoreRating' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="p-4 text-right border-b-2 border-black font-bold uppercase tracking-wider bg-emerald-900">
                    Est. Repayment
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedApps.map((app) => {
                  const repayment = calculateRepayment(app, loanAmount, Math.min(loanTerm, app.maxTermDays));
                  const isExpanded = expandedApp === app.id;
                  return (
                    <>
                      <tr
                        key={app.id}
                        onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                        className="border-b-2 border-black hover:bg-emerald-50 transition-colors duration-200 cursor-pointer group"
                      >
                        <td className="p-4 border-r-2 border-black">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{app.logo}</span>
                            <div>
                              <span className="font-bold font-serif text-base text-gray-900">{app.name}</span>
                              <div className="text-xs text-gray-500 capitalize">{app.category.replace('-', ' ')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-r-2 border-black">
                          <span className={`font-bold ${app.interestRateMonthly < 5 ? 'text-emerald-600' : app.interestRateMonthly < 15 ? 'text-amber-600' : 'text-red-600'}`}>
                            {app.interestRate}
                          </span>
                        </td>
                        <td className="p-4 border-r-2 border-black text-right text-gray-700">{formatCurrency(app.maxAmount)}</td>
                        <td className="p-4 border-r-2 border-black text-gray-700">{app.loanTerm}</td>
                        <td className="p-4 border-r-2 border-black">
                          <span className={`text-sm ${app.processingTime === 'Instant' ? 'text-emerald-600 font-bold' : 'text-gray-600'}`}>
                            {app.processingTime}
                          </span>
                        </td>
                        <td className="p-4 border-r-2 border-black">
                          <span className="text-amber-600">★</span> {app.playStoreRating}
                        </td>
                        <td className="p-4 text-right bg-emerald-50/50 group-hover:bg-emerald-100 transition-colors">
                          <span className="font-bold text-emerald-700 text-base">{formatCurrency(repayment)}</span>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr key={`${app.id}-expanded`} className="bg-gray-50 border-b-2 border-black">
                          <td colSpan={7} className="p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Requirements</h5>
                                <ul className="space-y-1">
                                  {app.requirements.map((req, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                      <span className="text-gray-400 mt-0.5">—</span> {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">Pros</h5>
                                <ul className="space-y-1">
                                  {app.pros.map((pro, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                      <span className="text-emerald-600 font-bold">✓</span> {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 mb-3">Cons</h5>
                                <ul className="space-y-1">
                                  {app.cons.map((con, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                      <span className="text-red-600 font-bold">✗</span> {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-6 pt-6 border-t-2 border-black flex items-center justify-between gap-4">
                              <p className="text-sm text-gray-600 max-w-2xl">{app.description}</p>
                              <a href={app.downloadLink} target="_blank" rel="noopener noreferrer"
                                className="px-4 py-2 bg-black text-white font-mono font-bold text-sm border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors whitespace-nowrap">
                                Get {app.name} →
                              </a>
                            </div>
                            {app.crbReporting && (
                              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-600 bg-amber-50 border-2 border-amber-300 px-3 py-2">
                                ⚠️ Reports to CRB — late payment may affect your credit score
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAndSortedApps.length === 0 && (
            <div className="text-center py-12 border-2 border-black text-gray-500 font-mono">
              No apps found for {formatCurrency(loanAmount)}. Try adjusting the amount.
            </div>
          )}
        </section>

        {/* ── Smart Tools ── */}
        <section id="tools" className="py-16 border-b-2 border-black">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">Smart Borrowing Tools</h2>
              <p className="text-gray-600">Find your best loan, see the true cost, and check your CRB risk.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border-2 border-black divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
            {[
              { href: '/loan-finder', emoji: '🎯', label: 'Loan Finder Wizard', desc: '3 questions → your top 3 app matches with approval likelihood' },
              { href: '/total-cost-calculator', emoji: '🧮', label: 'Total Cost Calculator', desc: 'All apps compared — including hidden fees, insurance & excise duty' },
              { href: '/crb-quiz', emoji: '🔍', label: 'Am I CRB Blacklisted?', desc: '5-question quiz to assess your CRB risk + free repair guide' },
            ].map((tool) => (
              <a key={tool.href} href={tool.href}
                className="group block p-8 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="text-4xl mb-4">{tool.emoji}</div>
                <h4 className="font-serif text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{tool.label}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{tool.desc}</p>
                <span className="font-mono text-sm font-bold text-emerald-600 uppercase tracking-wide">Try it →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Tips Section ── */}
        <section id="tips" className="py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Expert Borrowing Guidelines</h2>
            <p className="text-gray-600 max-w-2xl">
              Navigating the M-Pesa loan ecosystem requires financial literacy. Follow these authoritative guidelines to minimise debt burden and protect your credit score.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-black">
            {[
              { emoji: '📊', title: 'Compare Before You Borrow', body: 'Interest rates vary wildly — from 0.67% to 30% monthly. A KES 10,000 loan can cost you KES 300 or KES 3,000 depending on where you borrow.' },
              { emoji: '⚡', title: 'Start with Hustler Fund', body: 'At 8% per year (0.67% monthly), Hustler Fund is by far the cheapest option. Start there and build your limit before using other apps.' },
              { emoji: '🏦', title: 'Bank Apps Beat Fintech', body: 'If you have a bank account, Eazzy Loan (Equity) and Timiza (Absa) offer much lower rates than apps like Tala or Branch. Check your bank first.' },
              { emoji: '⚠️', title: 'Avoid Fuliza Long-Term', body: 'Fuliza charges daily fees that compound fast. A KES 5,000 Fuliza for 30 days costs ~KES 1,500 in fees. Pay it off quickly or avoid it.' },
              { emoji: '📱', title: 'Watch the App Permissions', body: 'Apps like Tala, Branch, and OKash read your SMS, contacts, and location. They may call your contacts if you default. Be aware of this.' },
              { emoji: '📋', title: 'CRB Affects Everything', body: 'Most apps report to Credit Reference Bureaus. One late payment can affect your ability to get bank loans, mortgages, and even jobs. Always pay on time.' },
            ].map((tip, i) => (
              <article key={i} className="border-b-2 border-r-2 border-black p-8 bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-default">
                <div className="text-3xl mb-5">{tip.emoji}</div>
                <h3 className="font-serif text-xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{tip.body}</p>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t-4 border-black bg-black text-white pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo-256.png" alt="LoanApp logo" width={32} height={32} priority className="border-2 border-white" />
                <span className="text-xl font-bold font-serif tracking-tighter">LoanApp.co.ke</span>
              </div>
              <p className="text-gray-400 max-w-sm font-mono text-sm leading-relaxed">
                Kenya&apos;s most comprehensive loan app comparison tool. Make informed borrowing decisions.
              </p>
            </div>
            <div>
              <h5 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">By Type</h5>
              <ul className="space-y-2 font-mono text-sm">
                {['M-Pesa Loans','Bank Loans','Fintech Apps'].map(item => (
                  <li key={item}><a href="#compare" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Resources</h5>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="#calculator"  className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Loan Calculator</a></li>
                <li><a href="#tips"        className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Borrowing Tips</a></li>
                <li><a href="#compare"     className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Compare All</a></li>
                <li><Link href="/blog"     className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Guides &amp; Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-500">
            <p>© {new Date().getFullYear()} LoanApp.co.ke. All rights reserved.</p>
            <p className="text-center md:text-right max-w-2xl">
              For informational purposes only. We do not issue loans. Always verify exact interest rates, terms, and conditions with the official lender before accepting any credit facility.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
