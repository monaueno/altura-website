import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function StaticShowcase() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);
  }, []);

  if (!data) return null;

  return (
    <section className="px-12 py-24 bg-cream">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-near-black leading-[1.2] uppercase">
          {data.staticShowcaseHeadline}
        </h2>
        <p className="mt-6 text-mid-gray text-[0.95rem] leading-[1.7] max-w-[560px] mx-auto font-light font-subheading">
          {data.staticShowcaseSubheading}
        </p>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="aspect-[4/5] bg-dark-gray rounded overflow-hidden relative cursor-pointer group"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#3d3d3d] flex items-center justify-center">
              <span className="text-white/20 text-[0.7rem] tracking-[0.2em] uppercase">
                Portfolio image {num}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          href="/portfolio"
          className="inline-block px-7 py-3 bg-transparent text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] border-[1.5px] border-near-black transition-all hover:bg-near-black hover:text-white cursor-pointer"
        >
          See Our Portfolio
        </a>
      </div>
    </section>
  );
}

export default StaticShowcase;
