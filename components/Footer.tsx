import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo-256.png" alt="LoanApp.co.ke" width={32} height={32} className="border-2 border-white" />
              <span className="text-xl font-bold font-serif tracking-tighter">LoanApp.co.ke</span>
            </div>
            <p className="text-gray-400 max-w-sm font-mono text-sm leading-relaxed">
              Kenya&apos;s consumer guard for digital lending. Compare rates, avoid predatory apps, and borrow smarter.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Safety Guides</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li><Link href="/cbk-licensed" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">CBK Licensed Apps 2026</Link></li>
              <li><Link href="/blacklist"    className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Apps to Avoid ⚠️</Link></li>
              <li><Link href="/crb-check"   className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">CRB Check &amp; Repair</Link></li>
              <li><Link href="/sacco-vs-digital" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Sacco vs Digital Apps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 text-gray-500">Resources</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li><Link href="/#compare"    className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">All Loan Apps</Link></li>
              <li><Link href="/#calculator" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Loan Calculator</Link></li>
              <li><Link href="/#tips"       className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Borrowing Tips</Link></li>
              <li><Link href="/blog"        className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Guides &amp; Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-gray-500">
          <p>© {new Date().getFullYear()} LoanApp.co.ke. All rights reserved.</p>
          <p className="text-center md:text-right max-w-2xl">
            Disclaimer: For informational purposes only. We do not issue loans. Always verify exact interest rates, terms, and conditions with the official lender before accepting any credit facility.
          </p>
        </div>
      </div>
    </footer>
  );
}
