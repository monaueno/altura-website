import { useEffect, useState, useRef } from 'react';
import { getData } from '../utils/storage';

function Hero() {
  const [data, setData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const siteData = getData();
    const homeData = siteData.home;
    if (!homeData.heroVideoUrl) {
      homeData.heroVideoUrl = "/hero-video-web.mp4";
    }
    setData(homeData);
  }, []);

  // Once data is set and video element exists, ensure it plays
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {});
  }, [data]);

  if (!data) return null;

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-end px-4 md:px-16 overflow-hidden">
      {/* Background — image always behind, video layered on top */}
      <div className="absolute inset-0 bg-near-black overflow-hidden">
        {data.heroImage && (
          <img
            src={data.heroImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={data.heroVideoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full md:w-[479px] flex flex-col">
        <h1 className="font-display text-[clamp(1.75rem,7vw,50px)] font-bold text-white leading-[105%] tracking-[0%] mb-5 uppercase w-full md:w-[479px]">
          {data.heroHeadline.split('new heights').map((part, i, arr) => (
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span style={{ color: '#A4BDE0' }}>new heights</span>
              </span>
            ) : part
          ))}
        </h1>
        <p className="font-subheading text-[clamp(14px,3.5vw,18px)] font-light text-white/75 leading-[125%] tracking-[0%] max-w-full md:max-w-[420px] mb-9">
          {data.heroSubheadline}
        </p>
        <a
          href="/services#contact"
          className="self-start px-6 py-3 bg-[#272828] text-white font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-[#3a3a3a] hover:-translate-y-[1px]"
        >
          {data.heroCTAText}
        </a>
      </div>
    </section>
  );
}

export default Hero;
