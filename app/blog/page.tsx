import Link from 'next/link';
import { getAllBlogPosts } from '@/data/all-blog-posts';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Loan App Guides & Tips | LoanApp.co.ke Blog',
  description: 'Expert guides on Kenyan loan apps: M-Shwari, Tala, Branch, Hustler Fund, Fuliza. Learn about interest rates, CRB, approval tips, and how to get the cheapest loans.',
};

const CATEGORY_CONFIG = [
  {
    key: 'comparisons',
    label: 'Comparisons',
    emoji: '⚖️',
    tag: 'VS',
    filter: (t: string) => t.toLowerCase().includes('which') || t.toLowerCase().includes(' vs ') || t.toLowerCase().includes(' or '),
    description: 'Side-by-side breakdowns of the top loan apps',
  },
  {
    key: 'costs',
    label: 'Costs & Fees',
    emoji: '💵',
    tag: 'KSH',
    filter: (t: string) => t.toLowerCase().includes('how much') || t.toLowerCase().includes('interest') || t.toLowerCase().includes('fee') || t.toLowerCase().includes('charge') || t.toLowerCase().includes('cost') || t.toLowerCase().includes('cheap'),
    description: 'Real numbers on what you actually pay',
  },
  {
    key: 'howto',
    label: 'How-To Guides',
    emoji: '📋',
    tag: 'GUIDE',
    filter: (t: string) => t.toLowerCase().includes('how do') || t.toLowerCase().includes('how to') || t.toLowerCase().includes('how can'),
    description: 'Step-by-step walkthroughs for borrowers',
  },
  {
    key: 'faqs',
    label: 'FAQs & Warnings',
    emoji: '⚠️',
    tag: 'KNOW',
    filter: (t: string) => t.toLowerCase().includes('what') || t.toLowerCase().includes('why') || t.toLowerCase().includes('is ') || t.toLowerCase().includes('are ') || t.toLowerCase().includes('can '),
    description: 'What you need to know before borrowing',
  },
];

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categorised = CATEGORY_CONFIG.map(cat => ({
    ...cat,
    posts: posts.filter(p => cat.filter(p.title)),
  }));
  const featured = posts.slice(0, 3);
  const allCount = posts.length;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero */}
      <section className="border-b-2 border-black py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-black px-3 py-1 mb-6 inline-block hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
              Kenya&apos;s Loan Knowledge Base
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-serif leading-none tracking-tight mb-4">
              Borrow Smarter.<br />
              <span className="text-emerald-600 italic">Pay Less.</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Honest, data-driven guides on M-Shwari, Tala, Branch, Hustler Fund, Fuliza — and every app in between.
            </p>
          </div>
          <div className="flex gap-0 border-2 border-black shrink-0">
            <div className="text-center px-10 py-6 border-r-2 border-black">
              <div className="text-5xl font-bold font-mono text-emerald-600 leading-none">{allCount}</div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-2">Guides</div>
            </div>
            <div className="text-center px-10 py-6">
              <div className="text-5xl font-bold font-mono text-emerald-600 leading-none">{CATEGORY_CONFIG.length}</div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mt-2">Topics</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">

        {/* Featured */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-serif text-2xl font-bold whitespace-nowrap">Featured</h2>
            <div className="h-0.5 flex-1 bg-black" />
          </div>
          <div className="grid lg:grid-cols-3 gap-0 border-2 border-black divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black">
            {featured[0] && (
              <Link href={`/blog/${featured[0].slug}`}
                className="lg:col-span-2 group block hover:bg-gray-50 transition-colors">
                {featured[0].featuredImage ? (
                  <div className="aspect-video overflow-hidden border-b-2 border-black">
                    <img src={featured[0].featuredImage} alt={featured[0].title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="aspect-video bg-black flex items-center justify-center border-b-2 border-black text-5xl">💰</div>
                )}
                <div className="p-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-emerald-600 text-emerald-600 px-2 py-0.5 mb-3 inline-block">Featured</span>
                  <h3 className="font-serif text-2xl font-bold mb-3 leading-snug group-hover:text-emerald-600 transition-colors">{featured[0].title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{featured[0].excerpt}</p>
                  <span className="inline-block mt-4 font-mono text-sm font-bold text-emerald-600 uppercase tracking-wide">Read guide →</span>
                </div>
              </Link>
            )}
            <div className="divide-y-2 divide-black">
              {featured.slice(1).map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="flex gap-4 p-5 hover:bg-gray-50 transition-colors group h-1/2">
                  <div className="w-20 h-16 shrink-0 border-2 border-black overflow-hidden bg-emerald-50 flex items-center justify-center">
                    {post.featuredImage
                      ? <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      : <span className="text-2xl">💰</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm leading-snug mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h4>
                    <p className="text-gray-500 text-xs line-clamp-2">{post.excerpt}</p>
                    <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-600">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category Sections */}
        {categorised.map(cat => cat.posts.length > 0 && (
          <section key={cat.key}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl">{cat.emoji}</span>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl font-bold">{cat.label}</h2>
                  <span className="font-mono text-xs font-bold border-2 border-black px-2 py-0.5 uppercase tracking-wide">{cat.tag}</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mt-0.5">{cat.description}</p>
              </div>
              <div className="h-0.5 flex-1 bg-black ml-2" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-black">
              {cat.posts.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className={`flex gap-3 p-5 hover:bg-gray-50 transition-colors group border-b-2 border-r-2 border-black ${i % 3 === 2 ? 'lg:border-r-0' : ''} ${i % 2 === 1 ? 'sm:border-r-0 lg:border-r-2' : ''}`}>
                  <div className="w-16 h-12 shrink-0 border-2 border-black overflow-hidden bg-emerald-50 flex items-center justify-center">
                    {post.featuredImage
                      ? <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      : <span className="text-xl">💰</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm leading-snug mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h4>
                    <span className="font-mono text-xs font-bold text-emerald-600">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

      </main>

      <Footer />
    </div>
  );
}
