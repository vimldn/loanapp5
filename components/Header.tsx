'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from '@/components/Icons';

const hubLinks = [
  { href: '/cbk-licensed', label: 'CBK Licensed Apps' },
  { href: '/blacklist',    label: 'Blacklist ⚠️' },
  { href: '/crb-check',   label: 'CRB Guide' },
  { href: '/sacco-vs-digital', label: 'Sacco vs Digital' },
];

const NAV_LINKS = [
  { href: '/#calculator', label: 'Calculator' },
  { href: '/#compare',    label: 'Compare' },
  { href: '/blog',        label: 'Blog' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);

  return (
    <header className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/logo-256.png" alt="LoanApp.co.ke" width={36} height={36} priority className="border-2 border-black" />
          <div>
            <div className="text-lg font-bold text-gray-900 font-serif leading-none tracking-tighter">LoanApp.co.ke</div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Compare loan apps in Kenya</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-sm font-bold uppercase">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group px-4 py-2 overflow-hidden border-2 border-transparent hover:border-black transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{item.label}</span>
              <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </Link>
          ))}

          {/* Guides dropdown */}
          <div className="relative group">
            <button className="relative flex items-center gap-1 px-4 py-2 overflow-hidden border-2 border-transparent hover:border-black transition-all duration-300">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Guides</span>
              <ChevronDown className="w-3.5 h-3.5 relative z-10 group-hover:text-white transition-colors duration-300" />
              <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </button>
            <div className="absolute top-full left-0 w-56 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-1 group-hover:translate-y-0 z-50">
              {hubLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block px-4 py-3 text-sm text-gray-900 hover:bg-black hover:text-white border-b border-gray-200 last:border-b-0 transition-colors font-mono font-bold uppercase tracking-wide"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/#compare"
            className="ml-2 px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors duration-200"
          >
            Get a Loan
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-black px-4 py-4 flex flex-col gap-1 font-mono text-sm font-bold uppercase">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block p-3 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="px-3 pt-2 pb-1 border-t-2 border-black mt-1">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Guides</p>
            {hubLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm text-gray-900 hover:text-emerald-600 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              href="/#compare"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-2.5 bg-black text-white font-bold border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors"
            >
              Get a Loan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
