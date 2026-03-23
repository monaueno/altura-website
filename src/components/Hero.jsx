import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function Hero() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const siteData = getData();
    setData(siteData.home);
  }, []);

  if (!data) return null;

  return (
    <section className="relative h-screen min-h-[640px] flex items-end px-12 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-near-black overflow-hidden">
        {data.heroImage ? (
          data.heroImage.endsWith('.mp4') ? (
            <video
              src={data.heroImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-[0.55]"
            />
          ) : (
            <img
              src={data.heroImage}
              alt="Hero background"
              className="w-full h-full object-cover opacity-[0.55]"
            />
          )
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1208] flex items-center justify-center">
            <span className="text-white/10 text-[0.8rem] tracking-[0.2em] uppercase">
              Hero background image
            </span>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[600px] ml-auto">
        <h1 className="font-display text-[50px] font-bold text-white leading-[105%] tracking-[0%] mb-5 uppercase">
          {data.heroHeadline.split('new heights').map((part, i, arr) => (
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span style={{ color: '#A4BDE0' }}>new heights</span>
              </span>
            ) : part
          ))}
        </h1>
        <p className="font-subheading text-[18px] font-light text-white/75 leading-[125%] tracking-[0%] max-w-[420px] mb-9">
          {data.heroSubheadline}
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-[14px] bg-[#272828] text-white font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-[#3a3a3a] hover:-translate-y-[1px]"
        >
          {data.heroCTAText}
        </a>
      </div>
    </section>
  );
}

export default Hero;
