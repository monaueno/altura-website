import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getData } from '../utils/storage';

function Blog() {
  const data = getData();
  const [copiedId, setCopiedId] = useState(null);
  const posts = (data.blog || []).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Group posts by month/year
  const grouped = posts.reduce((acc, post) => {
    const d = new Date(post.date);
    const key = d.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }).toUpperCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});

  // Scroll reveal
  const revealRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  // Placeholder gradients for posts without cover images
  const placeholderColors = [
    'linear-gradient(135deg, #1a1a1a, #333333)',
    'linear-gradient(135deg, #2a2a2a, #444444)',
    'linear-gradient(135deg, #1e2a3a, #3a3a3a)',
  ];

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Header */}
      <section className="pt-[180px] pb-12 px-6 max-w-[1300px] mx-auto">
        <h1
          className="font-display font-bold text-[28px] md:text-[50px] leading-[1.05] uppercase text-near-black max-w-[656px]"
          ref={addRevealRef}
        >
          {data.home?.blogHeadline || 'Ideas, insights, and the occasional hot take.'}
        </h1>
      </section>

      {/* Blog Posts */}
      <section className="px-6 pb-24 max-w-[1300px] mx-auto">
        {Object.entries(grouped).map(([monthYear, monthPosts]) => (
          <div key={monthYear} className="mb-16">
            {/* Month header */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              <div className="lg:w-[200px] shrink-0" ref={addRevealRef}>
                <h2 className="font-display font-bold text-[28px] md:text-[40px] leading-[1.05] uppercase text-near-black">
                  {monthYear}
                </h2>
              </div>

              {/* Posts */}
              <div className="flex-1 space-y-12">
                {monthPosts.map((post, i) => (
                  <article key={post.id} className="reveal" ref={addRevealRef}>
                    {/* Cover image */}
                    <div className="w-full h-[200px] md:h-[347px] rounded-[10px] overflow-hidden mb-4">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: placeholderColors[i % placeholderColors.length] }}
                        >
                          <span className="font-display font-bold text-white/20 text-[80px] uppercase">
                            Blog
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Post meta row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <h3 className="font-display font-semibold text-[20px] md:text-[27px] leading-[1.1] uppercase text-near-black max-w-full md:max-w-[533px]">
                        {post.title}
                      </h3>

                      <div className="flex items-center gap-4 shrink-0">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="bg-near-black text-white font-display font-bold text-[20px] tracking-[0.05em] uppercase px-6 py-3 hover:bg-dark-gray transition-colors"
                        >
                          Read More
                        </Link>

                        {/* Divider */}
                        <div className="w-px h-[60px] bg-near-black/20 hidden md:block" />

                        {/* Share icon */}
                        <div className="relative flex flex-col gap-3">
                          <button
                            aria-label={`Share "${post.title}"`}
                            onClick={async () => {
                              const url = `${window.location.origin}/blog/${post.slug}`;
                              await navigator.clipboard.writeText(url);
                              if (navigator.share) {
                                navigator.share({ title: post.title, url }).catch(() => {});
                              }
                              setCopiedId(post.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="text-near-black/60 hover:text-near-black transition-colors cursor-pointer bg-transparent border-none"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                          </button>
                          {copiedId === post.id && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-near-black text-white px-5 py-2.5 rounded-lg text-[0.9rem] font-display font-medium tracking-wide whitespace-nowrap animate-[fadeIn_0.2s_ease-out] shadow-lg">
                              Link copied!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Blog;
