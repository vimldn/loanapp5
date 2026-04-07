import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedBlogPosts } from '@/data/all-blog-posts';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.metaTitle} | LoanApp.co.ke`,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(slug, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b-2 border-black bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm font-mono text-gray-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="mx-2 text-gray-300">›</span>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            <span className="mx-2 text-gray-300">›</span>
            <span className="text-gray-700 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10 pb-8 border-b-2 border-black">
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed italic font-serif">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm font-mono">
            <time dateTime={post.publishedAt} className="text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
            <span className="border-2 border-black px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">
              {post.category || 'Loan Guide'}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-10 border-2 border-black overflow-hidden">
            <img src={post.featuredImage} alt={post.title} className="w-full" />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b-2 prose-h2:border-black prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-emerald-700
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-emerald-700 hover:prose-a:underline prose-a:font-bold
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-ul:my-4 prose-ul:text-gray-700
            prose-ol:my-4 prose-ol:text-gray-700
            prose-li:text-gray-700 prose-li:mb-1
            prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-table:border-2 prose-table:border-black
            prose-thead:bg-black
            prose-th:p-3 prose-th:text-left prose-th:text-white prose-th:font-bold prose-th:border prose-th:border-black
            prose-td:p-3 prose-td:border-2 prose-td:border-black prose-td:text-gray-700
            prose-tr:hover:bg-emerald-50
            prose-img:my-8 prose-img:mx-auto prose-img:border-2 prose-img:border-black
            prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-12 p-6 border-2 border-black bg-gray-50 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          <h3 className="font-serif text-xl font-bold mb-2">Ready to compare loan apps?</h3>
          <p className="text-gray-600 mb-5 text-sm">Use our calculator to see exactly what you&apos;ll pay back with each app.</p>
          <Link href="/#calculator"
            className="inline-flex items-center px-5 py-2.5 bg-black text-white font-bold font-mono border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-colors uppercase tracking-wide text-sm">
            Try the Calculator →
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t-2 border-black py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-0 border-2 border-black divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}
                  className="p-6 hover:bg-gray-50 transition-colors group">
                  <h3 className="font-serif font-bold group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{relatedPost.excerpt}</p>
                  <span className="font-mono text-xs font-bold text-emerald-600 uppercase">Read →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 py-6 border-t-2 border-black">
        <Link href="/blog" className="inline-flex items-center gap-2 font-mono font-bold text-sm text-gray-700 hover:text-emerald-600 transition-colors uppercase tracking-wide">
          ← Back to all guides
        </Link>
      </div>

      <Footer />
    </div>
  );
}
