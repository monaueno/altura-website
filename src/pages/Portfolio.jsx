import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [heroData, setHeroData] = useState(null);
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
        className="px-12 min-h-[50vh] flex items-center bg-portfolio-cream relative overflow-hidden"
      >

        <div className="max-w-7xl text-left flex flex-col justify-center relative z-10">
          {heroData?.logo && (
            <img
              src={heroData.logo}
              alt="Brand logo"
              className="max-h-[80px] object-contain mb-4"
            />
          )}
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-near-black mb-3 leading-[1.1]">
            {heroData?.title || 'Our Work'}
          </h1>
          <p className="text-accent text-[1rem] font-subheading italic max-w-2xl">
            {heroData?.subtitle || 'Strategic creative that drives results.'}
          </p>
        </div>
      </section>

      {/* Full Screen Portfolio Section */}
      <section className="relative bg-portfolio-cream min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden">
        {/* Current Portfolio Item */}
        <div className="w-full h-full absolute inset-0 transition-opacity duration-500">
          <PortfolioSlide item={portfolioItems[currentIndex]} />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-12 right-12 flex gap-4 z-20">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`w-14 h-14 border-2 rounded-full cursor-pointer flex items-center justify-center transition-all ${
              isFirst
                ? 'border-white/20 text-white/30 cursor-default bg-near-black/20'
                : 'border-white/60 bg-near-black/40 text-white hover:border-accent hover:bg-accent backdrop-blur-sm'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`w-14 h-14 border-2 rounded-full cursor-pointer flex items-center justify-center transition-all ${
              isLast
                ? 'border-white/20 text-white/30 cursor-default bg-near-black/20'
                : 'border-white/60 bg-near-black/40 text-white hover:border-accent hover:bg-accent backdrop-blur-sm'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-12 text-white/80 font-subheading text-sm z-20">
          <span className="font-bold">{currentIndex + 1}</span> / {portfolioItems.length}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PortfolioSlide({ item }) {
  return (
    <div className="w-full h-full relative">
      {/* Background Image */}
      {item.image ? (
        <div
          className="absolute inset-0 bg-portfolio-cream bg-portfolio-cream"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-portfolio-cream" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-portfolio-cream" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end px-16 py-16 z-10">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white mb-4 leading-[1.1]">
            {item.title}
          </h2>
          <p className="text-white/90 text-[1.3rem] font-subheading leading-[1.6] mb-6">
            {item.shortDescription}
          </p>
          {item.tagline && (
            <p className="text-accent text-[1.1rem] font-display italic">
              "{item.tagline}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
