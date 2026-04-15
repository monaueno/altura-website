import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [mountainData, setMountainData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const siteData = getData();
    setPortfolioItems(siteData.portfolio || []);
    setHeroData(siteData.portfolioHero || {
      title: 'Our Work',
      subtitle: 'Strategic creative that drives results. Every project is built on insight, intention, and execution.',
      backgroundImage: '',
      logo: ''
    });
    setMountainData(siteData.portfolioMountain || {
      title: 'CASE STUDIES',
      subtitle: 'Explore our full-length case studies and see how strategy, creativity, and execution come together to drive real impact.'
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

  // Only show cards that haven't been viewed yet (current + upcoming)
  const remaining = portfolioItems.length - currentIndex;
  const CARD_H = 500;

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Small Hero Section */}
      <section
        className="px-12 pt-40 min-h-[55vh] flex items-center bg-portfolio-cream relative overflow-hidden"
      >

        <div className="max-w-7xl text-left flex flex-col justify-center relative z-10">
          {heroData?.logo && (
            <img
              src={heroData.logo}
              alt="Brand logo"
              className="max-h-[80px] object-contain mb-4"
            />
          )}
          <h1 className="font-display text-[clamp(3rem,10vw,3rem)] font-bold text-near-black mb-1 leading-[1.1] tracking-[0.05em]">
            {heroData?.title || 'Our Work'}
          </h1>
          <p className="text-blue-dark text-[1.5rem] font-subheading italic max-w-2xl">
            {heroData?.subtitle || 'Strategic creative that drives results.'}
          </p>
        </div>
      </section>

      {/* Portfolio Card Section */}
      <section className="bg-portfolio-cream px-12 pb-16">
        <PortfolioSlide item={portfolioItems[currentIndex]} />

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-4 mt-10 max-w-7xl">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`w-12 h-12 border-2 rounded-full cursor-pointer flex items-center justify-center transition-all ${
              isFirst
                ? 'border-mid-gray/20 text-mid-gray/30 cursor-default'
                : 'border-near-black text-near-black hover:bg-near-black hover:text-white'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`w-12 h-12 border-2 rounded-full cursor-pointer flex items-center justify-center transition-all ${
              isLast
                ? 'border-mid-gray/20 text-mid-gray/30 cursor-default'
                : 'border-near-black text-near-black hover:bg-near-black hover:text-white'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Mountain Section */}
      <section
        className="min-h-[100vh] bg-cover bg-center relative flex items-center px-12"
        style={{ backgroundImage: "url('/assets/Images/Mountains/background-mountain.jpg')"}}
      >
        <div className="absolute inset-0 bg-portfolio-cream/80" />
        <div className="max-w-7xl flex flex-col justify-center relative z-10">
          <h1 className="font-display text-[clamp(3rem,10vw,1rem)] font-bold text-near-black mb-3 leading-[1.1]">
            {mountainData?.title || 'CASE STUDIES'}
          </h1>
          <p className="text-near-black text-[1.2rem] font-subheading max-w-2xl">
            {mountainData?.subtitle || 'Explore our full-length case studies and see how strategy, creativity, and execution come together to drive real impact.'}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PortfolioSlide({ item }) {
  return (
    <div className="max-w-7xl h-[650px]">
      <div className="flex gap-28 h-full pl-10 pr-4">
        {/* Left — Image */}
        <div className="w-[45%] flex-shrink-0 h-full">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <div className="w-full h-full bg-mid-gray/10 rounded-sm" />
          )}
        </div>

        {/* Right — Strategy + Performance */}
        <div className="flex-1 flex flex-col justify-start">
          {/* AD STRATEGY */}
          {item.strategyBullets && item.strategyBullets.length > 0 && (
            <div>
              <h3 className="font-display text-[1.5rem] font-bold text-near-black mb-6 tracking-[0.08em]">
                AD STRATEGY
              </h3>
              <div className="space-y-5 ml-8">
                {item.strategyBullets.map((bullet, i) => (
                  <div key={i}>
                    <p className="font-body text-[0.95rem] font-bold text-near-black leading-[1.4] tracking-[0.03em]">
                      {bullet.title || bullet}
                    </p>
                    {bullet.description && (
                      <p className="font-body text-[0.95rem] text-near-black/80 leading-[1.6] mt-1 tracking-[0.03em]">
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
              <h3 className="font-display text-[1.5rem] font-bold text-near-black mb-6 tracking-[0.08em]">
                PERFORMANCE
              </h3>
              <div className="flex gap-16 ml-8">
                {item.metrics.map((metric, i) => (
                  <div key={i} className="flex-1">
                    {/* Metric pill */}
                    <div className="inline-block border-2 border-near-black rounded-full px-6 py-2 mb-4">
                      <span className="font-body text-[0.95rem] font-bold text-near-black tracking-[0.03em]">
                        {metric.label}: {metric.value}
                      </span>
                    </div>

                    <p className="font-body text-[0.85rem] font-bold text-near-black uppercase tracking-wide">
                      {metric.industryLabel}
                    </p>
                    {metric.industryContext && (
                      <p className="font-body text-[0.85rem] italic text-near-black/70 mb-3 tracking-[0.03em]">
                        {metric.industryContext}
                      </p>
                    )}

                    {/* Benchmarks */}
                    <div className="space-y-0.5">
                      {metric.benchmarks.map((b, j) => (
                        <p
                          key={j}
                          className={`font-body text-[0.85rem] text-near-black/80 tracking-[0.03em] ${
                            b.bold ? 'font-bold italic' : ''
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
    </div>
  );
}

export default Portfolio;
