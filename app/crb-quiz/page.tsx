'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, CheckCircle2, AlertTriangle, XCircle, ArrowLeft } from '@/components/Icons'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Question = {
  id: number
  text: string
  subtext?: string
  options: { label: string; value: string; risk: number }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Have you ever missed a loan repayment by more than 30 days?',
    subtext: 'This includes M-Shwari, Tala, Branch, KCB M-Pesa, Fuliza, or any bank loan.',
    options: [
      { label: 'Never — I always pay on time', value: 'never', risk: 0 },
      { label: 'Maybe once, but I eventually paid', value: 'once', risk: 2 },
      { label: 'Yes, more than once', value: 'multiple', risk: 4 },
    ],
  },
  {
    id: 2,
    text: 'Do you currently have any outstanding loan you have not fully repaid?',
    subtext: 'Include loans from apps, banks, Saccos, or government funds.',
    options: [
      { label: 'No, all loans are cleared', value: 'clear', risk: 0 },
      { label: 'I have an active loan I am repaying on time', value: 'active', risk: 0 },
      { label: 'I have an overdue loan I have not repaid', value: 'overdue', risk: 5 },
    ],
  },
  {
    id: 3,
    text: 'Have you received any threatening messages from a loan app about CRB listing?',
    subtext: 'Some apps send CRB warnings even for small late payments.',
    options: [
      { label: 'No, never received such a message', value: 'no', risk: 0 },
      { label: 'Yes, but I paid within a few days', value: 'paid', risk: 1 },
      { label: 'Yes, and I did not pay in time', value: 'unpaid', risk: 4 },
    ],
  },
  {
    id: 4,
    text: 'Have you been rejected for a loan recently without a clear reason?',
    subtext: 'Unexplained rejections often indicate a CRB listing.',
    options: [
      { label: 'No recent rejections', value: 'no', risk: 0 },
      { label: 'Rejected once — possibly for other reasons', value: 'once', risk: 1 },
      { label: 'Rejected multiple times across different apps', value: 'multiple', risk: 3 },
    ],
  },
  {
    id: 5,
    text: 'Do you have any disputes with a loan app over an amount you believe you do not owe?',
    subtext: 'Wrong listings by apps are more common than you might think.',
    options: [
      { label: 'No disputes — everything is accurate', value: 'no', risk: 0 },
      { label: 'I have a dispute but it was resolved', value: 'resolved', risk: 1 },
      { label: 'Yes, I have an unresolved dispute with a lender', value: 'unresolved', risk: 3 },
    ],
  },
]

type Result = {
  level: 'clean' | 'monitor' | 'likely' | 'critical'
  headline: string
  message: string
  action: string
  color: string
  icon: typeof CheckCircle2
}

function getResult(score: number): Result {
  if (score === 0) return {
    level: 'clean',
    headline: 'Your CRB record looks clean',
    message: 'Based on your answers, you are unlikely to have a negative CRB listing. Keep maintaining good repayment habits — a clean CRB opens doors to better loan rates and bank products.',
    action: 'Confirm with a free check on *433#',
    color: 'emerald',
    icon: CheckCircle2,
  }
  if (score <= 3) return {
    level: 'monitor',
    headline: 'Low risk — but worth checking',
    message: 'Your history suggests a mostly clean record, but there may be minor issues. A quick *433# check will confirm. Some loan apps list for even KES 1,000 defaults without proper notice.',
    action: 'Do a free check now — dial *433#',
    color: 'blue',
    icon: CheckCircle2,
  }
  if (score <= 7) return {
    level: 'likely',
    headline: 'You may have a CRB listing',
    message: 'Your answers suggest a moderate-to-high chance of a negative CRB listing. This could be blocking loan approvals you are not aware of. Check immediately — if listed, the repair process starts with settling the original debt.',
    action: 'Check now and start your repair plan',
    color: 'amber',
    icon: AlertTriangle,
  }
  return {
    level: 'critical',
    headline: 'High chance you are CRB listed',
    message: 'Based on your answers, you very likely have one or more negative CRB listings. This affects your ability to get loans, mortgages, and some jobs. The good news: it is fixable. Start the process today.',
    action: 'Get your full CRB report and repair guide',
    color: 'red',
    icon: XCircle,
  }
}

