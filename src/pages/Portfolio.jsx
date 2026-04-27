import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const siteData = getData();
    setPortfolioItems(siteData.portfolio || []);
    setHeroData(siteData.portfolioHero || {
      title: 'Our Work',
      subtitle: 'Strategic creative that drives results. Every project is built on insight, intention, and execution.',
      backgroundImage: ''
    });
  }, []);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === portfolioItems.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex((prev) => prev + 1);
  };

  if (portfolioItems.length === 0) {
    return (
      <div className="min-h-screen bg-portfolio-cream">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-mid-gray text-[1.1rem] font-subheading">
            No portfolio items yet. Add some from the admin dashboard!
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Hero Section */}
      <section
        className="px-12 py-12 bg-near-black relative h-[80vh] min-h-[320px] flex items-center justify-end overflow-hidden"
        style={{
          backgroundImage: heroData?.backgroundImage ? `url(${heroData.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay if background image exists */}
        {heroData?.backgroundImage && (
          <div className="absolute inset-0 bg-near-black/60" />
        )}

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-white mb-6 leading-[1.1]">
            {heroData?.title || 'Our Work'}
          </h1>
          <p className="text-white/70 text-[1.1rem] font-subheading max-w-2xl mx-auto">
            {heroData?.subtitle || 'Strategic creative that drives results. Every project is built on insight, intention, and execution.'}
          </p>
        </div>
      </section>

      {/* Portfolio Card Section */}
      <section className="bg-portfolio-cream px-12 pb-16">
        <div className="max-w-[1300px] mx-auto">
          <PortfolioSlide item={portfolioItems[currentIndex]} />

          {/* Navigation Arrows */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              aria-label="Previous project"
              className={`relative w-[47px] h-[47px] rounded-full border-2 transition-all select-none ${
                isFirst
                  ? 'border-mid-gray/20 text-mid-gray/30 cursor-default'
                  : 'border-near-black text-near-black hover:bg-near-black hover:text-white cursor-pointer'
              }`}
            >
              <svg
                className="absolute inset-0 m-auto pointer-events-none"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isLast}
              aria-label="Next project"
              className={`relative w-[47px] h-[47px] rounded-full border-2 transition-all select-none ${
                isLast
                  ? 'border-mid-gray/20 text-mid-gray/30 cursor-default'
                  : 'border-near-black text-near-black hover:bg-near-black hover:text-white cursor-pointer'
              }`}
            >
              <svg
                className="absolute inset-0 m-auto pointer-events-none"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative overflow-hidden">
        {/* Dark background with mountain image */}
        <div className="absolute inset-0">
          <img
            src="/assets/Images/Mountains/background-mountain.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-near-black/80" />
        </div>

        <div className="relative z-10 py-24 px-12">
          <div className="max-w-[1300px] mx-auto">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="font-display text-[40px] font-bold text-white leading-[1.05] tracking-[0.05em] uppercase mb-4">
                {mountainData?.title || 'CASE STUDIES'}
              </h2>
              <p className="font-subheading font-light text-[18px] text-white/80 max-w-[570px] mx-auto leading-[1.25]">
                {mountainData?.subtitle || 'Explore our full-length case studies and see how strategy, creativity, and execution come together to drive real impact.'}
              </p>
            </div>

            {/* Case Study Card */}
            {portfolioItems.length > 0 && (
              <Link
                to={`/portfolio/${portfolioItems[0].slug}`}
                className="block mx-auto max-w-[948px] h-[381px] rounded-[10px] overflow-hidden relative group"
              >
                <img
                  src={portfolioItems[0].image}
                  alt={portfolioItems[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                {/* Card content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                  <h3 className="font-display font-bold text-[40px] text-white leading-[1.1] uppercase text-center mb-4">
                    Luxury Home Brand Case Study
                  </h3>
                  <span className="inline-block border-2 border-white rounded-full px-6 py-1 font-display font-bold text-[16px] text-white tracking-[0.05em] uppercase">
                    Paid Advertising
                  </span>
                </div>
              </Link>
            )}

            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <p className="font-subheading font-light text-[18px] text-white/60 mb-2">
                More impact in the works...
              </p>
              <h3 className="font-display font-bold text-[30px] text-white leading-[1.1] uppercase max-w-[400px] mx-auto mb-10">
                Our next success story could be yours.
              </h3>
              <a
                href="#contact"
                className="inline-block bg-white text-near-black font-display font-bold text-[20px] tracking-[0.05em] uppercase px-6 py-3 hover:bg-accent-light transition-colors"
              >
                Hire Us!
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PortfolioSlide({ item }) {
  return (
    <div className="flex gap-12 lg:gap-20">
      {/* Left — Image */}
      <div className="w-[36%] flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[656px] object-cover rounded-[8px]"
          />
        ) : (
          <div className="w-full h-[656px] bg-mid-gray/10 rounded-[8px]" />
        )}
      </div>

      {/* Right — Strategy + Performance */}
      <div className="flex-1 flex flex-col justify-start py-4">
        {/* AD STRATEGY */}
        {item.strategyBullets && item.strategyBullets.length > 0 && (
          <div>
            <h3 className="font-display text-[20px] font-bold text-near-black mb-6 tracking-[0.08em] uppercase">
              Ad Strategy
            </h3>
            <div className="space-y-6 ml-6">
              {item.strategyBullets.map((bullet, i) => (
                <div key={i}>
                  <p className="font-body text-[15px] font-bold text-near-black leading-[1.4] tracking-[0.02em]">
                    {bullet.title || bullet}
                  </p>
                  {bullet.description && (
                    <p className="font-body text-[15px] text-near-black/70 leading-[1.5] tracking-[0.02em]">
                      {bullet.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PERFORMANCE */}
        {item.metrics && item.metrics.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-[20px] font-bold text-near-black mb-6 tracking-[0.08em] uppercase">
              Performance
            </h3>
            <div className="flex gap-12 ml-6">
              {item.metrics.map((metric, i) => (
                <div key={i} className="flex-1">
                  {/* Metric pill */}
                  <div className="inline-block border-2 border-near-black rounded-full px-5 py-1.5 mb-5">
                    <span className="font-body text-[15px] font-bold text-near-black tracking-[0.02em]">
                      {metric.label}: {metric.value}
                    </span>
                  </div>

                  <p className="font-body text-[13px] font-normal text-near-black uppercase tracking-wide">
                    {metric.industryLabel}
                  </p>
                  {metric.industryContext && (
                    <p className="font-body text-[13px] italic text-near-black/60 mb-4">
                      {metric.industryContext}
                    </p>
                  )}

                  {/* Benchmarks */}
                  <div className="space-y-0.5">
                    {metric.benchmarks.map((b, j) => (
                      <p
                        key={j}
                        className={`font-body text-[13px] text-near-black/70 ${
                          b.bold ? 'font-bold italic text-near-black' : ''
                        }`}
                      >
                        {b.level}: {b.range}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
