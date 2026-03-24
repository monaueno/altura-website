function Footer() {
  return (
    <footer className="bg-near-black px-12 py-[100px] relative overflow-hidden">
      {/* Large logo overlay — text left, logomark right, right edge at ~50% */}
      <div className="absolute top-0 bottom-0 flex items-center gap-6 pointer-events-none" style={{ left: '8%' }}>
        <div className="flex flex-col items-center">
          <span className="font-display text-[3.5rem] font-bold text-white tracking-[0.12em] uppercase leading-none">
            Altura
          </span>
          <span className="font-display text-[1.5rem] font-bold text-white tracking-[0.25em] uppercase leading-tight">
            Marketing
          </span>
        </div>
        <img
          src="/assets/Images/altura-logomark-white.png"
          alt=""
          className="h-full w-auto py-0"
        />
      </div>

      {/* Main footer content */}
      <div className="relative z-10 flex items-center justify-end gap-20 pr-[8%]">
        {/* Connect & Socials */}
        <div className="flex gap-20">
          {/* Connect */}
          <div>
            <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-accent font-semibold mb-3">
              Connect
            </h4>
            <a
              href="mailto:annalise@alturamarketing.co"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              annalise@alturamarketing.co
            </a>
          </div>

          {/* Socials */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-accent font-semibold">
                Socials
              </h4>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 11v5M8 8v.01M12 16v-5c0-1.5 1-2 2-2s2 .5 2 2v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
            <a
              href="https://alturamarketing.co"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[0.85rem] text-white/60 transition-colors hover:text-white leading-[1.9]"
            >
              alturamarketing.co
            </a>
          </div>
        </div>

        {/* Hire Us CTA */}
        <a
          href="#contact"
          className="inline-block px-8 py-[14px] bg-accent text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-accent-light hover:-translate-y-[1px]"
        >
          Hire Us
        </a>
      </div>

    </footer>
  );
}

export default Footer;
