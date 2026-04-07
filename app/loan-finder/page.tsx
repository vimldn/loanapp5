'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Sparkles, ChevronRight, ArrowLeft, Trophy, AlertTriangle, RotateCcw } from '@/components/Icons'
import { loanApps, formatCurrency } from '@/data/loanApps'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Step = {
  id: string
  question: string
  subtext?: string
  options: { label: string; value: string; icon: string }[]
}

const STEPS: Step[] = [
  {
    id: 'amount',
    question: 'How much do you need?',
    subtext: 'Select the approximate amount — we will find apps that can cover it.',
    options: [
      { label: 'Under KES 2,000',    value: '1000',  icon: '💵' },
      { label: 'KES 2,000–10,000',   value: '5000',  icon: '💸' },
      { label: 'KES 10,000–50,000',  value: '25000', icon: '💰' },
      { label: 'Over KES 50,000',    value: '75000', icon: '🏦' },
    ],
  },
  {
    id: 'income',
    question: 'Do you have a steady income or savings?',
    subtext: 'This helps us find apps you are most likely to be approved for.',
    options: [
      { label: 'Yes — regular salary or income', value: 'salary',    icon: '✅' },
      { label: 'Irregular — business or gig work', value: 'irregular', icon: '🔄' },
      { label: 'No steady income right now',      value: 'none',      icon: '❌' },
    ],
  },
  {
    id: 'speed',
    question: 'How urgently do you need the money?',
    subtext: 'We will prioritise speed or value based on your urgency.',
    options: [
      { label: 'Right now — within minutes',        value: 'urgent',   icon: '⚡' },
      { label: 'Today or tomorrow is fine',         value: 'today',    icon: '🕐' },
      { label: 'Within a week — value matters more', value: 'flexible', icon: '📊' },
    ],
  },
]

type Answers = Record<string, string>

function scoreApp(appId: string, answers: Answers): number {
  const amount = Number(answers.amount || 5000)
  const income = answers.income || 'salary'
  const speed  = answers.speed  || 'today'

  let score = 100
  const app = loanApps.find(a => a.id === appId)
  if (!app) return 0
  if (app.minAmount > amount || app.maxAmount < amount) return 0

  if (income === 'salary') {
    if (app.category === 'bank') score += 20
    if (app.id === 'equity-eazzy') score += 10
  }
  if (income === 'irregular') {
    if (app.category === 'fintech') score += 10
    if (app.id === 'hustler-fund') score += 15
  }
  if (income === 'none') {
    if (app.id === 'hustler-fund') score += 20
    if (app.id === 'fuliza') score += 10
    if (app.category === 'bank') score -= 20
  }

  if (speed === 'urgent') {
    if (app.processingTime === 'Instant') score += 20
    if (app.processingTime.includes('5-10')) score += 5
  }
  if (speed === 'flexible') {
    score += Math.max(0, 20 - app.interestRateMonthly)
  }

  score += Math.max(0, 15 - app.interestRateMonthly) * 2
  if (!app.crbReporting) score += 10

  return score
}

const BLACKLISTED = ['ipesa', 'kashway']
const MATCH_LABELS = ['Best match', 'Strong match', 'Also consider']