export default function CRBQuizPage() {
  const [answers, setAnswers]       = useState<Record<number, { value: string; risk: number }>>({})
  const [currentQ, setCurrentQ]     = useState(0)
  const [showResult, setShowResult] = useState(false)

  const totalScore = Object.values(answers).reduce((sum, a) => sum + a.risk, 0)
  const result     = getResult(totalScore)
  const progress   = Math.round((currentQ / QUESTIONS.length) * 100)
  const question   = QUESTIONS[currentQ]

  function selectAnswer(qId: number, value: string, risk: number) {
    const newAnswers = { ...answers, [qId]: { value, risk } }
    setAnswers(newAnswers)
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 400)
    }
  }

  function restart() {
    setAnswers({})
    setCurrentQ(0)
    setShowResult(false)
  }

  const colorMap = {
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-700', btn: 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700' },
    blue:    { bg: 'bg-blue-50',    border: 'border-blue-500',    text: 'text-blue-700',    btn: 'bg-blue-600 border-blue-600 hover:bg-blue-700' },
    amber:   { bg: 'bg-amber-50',   border: 'border-amber-500',   text: 'text-amber-700',   btn: 'bg-amber-600 border-amber-600 hover:bg-amber-700' },
    red:     { bg: 'bg-red-50',     border: 'border-red-500',     text: 'text-red-700',     btn: 'bg-red-600 border-red-600 hover:bg-red-700' },
  } as const
  const c = colorMap[result.color as keyof typeof colorMap]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 text-sm font-mono">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-blue-600 text-blue-600 px-3 py-1 mb-5 inline-flex items-center gap-2">
            <Search className="w-4 h-4" /> Am I CRB Blacklisted?
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight mt-4 mb-2">Quick CRB Risk Assessment</h1>
          <p className="text-gray-600 font-mono text-sm">5 questions · 2 minutes · Get your personalised result instantly</p>
        </div>

        {!showResult ? (
          <div className="border-2 border-black overflow-hidden">
            {/* Progress bar */}
            <div className="h-2 bg-gray-200">
              <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wide">Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span className="text-xs font-mono font-bold text-emerald-600">{progress}% complete</span>
              </div>

              <h2 className="text-xl font-bold font-serif mb-2">{question.text}</h2>
              {question.subtext && (
                <p className="text-gray-500 text-sm mb-6 font-mono">{question.subtext}</p>
              )}

              <div className="space-y-3">
                {question.options.map(opt => {
                  const selected = answers[question.id]?.value === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => selectAnswer(question.id, opt.value, opt.risk)}
                      className={`w-full text-left p-4 border-2 transition-all flex items-center gap-3 ${
                        selected
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-black hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-all ${
                        selected ? 'border-white bg-white' : 'border-gray-400'
                      }`}>
                        {selected && <div className="w-2 h-2 bg-black" />}
                      </div>
                      <span className="text-sm font-medium">{opt.label}</span>
                      <ChevronRight className="w-4 h-4 ml-auto shrink-0 opacity-50" />
                    </button>
                  )
                })}
              </div>

              {currentQ > 0 && (
                <button onClick={() => setCurrentQ(currentQ - 1)} className="mt-5 text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors">
                  ← Previous question
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Result card */}
            <div className={`border-2 p-7 ${c.bg} ${c.border}`}>
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 border-2 flex items-center justify-center shrink-0 ${c.border}`}>
                  <result.icon className={`w-7 h-7 ${c.text}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold font-serif ${c.text} mb-1`}>{result.headline}</h2>
                  <p className="text-xs font-mono text-gray-500">Risk score: {totalScore}/17</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5">{result.message}</p>

              <div className="bg-white border-2 border-black p-4">
                <p className="text-xs font-mono font-bold text-gray-500 mb-2 uppercase tracking-widest">Recommended Next Step</p>
                <p className="font-bold font-serif mb-4">{result.action}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:*433%23"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-white font-bold font-mono border-2 transition-colors uppercase tracking-wide text-sm ${c.btn}`}>
                    Dial *433# (Free check)
                  </a>
                  <Link href="/crb-check"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-black text-gray-900 font-bold font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-wide text-sm">
                    Full CRB Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Answer summary */}
            <div className="border-2 border-black p-5">
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Your Answers</h3>
              <div className="space-y-4">
                {QUESTIONS.map(q => {
                  const ans = answers[q.id]
                  const opt = q.options.find(o => o.value === ans?.value)
                  return (
                    <div key={q.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                      <span className={`text-xs font-bold font-mono w-5 shrink-0 mt-0.5 ${ans?.risk === 0 ? 'text-emerald-600' : ans?.risk <= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                        Q{q.id}
                      </span>
                      <div>
                        <p className="text-gray-500 text-xs">{q.text}</p>
                        <p className={`text-sm font-bold font-serif mt-0.5 ${ans?.risk === 0 ? 'text-emerald-600' : ans?.risk <= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                          {opt?.label}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button onClick={restart} className="w-full py-3 border-2 border-black text-gray-700 hover:bg-black hover:text-white transition-colors font-mono font-bold uppercase tracking-wide text-sm">
              Retake the Quiz
            </button>
          </div>
        )}
      </div>

      {/* Related guides */}
      <section className="max-w-2xl mx-auto px-4 pb-12 mt-8">
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Next Steps</h2>
        <div className="grid sm:grid-cols-2 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          {[
            { href: '/crb-check',  emoji: '📊', title: 'Full CRB Check Guide',  desc: 'How to get your full credit report and dispute errors' },
            { href: '/blacklist',  emoji: '🚫', title: 'Loan App Blacklist',     desc: 'Apps known for illegal CRB listings' },
            { href: '/cbk-licensed', emoji: '✅', title: 'Licensed Apps Only',  desc: 'Borrow from regulated lenders to protect your CRB' },
            { href: '/loan-finder',emoji: '🔍', title: 'Find a Loan',           desc: 'Options available even with CRB issues' },
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
