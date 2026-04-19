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

  return (
    <div className="min-h-screen bg-cream">
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

      {/* Portfolio Grid */}
      <section className="px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                to={`/portfolio/${item.slug}`}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[4/5] bg-dark-gray rounded overflow-hidden mb-5 relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#3d3d3d] flex items-center justify-center">
                      <span className="text-white/20 text-[0.7rem] tracking-[0.2em] uppercase">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/20 transition-all duration-300" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-display text-[1.5rem] font-bold text-near-black mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-mid-gray text-[0.95rem] leading-[1.6] font-light">
                    {item.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {portfolioItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-mid-gray text-[1.1rem] font-subheading">
                No portfolio items yet. Add some from the admin dashboard!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Portfolio;