export default function LoanFinderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers]         = useState<Answers>({})
  const [done, setDone]               = useState(false)

  const progress = Math.round((currentStep / STEPS.length) * 100)
  const step = STEPS[currentStep]

  const matches = useMemo(() => {
    if (!done) return []
    return loanApps
      .filter(a => !BLACKLISTED.includes(a.id))
      .map(a => ({ ...a, score: scoreApp(a.id, answers) }))
      .filter(a => a.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }, [done, answers])

  function selectOption(stepId: string, value: string) {
    const newAnswers = { ...answers, [stepId]: value }
    setAnswers(newAnswers)
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 250)
    } else {
      setTimeout(() => setDone(true), 300)
    }
  }

  function restart() {
    setCurrentStep(0)
    setAnswers({})
    setDone(false)
  }

  const approvalLabels: Record<string, string> = {
    salary:    'High approval chance',
    irregular: 'Good approval chance',
    none:      'Approval may vary',
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm font-mono">
          <ArrowLeft className="w-4 h-4" /> Back to all tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-black text-gray-900 px-3 py-1 mb-5 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Smart Loan Finder
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight mt-4 mb-2">Find Your Best Loan Match</h1>
          <p className="text-gray-600 font-mono text-sm">3 quick questions — we match you with the top 3 apps for your situation</p>
        </div>

        {!done ? (
          <div className="border-2 border-black overflow-hidden">
            {/* Progress */}
            <div className="h-2 bg-gray-200">
              <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wide">Step {currentStep + 1} of {STEPS.length}</span>
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`w-2 h-2 transition-colors ${i <= currentStep ? 'bg-black' : 'bg-gray-300'}`} />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold font-serif mb-2">{step.question}</h2>
              {step.subtext && <p className="text-gray-500 text-sm mb-6 font-mono">{step.subtext}</p>}

              <div className="space-y-3">
                {step.options.map(opt => {
                  const selected = answers[step.id] === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => selectOption(step.id, opt.value)}
                      className={`w-full text-left p-4 border-2 transition-all flex items-center gap-4 ${
                        selected
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-black hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="flex-1 text-sm font-bold">{opt.label}</span>
                      <ChevronRight className="w-4 h-4 shrink-0 opacity-50" />
                    </button>
                  )
                })}
              </div>

              {currentStep > 0 && (
                <button onClick={() => setCurrentStep(currentStep - 1)} className="mt-5 text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors">
                  ← Back
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-serif mb-1">Your Top 3 Matches</h2>
              <p className="text-gray-500 font-mono text-sm">
                Based on {formatCurrency(Number(answers.amount))} · {answers.income} income · {answers.speed} need
              </p>
            </div>

            {matches.length === 0 ? (
              <div className="border-2 border-black p-8 text-center text-gray-500 font-mono">
                No perfect matches found. Try adjusting your amount.
              </div>
            ) : (
              matches.map((app, i) => (
                <div key={app.id} className={`border-2 overflow-hidden ${i === 0 ? 'border-black' : 'border-gray-300'}`}>
                  {i === 0 && <div className="h-1 bg-emerald-600" />}
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl shrink-0">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-bold font-serif text-lg">{app.name}</h3>
                          <span className={`text-xs font-mono font-bold px-2.5 py-0.5 border-2 uppercase tracking-wide ${
                            i === 0 ? 'bg-black text-white border-black' :
                            i === 1 ? 'bg-gray-100 text-gray-700 border-gray-400' :
                                      'bg-gray-50 text-gray-600 border-gray-300'
                          }`}>
                            {MATCH_LABELS[i]}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono mt-2 mb-3">
                          <div><span className="text-gray-500">Rate:</span> <span className="text-gray-700">{app.interestRate}</span></div>
                          <div><span className="text-gray-500">Speed:</span> <span className="text-gray-700">{app.processingTime}</span></div>
                          <div><span className="text-gray-500">Max:</span> <span className="text-gray-700">{formatCurrency(app.maxAmount)}</span></div>
                          <div><span className="text-gray-500">Approval:</span> <span className="text-emerald-600 font-bold">{approvalLabels[answers.income] || 'Good'}</span></div>
                        </div>

                        <p className="text-gray-500 text-xs leading-relaxed mb-3">{app.description}</p>

                        <div className="flex flex-wrap items-center gap-2">
                          <a href={app.downloadLink} target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 bg-black text-white font-bold font-mono border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors uppercase tracking-wide text-xs">
                            Apply for {app.name} →
                          </a>
                          {app.crbReporting && (
                            <span className="flex items-center gap-1 text-xs font-mono text-amber-600">
                              <AlertTriangle className="w-3 h-3" /> Reports to CRB
                            </span>
                          )}
                          {!app.crbReporting && (
                            <span className="text-xs font-mono text-emerald-600 font-bold">✓ No CRB reporting</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-black px-5 py-3 bg-gray-50">
                    <p className="text-xs font-mono text-gray-500">
                      <span className="font-bold text-gray-700">Why matched: </span>
                      {app.id === 'hustler-fund'       ? 'Cheapest rate in Kenya at 8% p.a. — ideal for your profile.' :
                       app.category === 'bank'         ? 'Bank-backed product — lower rates and higher limits.' :
                       app.processingTime === 'Instant'? 'Instant disbursement matches your urgency.' :
                                                         'Strong approval rate for your income type.'}
                    </p>
                  </div>
                </div>
              ))
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/#compare"
                className="flex-1 text-center py-3 border-2 border-black text-gray-900 font-bold font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-wide text-sm">
                Compare All Apps
              </Link>
              <Link href="/total-cost-calculator"
                className="flex-1 text-center py-3 border-2 border-black text-gray-900 font-bold font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-wide text-sm">
                See Total Cost
              </Link>
            </div>

            <button onClick={restart} className="w-full flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-gray-900 font-mono text-sm transition-colors border-2 border-gray-200 hover:border-black">
              <RotateCcw className="w-4 h-4" /> Start Again
            </button>
          </div>
        )}
      </div>

      {/* Related guides */}
      <section className="max-w-2xl mx-auto px-4 pb-12 mt-8">
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Before You Apply</h2>
        <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          {[
            { href: '/total-cost-calculator', emoji: '🧮', title: 'Calculate True Cost', desc: 'See total repayment including all fees first' },
            { href: '/cbk-licensed',          emoji: '✅', title: 'CBK Licensed List',   desc: 'Verify your chosen app is regulated' },
            { href: '/crb-check',             emoji: '📊', title: 'Check Your CRB',      desc: 'Know your credit status before applying' },
            { href: '/blacklist',             emoji: '🚫', title: 'Apps to Avoid',       desc: 'Blacklisted and predatory lenders in Kenya' },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors group">
              <span className="text-xl shrink-0">{g.emoji}</span>
              <div>
                <p className="font-bold font-serif group-hover:text-emerald-600 transition-colors text-sm">{g.title}</p>
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
