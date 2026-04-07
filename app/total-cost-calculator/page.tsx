'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator, Trophy, AlertTriangle, Info, ChevronDown, ChevronUp, ArrowLeft } from '@/components/Icons'
import { loanApps, formatCurrency } from '@/data/loanApps'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const HIDDEN_FEES: Record<string, {
  facilitation: number
  insurance: number
  exciseDuty: number
  processingFee: number
  note?: string
}> = {
  'hustler-fund': { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'Government-backed. Cheapest option. Excise duty applies on interest.' },
  'mshwari':      { facilitation: 2.0, insurance: 0,   exciseDuty: 15, processingFee: 0,   note: '2% facility fee deducted from principal before disbursement.' },
  'fuliza':       { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'Daily fee — avoid using for more than a few days.' },
  'kcb-mpesa':    { facilitation: 2.5, insurance: 0.5, exciseDuty: 15, processingFee: 0,   note: '2.5% negotiation fee + 0.5% insurance deducted upfront.' },
  'tala':         { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'All charges included in stated rate. No additional deductions.' },
  'branch':       { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'Rate varies by credit score. No upfront deductions.' },
  'zenka':        { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'First loan may be interest-free for new customers.' },
  'timiza':       { facilitation: 1.0, insurance: 0,   exciseDuty: 15, processingFee: 100, note: '1% handling fee + flat KES 100 processing fee.' },
  'okash':        { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'Flagged for contact shaming — listed for comparison only.' },
  'equity-eazzy': { facilitation: 0.5, insurance: 0.5, exciseDuty: 15, processingFee: 200, note: 'Very low rate. 1% total add-ons + KES 200 flat fee.' },
  'ipesa':        { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'On blacklist — avoid this app.' },
  'kashway':      { facilitation: 0,   insurance: 0,   exciseDuty: 15, processingFee: 0,   note: 'On blacklist — avoid this app.' },
}

const BLACKLISTED = ['ipesa', 'kashway', 'okash']
const fmt = (n: number) => formatCurrency(n)

function calcCost(appId: string, principal: number, days: number, monthlyRate: number) {
  const f = HIDDEN_FEES[appId] || { facilitation: 0, insurance: 0, exciseDuty: 15, processingFee: 0 }
  const months = days / 30
  const facilitationFee = Math.round((f.facilitation / 100) * principal)
  const insuranceFee    = Math.round((f.insurance    / 100) * principal)
  const processingFee   = f.processingFee
  const amountReceived  = principal - facilitationFee - insuranceFee - processingFee
  const rawInterest     = Math.round(principal * (monthlyRate / 100) * months)
  const exciseDuty      = Math.round((f.exciseDuty / 100) * rawInterest)
  const totalCost       = facilitationFee + insuranceFee + processingFee + rawInterest + exciseDuty
  const totalRepay      = principal + totalCost
  const effectivePct    = Math.round((totalCost / principal) * 1000) / 10
  return { amountReceived, facilitationFee, insuranceFee, processingFee, rawInterest, exciseDuty, totalCost, totalRepay, effectivePct }
}

const QUICK_AMOUNTS = [1000, 5000, 10000, 20000, 50000]
const QUICK_DAYS    = [7, 14, 30, 60, 90]

