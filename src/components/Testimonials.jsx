import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const siteData = getData();
    setTestimonials(siteData.testimonials);
  }, []);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === testimonials.length - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex((prev) => prev + 1);
  };

  if (testimonials.length === 0) return null;

  // Only show cards that haven't been viewed yet (current + upcoming)
  const remaining = testimonials.length - currentIndex;

  const CARD_H = 400;

  return (
    <section
      className="relative bg-near-black px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/Images/Mountains/background-mountain.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-near-black/80" />

      {/* Left Side - Text */}
      <div className="relative z-10">
        <p className="text-[0.72rem] tracking-[0.25em] uppercase text-accent mb-6 font-medium">
          What Clients Say
        </p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-white font-bold leading-[1.2] mb-5">
          It's About Understanding <em className="text-accent italic">People</em>…Not Just Platforms.
        </h2>
        <p className="text-white/60 text-[0.95rem] leading-[1.75] font-light max-w-[380px]">
          We focus on uncovering what your audience actually cares about, then shaping creative and messaging that feels natural, emotional, and aligned with how they think and buy. When strategy leads, performance follows.
        </p>
      </div>

      {/* Right Side - Stacked Cards */}
      <div className="relative z-10" style={{ height: CARD_H + 60 }}>
        {/* 2nd-up card — only show if 2+ cards remaining after current */}
        {remaining > 2 && (
          <Card
            testimonial={testimonials[currentIndex + 2]}
            height={CARD_H * 0.72}
            translateX={-126}
            darkOverlay={0.45}
            zIndex={10}
            cardH={CARD_H}
            scale={0.72}
          />
        )}

        {/* Next-up card — only show if 1+ card remaining after current */}
        {remaining > 1 && (
          <Card
            testimonial={testimonials[currentIndex + 1]}
            height={CARD_H * 0.85}
            translateX={-75}
            darkOverlay={0.25}
            zIndex={20}
            cardH={CARD_H}
            scale={0.85}
          />
        )}

        {/* Active card */}
        <Card
          testimonial={testimonials[currentIndex]}
          height={CARD_H}
          translateX={0}
          darkOverlay={0}
          zIndex={30}
          cardH={CARD_H}
          scale={1}
        />

        {/* Navigation */}
        <div className="absolute bottom-0 right-0 flex gap-3">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`w-10 h-10 border-[1.5px] rounded-full cursor-pointer flex items-center justify-center transition-all ${
              isFirst
                ? 'border-white/10 text-white/20 cursor-default'
                : 'border-white/30 bg-transparent text-white hover:border-accent hover:bg-accent hover:text-near-black'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`w-10 h-10 border-[1.5px] rounded-full cursor-pointer flex items-center justify-center transition-all ${
              isLast
                ? 'border-white/10 text-white/20 cursor-default'
                : 'border-white/30 bg-transparent text-white hover:border-accent hover:bg-accent hover:text-near-black'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ testimonial, height, translateX, darkOverlay, zIndex, cardH, scale }) {
  // Scale font sizes based on card scale
  const quoteFontSize = `${1.15 * scale}rem`;
  const nameFontSize = `${1.1 * scale}rem`;
  const titleFontSize = `${0.75 * scale}rem`;
  const padding = `${Math.round(36 * scale)}px`;

  return (
    <div
      className="absolute rounded-2xl overflow-hidden"
      style={{
        height,
        width: 420,
        right: 0,
        top: (cardH - height) / 2,
        zIndex,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        className="bg-white h-full flex flex-col justify-between"
        style={{ padding }}
      >
        {/* Quote */}
        <p className="leading-[1.7] text-near-black italic" style={{ fontSize: quoteFontSize }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex flex-col gap-[2px]">
          <span className="font-display font-bold text-near-black" style={{ fontSize: nameFontSize }}>
            {testimonial.name}
          </span>
          <span className="tracking-[0.1em] uppercase text-black/45 font-medium" style={{ fontSize: titleFontSize }}>
            {testimonial.titleCompany}
          </span>
        </div>
      </div>
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: darkOverlay }}
      />
    </div>
  );
}

export default Testimonials;
