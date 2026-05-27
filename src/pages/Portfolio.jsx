import { useEffect, useState, useRef } from 'react';
import { getData } from '../utils/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Portfolio() {
  const [brands, setBrands] = useState([]);
  const [heroData, setHeroData] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [currentAd, setCurrentAd] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredAd, setHoveredAd] = useState(null);
  const videoRefs = useRef({});

  const handleMouseEnter = (key) => {
    setHoveredAd(key);
    const video = videoRefs.current[key];
    if (video) video.play().catch(() => {});
  };

  const handleMouseLeave = (key) => {
    setHoveredAd(null);
    const video = videoRefs.current[key];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

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
                  maxHeight: isExpanded ? 'calc(75vh - calc(100vw / 10))' : '0px',
                }}
              >
                <div className="h-full flex flex-col items-center justify-center px-6 pt-6 pb-12" style={{ backgroundColor: brand.bgColor }}>
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
                          <div className="flex items-center gap-4 mb-6 flex-1 min-h-0">
                            {/* Left Arrow */}
                            {totalSlides > 1 && (
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
                            )}

                            <div className="flex-1 min-h-0 overflow-hidden">
                              <div
                                className="flex transition-transform duration-500 ease-in-out h-full"
                                style={{ transform: `translateX(-${currentAd * 100}%)` }}
                              >
                                {/* Each slide is a full-width group of up to 3 ads */}
                                {Array.from({ length: totalSlides }, (_, slideIdx) => {
                                  const slideItems = ads.slice(slideIdx * adsPerSlide, slideIdx * adsPerSlide + adsPerSlide);
                                  return (
                                    <div key={slideIdx} className="flex items-center justify-center gap-8 min-w-full">
                                      {slideItems.map((ad, idx) => {
                                        const adKey = `${brand.id}-${slideIdx}-${idx}`;
                                        return (
                                          <div
                                            key={adKey}
                                            className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden"
                                            onMouseEnter={() => ad.type === 'video' && handleMouseEnter(adKey)}
                                            onMouseLeave={() => ad.type === 'video' && handleMouseLeave(adKey)}
                                            onClick={() => ad.type === 'video' && setActiveVideo(ad)}
                                          >
                                            {ad.type === 'video' ? (
                                              <>
                                                <video
                                                  ref={(el) => { videoRefs.current[adKey] = el; }}
                                                  src={ad.src}
                                                  muted
                                                  playsInline
                                                  loop
                                                  preload="metadata"
                                                  className="max-h-[450px] object-contain"
                                                />
                                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300" />
                                                <div className="absolute bottom-3 right-3 transition-opacity duration-300 group-hover:opacity-0">
                                                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-near-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                      <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              <img
                                                src={ad.src}
                                                alt={`${brand.name} ad ${slideIdx * adsPerSlide + idx + 1}`}
                                                className="max-h-[450px] object-contain"
                                              />
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Arrow */}
                            {totalSlides > 1 && (
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
                            )}
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

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[1000] border-none cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl w-full aspect-[4/5] md:aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo.src}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
