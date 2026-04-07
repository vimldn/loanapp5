'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">

        <Link href="/" className="inline-flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
          <Image src="/logo-256.png" alt="LoanApp logo" width={56} height={56} priority className="border-2 border-black" />
          <div className="text-left">
            <h1 className="text-2xl font-bold font-serif tracking-tighter">LoanApp.co.ke</h1>
            <p className="text-sm font-mono uppercase tracking-wider text-gray-500">Compare loan apps in Kenya</p>
          </div>
        </Link>

        <div className="border-2 border-black p-8 md:p-12 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-black" />
          <div className="text-8xl font-bold font-serif text-gray-900 mb-4 tracking-tighter">404</div>
          <h2 className="text-3xl font-bold font-serif mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6 font-mono text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="font-mono text-sm font-bold text-emerald-600 mb-8 uppercase tracking-wide">
            Redirecting to homepage in a few seconds…
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-black text-white font-bold font-mono border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors uppercase tracking-wide">
              Back to Home
            </Link>
            <Link href="/#calculator" className="px-6 py-3 border-2 border-black text-gray-900 font-bold font-mono hover:bg-black hover:text-white transition-colors uppercase tracking-wide">
              Loan Calculator
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm font-mono text-gray-500">
          <p className="mb-3 uppercase tracking-wide">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#compare" className="hover:text-emerald-600 transition-colors">Compare Loans</Link>
            <Link href="/#tips"    className="hover:text-emerald-600 transition-colors">Borrowing Tips</Link>
            <Link href="/blog"     className="hover:text-emerald-600 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
