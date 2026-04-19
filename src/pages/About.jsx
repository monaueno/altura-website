import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  // Scroll reveal
  const revealRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about-content');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section — mountain background with frosted glass card */}
      <section className="relative h-[773px] overflow-hidden flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/Images/Mountains/background-mountain.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Frosted glass card */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-[10px] px-12 py-10 text-center max-w-[480px]">
            <div className="flex items-baseline justify-center gap-4 mb-4">
              <h1 className="font-display font-bold text-[30px] text-near-black uppercase tracking-wide">
                Altura
              </h1>
              <span className="font-display font-normal text-[30px] text-near-black">
                (ahl&middot;TOO&middot;rah)
              </span>
            </div>
            <p className="font-subheading font-light italic text-[18px] leading-[1.25] text-near-black">
              Derived from Latin alt&#363;ra, meaning "height" or "loftiness," often used to describe physical or metaphorical elevation.
            </p>
          </div>

          {/* Read more / scroll down */}
          <button
            onClick={scrollToContent}
            className="mt-10 flex flex-col items-center gap-2 text-white group cursor-pointer"
          >
            <span className="font-subheading font-light text-[18px] tracking-wide">
              READ MORE
            </span>
            <svg
              width="47"
              height="47"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transform rotate-90 group-hover:translate-y-1 transition-transform"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </button>
        </div>
      </section>

      {/* About Content Section */}
      <section
        id="about-content"
        className="bg-portfolio-cream py-24 px-6"
      >
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-16">
          {/* Left — photo */}
          <div className="lg:w-[561px] shrink-0" ref={addRevealRef}>
            <img
              src="/assets/Images/Grandpa Max/Annalise-and-Grandpa.jpg"
              alt="Annalise Hart"
              className="w-full h-[657px] object-cover rounded-lg"
            />
          </div>

          {/* Right — bio text */}
          <div className="flex-1 flex flex-col justify-center" ref={addRevealRef}>
            <h2 className="font-display font-bold text-[50px] leading-[1.05] uppercase text-near-black mb-8">
              About Us
            </h2>

            <div className="font-subheading font-light text-[18px] leading-[1.2] text-near-black space-y-5">
              <p>The name Altura was inspired by an experience I had with my grandpa.</p>
              <p>
                As a family, we hiked Handies Peak. At 73, my grandpa set a goal to reach the highest altitude he had ever hiked: 13,000 feet. As we got close to the top, we climbed straight up the mountain. I watched as he felt joy, excitement, and a deep sense of accomplishment.
              </p>
              <p>In that moment, I was reminded that progress is personal and intentional.</p>
              <p>
                It's a moment I never want to forget. A moment I want my business to stand for. And a moment I hope to relive again and again with the clients whose businesses I help take to new heights.
              </p>
              <p>
                The word Altura is derived from the Latin alt&#363;ra, meaning "height" or "loftiness," often used to describe physical or metaphorical elevation.
              </p>
              <p>
                To me, Altura stands for intentional progress&mdash;for setting meaningful goals and doing the work required to reach them.
              </p>
              <p>That's what I aim to help my clients do every day.</p>
            </div>

            <p className="font-subheading font-light text-[15px] uppercase tracking-[0.05em] text-near-black mt-8">
              <span className="tracking-[0.5em]">-</span>Annalise Hart, CEO
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden" ref={addRevealRef}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/Images/Mountains/101_0021.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h2 className="font-display font-bold text-[40px] leading-[1.05] uppercase text-white max-w-[500px] mx-auto">
            Ready to take your business to{' '}
            <span className="italic text-accent">new heights?</span>
          </h2>
          <Link
            to="/services"
            className="inline-block mt-10 bg-white text-near-black font-display font-bold text-[20px] tracking-[0.05em] uppercase px-6 py-3 hover:bg-accent-light transition-colors"
          >
            Hire Us!
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
