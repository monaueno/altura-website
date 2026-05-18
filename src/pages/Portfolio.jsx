import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [brands, setBrands] = useState([]);
  const [heroData, setHeroData] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const siteData = getData();
    setBrands(siteData.brands || []);
    setHeroData(siteData.portfolioHero || {
      title: 'AD GALLERY',
      subtitle: "Explore the ads we've created for brands we've partnered with.",
    });
  }, []);

  const toggleBrand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setCurrentAd(0);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-cream">
      <Navbar />

      {/* Hero / Header */}
      <section className="bg-portfolio-cream flex flex-col items-center justify-center text-center pt-[125px]" style={{ height: 'calc(100vw / 2.8)' }}>
        <h1 className="font-display text-[50px] font-bold text-near-black leading-[1.05] uppercase">
          {heroData.title || 'AD GALLERY'}
        </h1>
        <p className="font-subheading font-light text-[18px] text-near-black mt-4 max-w-[570px] mx-auto leading-[1.25]">
          {heroData.subtitle || "Explore the ads we've created for brands we've partnered with."}
        </p>
      </section>

      {/* Brand Logo Strips */}
      <section className="flex flex-col">
        {brands.map((brand) => {
          const isExpanded = expandedId === brand.id;
          const rawAds = brand.ads || [];
          const ads = rawAds.map(ad => typeof ad === 'string' ? { type: 'static', src: ad } : ad);

          return (
            <div key={brand.id}>
              {/* Brand Strip */}
              <button
                onClick={() => toggleBrand(brand.id)}
                className="w-full flex items-center justify-center transition-opacity hover:opacity-80 cursor-pointer border-none"
                style={{ height: 'calc(100vw / 10)', backgroundColor: brand.bgColor }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-auto object-contain"
                  style={{ height: `${brand.logoScale || 50}%` }}
                />
              </button>

              {/* Expanded Ads Section — full viewport height */}
              <div
                className="overflow-hidden transition-all duration-700 ease-in-out"
                style={{
                  maxHeight: isExpanded ? 'calc(90vh - calc(100vw / 10))' : '0px',
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div className="h-full flex flex-col items-center justify-center px-6 py-6" style={{ backgroundColor: brand.bgColor }}>
                  <div className="max-w-7xl w-full h-full flex flex-col">
                    {ads.length === 0 ? (
                      <p className="text-center text-near-black/50 font-subheading text-[1rem] py-8">
                        Ads coming soon for {brand.name}.
                      </p>
                    ) : (() => {
                      const adsPerSlide = 3;
                      const totalSlides = Math.ceil(ads.length / adsPerSlide);
                      const slideAds = ads.slice(currentAd * adsPerSlide, currentAd * adsPerSlide + adsPerSlide);
                      const arrowColor = brand.arrowColor || '#000000';
                      return (
                        <>
                          <div className="flex items-center justify-center gap-4 mb-6 flex-1 min-h-0">
                            {/* Left Arrow */}
                            <button
                              onClick={() => setCurrentAd(prev => Math.max(0, prev - 1))}
                              disabled={currentAd === 0}
                              className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer bg-transparent transition-opacity disabled:opacity-20"
                              style={{ borderColor: arrowColor }}
                              aria-label="Previous slide"
                            >
                              <svg className="w-5 h-5" fill="none" stroke={arrowColor} strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>

                            <div className="flex items-center justify-center gap-8 flex-1 min-h-0">
                            {slideAds.map((ad, idx) => (
                              <div key={currentAd * adsPerSlide + idx} className="relative group">
                                {ad.type === 'video' ? (
                                  <>
                                    <img
                                      src={ad.thumbnail || ad.src}
                                      alt={`${brand.name} ad ${currentAd * adsPerSlide + idx + 1}`}
                                      className="max-h-[500px] object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <img
                                    src={ad.src}
                                    alt={`${brand.name} ad ${currentAd * adsPerSlide + idx + 1}`}
                                    className="max-h-[500px] object-contain"
                                  />
                                )}
                              </div>
                            ))}
                            </div>

                            {/* Right Arrow */}
                            <button
                              onClick={() => setCurrentAd(prev => Math.min(totalSlides - 1, prev + 1))}
                              disabled={currentAd === totalSlides - 1}
                              className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer bg-transparent transition-opacity disabled:opacity-20"
                              style={{ borderColor: arrowColor }}
                              aria-label="Next slide"
                            >
                              <svg className="w-5 h-5" fill="none" stroke={arrowColor} strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                          {/* Dot Navigation — always reserves space for consistent height */}
                          <div className="flex items-center justify-center gap-3 h-6">
                            {totalSlides > 1 && Array.from({ length: totalSlides }, (_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentAd(idx)}
                                aria-label={`View slide ${idx + 1}`}
                                className={`rounded-full transition-all cursor-pointer border-none ${
                                  idx === currentAd
                                    ? 'w-3 h-3 bg-near-black'
                                    : 'w-2.5 h-2.5 bg-near-black/25 hover:bg-near-black/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Hire Us CTA */}
      <section className="bg-portfolio-cream py-20 text-center">
        <a
          href="/services#contact"
          className="inline-block bg-near-black text-white font-display font-bold text-[20px] tracking-[0.05em] uppercase px-6 py-3 hover:bg-near-black/80 transition-colors"
        >
          Hire Us!
        </a>
      </section>

      <Footer />
    </div>
  );
}

export default Portfolio;