export default function TotalCostCalculatorPage() {
  const [principal, setPrincipal] = useState(5000)
  const [rawInput,  setRawInput]  = useState('5000')
  const [days,      setDays]      = useState(30)
  const [expanded,  setExpanded]  = useState<string | null>(null)
  const [showAll,   setShowAll]   = useState(false)

  const ranked = useMemo(() => {
    return loanApps
      .filter(a => a.minAmount <= principal && a.maxAmount >= principal && a.maxTermDays >= days)
      .filter(a => showAll || !BLACKLISTED.includes(a.id))
      .map(a => ({ ...a, calc: calcCost(a.id, principal, days, a.interestRateMonthly) }))
      .sort((a, b) => a.calc.totalCost - b.calc.totalCost)
  }, [principal, days, showAll])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to all tools
        </Link>

        <div className="mb-10">
          <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-emerald-600 text-emerald-600 px-3 py-1 mb-5 inline-flex items-center gap-2">
            <Calculator className="w-4 h-4" /> Total Cost of Credit — All Fees Included
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mt-4 mb-3">What Will You Really Pay Back?</h1>
          <p className="text-gray-600 max-w-xl text-sm leading-relaxed">
            Enter your loan amount and term — see the <strong className="text-gray-900">true total cost</strong> including facilitation fees, insurance, processing fees, and CBK excise duty. Ranked cheapest first.
          </p>
        </div>

        {/* Controls */}
        <div className="border-2 border-black p-6 mb-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-sm font-bold uppercase tracking-wide text-gray-700">Loan Amount (KES)</label>
                <span className="font-mono font-bold text-emerald-600">{fmt(principal)}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <input type="number" min={100} max={1000000} value={rawInput}
                  onChange={e => { setRawInput(e.target.value); const n = Number(e.target.value); if (n >= 100) setPrincipal(n) }}
                  className="w-full border-2 border-black px-3 py-2.5 font-bold font-mono focus:outline-none focus:border-emerald-600 transition-colors text-sm" />
              </div>
              <input type="range" min={500} max={100000} step={500} value={Math.min(principal, 100000)}
                onChange={e => { const n = Number(e.target.value); setPrincipal(n); setRawInput(String(n)) }}
                className="w-full mb-3" />
              <div className="flex flex-wrap gap-1.5">
                {QUICK_AMOUNTS.map(q => (
                  <button key={q} onClick={() => { setPrincipal(q); setRawInput(String(q)) }}
                    className={`px-2.5 py-1 border-2 text-xs font-mono font-bold uppercase tracking-wide transition-colors ${principal === q ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black hover:bg-gray-50'}`}>
                    {fmt(q)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-sm font-bold uppercase tracking-wide text-gray-700">Loan Term</label>
                <span className="font-mono font-bold text-emerald-600">{days} days ({(days / 30).toFixed(1)} months)</span>
              </div>
              <input type="range" min={7} max={180} step={7} value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="w-full mb-3 mt-7" />
              <div className="flex flex-wrap gap-1.5">
                {QUICK_DAYS.map(d => (
                  <button key={d} onClick={() => setDays(d)}
                    className={`px-2.5 py-1 border-2 text-xs font-mono font-bold uppercase tracking-wide transition-colors ${days === d ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black hover:bg-gray-50'}`}>
                    {d}d
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {ranked.length === 0 ? (
          <div className="border-2 border-black text-center py-12 text-gray-500 font-mono">
            No apps match {fmt(principal)} for {days} days. Try adjusting the amount or term.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold font-serif text-xl">{ranked.length} apps eligible — cheapest first</h2>
              <button onClick={() => setShowAll(!showAll)} className="text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-300">
                {showAll ? 'Hide flagged apps' : 'Show all apps incl. flagged'}
              </button>
            </div>

            <div className="space-y-3">
              {ranked.map((app, i) => {
                const c = app.calc
                const isWinner      = i === 0
                const isBlacklisted = BLACKLISTED.includes(app.id)
                const isOpen        = expanded === app.id

                return (
                  <div key={app.id} className={`border-2 overflow-hidden transition-all ${
                    isBlacklisted ? 'border-red-400 opacity-70' :
                    isWinner      ? 'border-black' :
                                    'border-gray-300'
                  }`}>
                    {isWinner && <div className="h-1 bg-emerald-600" />}
                    <button className="w-full text-left p-5 hover:bg-gray-50 transition-colors" onClick={() => setExpanded(isOpen ? null : app.id)}>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black font-mono shrink-0 w-6 text-center">{isWinner ? '🥇' : i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold font-serif text-lg">{app.name}</span>
                            {isWinner && <span className="text-xs font-mono font-bold border-2 border-emerald-600 text-emerald-600 px-2 py-0.5 uppercase">Cheapest</span>}
                            {isBlacklisted && <span className="text-xs font-mono font-bold border-2 border-red-500 text-red-600 px-2 py-0.5 uppercase">⚠️ Flagged</span>}
                            {!app.crbReporting && <span className="text-xs font-mono font-bold border-2 border-blue-500 text-blue-600 px-2 py-0.5 uppercase">No CRB</span>}
                          </div>
                          <p className="text-xs font-mono text-gray-500 mt-0.5">{app.interestRate} · {app.processingTime}</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-5 text-sm shrink-0">
                          <div className="text-center">
                            <div className="text-xs font-mono text-gray-500 uppercase">You receive</div>
                            <div className="font-bold font-mono text-gray-700">{fmt(c.amountReceived)}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-mono text-gray-500 uppercase">Total repay</div>
                            <div className={`font-bold font-mono ${isWinner ? 'text-emerald-600' : 'text-gray-900'}`}>{fmt(c.totalRepay)}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-mono text-gray-500 uppercase">Total cost</div>
                            <div className="font-bold font-mono text-red-600">+{fmt(c.totalCost)}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-mono text-gray-500 uppercase">Eff. rate</div>
                            <div className="font-bold font-mono text-amber-600">{c.effectivePct}%</div>
                          </div>
                        </div>
                        <div className="sm:hidden text-right shrink-0">
                          <div className={`font-bold font-mono text-sm ${isWinner ? 'text-emerald-600' : 'text-gray-900'}`}>{fmt(c.totalRepay)}</div>
                          <div className="text-xs font-mono text-red-600">+{fmt(c.totalCost)}</div>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t-2 border-black px-5 py-5 bg-gray-50">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-3 text-gray-500">Full Cost Breakdown</h3>
                            <div className="space-y-1.5 text-sm font-mono">
                              <div className="flex justify-between"><span className="text-gray-500">Loan principal</span><span className="font-bold">{fmt(principal)}</span></div>
                              {c.facilitationFee > 0 && <div className="flex justify-between"><span className="text-gray-500">Facilitation fee ({HIDDEN_FEES[app.id]?.facilitation}%)</span><span className="text-amber-600">−{fmt(c.facilitationFee)}</span></div>}
                              {c.insuranceFee > 0    && <div className="flex justify-between"><span className="text-gray-500">Insurance ({HIDDEN_FEES[app.id]?.insurance}%)</span><span className="text-amber-600">−{fmt(c.insuranceFee)}</span></div>}
                              {c.processingFee > 0   && <div className="flex justify-between"><span className="text-gray-500">Processing fee (flat)</span><span className="text-amber-600">−{fmt(c.processingFee)}</span></div>}
                              <div className="flex justify-between border-t-2 border-black pt-1.5"><span className="text-emerald-600 font-bold">You actually receive</span><span className="text-emerald-600 font-bold">{fmt(c.amountReceived)}</span></div>
                              <div className="flex justify-between"><span className="text-gray-500">Interest ({app.interestRateMonthly}%/mo)</span><span className="text-red-600">{fmt(c.rawInterest)}</span></div>
                              <div className="flex justify-between"><span className="text-gray-500">Excise duty on interest (15%)</span><span className="text-red-600">{fmt(c.exciseDuty)}</span></div>
                              <div className="flex justify-between border-t-2 border-black pt-1.5 font-bold"><span>Total repayment</span><span>{fmt(c.totalRepay)}</span></div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-3 text-gray-500">Notes</h3>
                            {HIDDEN_FEES[app.id]?.note && (
                              <div className="flex items-start gap-2 text-xs font-mono text-amber-700 bg-amber-50 border-2 border-amber-300 p-3 mb-3">
                                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                {HIDDEN_FEES[app.id].note}
                              </div>
                            )}
                            <div className="space-y-2 text-xs font-mono text-gray-600">
                              <div><span className="text-gray-400">Speed:</span> {app.processingTime}</div>
                              <div><span className="text-gray-400">Max term:</span> {app.maxTermDays} days</div>
                              <div><span className="text-gray-400">CRB reporting:</span> <span className={app.crbReporting ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold'}>{app.crbReporting ? 'Yes — defaults affect credit score' : 'No'}</span></div>
                            </div>
                            {!isBlacklisted && (
                              <a href={app.downloadLink} target="_blank" rel="noopener noreferrer"
                                className="inline-block mt-4 px-4 py-2 bg-black text-white font-bold font-mono border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors uppercase tracking-wide text-xs">
                                Apply for {app.name} →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {ranked.length > 1 && (
              <div className="mt-6 border-2 border-emerald-500 p-5 bg-emerald-50 flex items-start gap-3">
                <Trophy className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold font-serif text-lg">{ranked[0].name} is cheapest for your criteria</p>
                  <p className="text-gray-600 text-sm mt-0.5 font-mono">
                    Total cost {fmt(ranked[0].calc.totalCost)} vs {fmt(ranked[ranked.length - 1].calc.totalCost)} for {ranked[ranked.length - 1].name}.
                    You save {fmt(ranked[ranked.length - 1].calc.totalCost - ranked[0].calc.totalCost)} by choosing wisely.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-xs font-mono text-gray-400 text-center mt-8">
          Indicative calculations only. Actual fees vary by credit profile and promotions. Excise duty: 15% on interest per CBK rules. Verify in-app before borrowing.
        </p>
      </div>

      {/* Related guides */}
      <section className="max-w-5xl mx-auto px-4 pb-12 mt-8">
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Related Guides</h2>
        <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          {[
            { href: '/loan-finder',   emoji: '🔍', title: 'Loan Finder',       desc: 'Find the cheapest loan for your exact amount' },
            { href: '/cbk-licensed',  emoji: '✅', title: 'CBK Licensed Apps', desc: 'Only compare regulated, legal lenders' },
            { href: '/crb-check',     emoji: '📊', title: 'CRB Check',         desc: 'Check your credit status before applying' },
            { href: '/sacco-vs-digital', emoji: '⚖️', title: 'SACCO vs Digital', desc: 'Is a SACCO cheaper for your amount?' },
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

      <Footer />
    </div>
  )
}
