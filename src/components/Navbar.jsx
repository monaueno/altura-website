import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getData } from '../utils/storage';

function Navbar() {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [logoImage, setLogoImage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const siteData = getData();
    setLogoImage(siteData.home.logoImage || '/assets/Images/altura-logo.png');
  }, []);

  useEffect(() => {
    const MAX_OPACITY = 0.55;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const start = vh * 0.3; // begin fade-in at 30% through hero
      const end = vh * 0.85;  // fully visible near end of hero
      const y = window.scrollY;

      let progress = (y - start) / (end - start);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      setBgOpacity(progress * MAX_OPACITY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  // Pages with light/cream backgrounds need dark navbar text
  const darkTextPages = ['/portfolio', '/services', '/blog'];
  const isDarkText = darkTextPages.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const textColor = isDarkText
      ? "text-near-black/85 hover:text-near-black"
      : "text-white/85 hover:text-[#A4BDE0]";
    const baseClass = `font-display ${textColor} text-[20px] leading-[150%] uppercase transition-colors`;
    const activeClass = "font-bold italic tracking-[0.05em]";
    const inactiveClass = "font-normal tracking-[0%]";
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  // Mobile menu link class — always white text on dark bg
  const getMobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "font-display text-white/85 hover:text-[#A4BDE0] text-[24px] leading-[150%] uppercase transition-colors";
    const activeClass = "font-bold italic tracking-[0.05em]";
    const inactiveClass = "font-normal tracking-[0%]";
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  const hamburgerColor = isDarkText ? '#0D0D0D' : '#FFFFFF';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-12 py-0"
    >
      {/* Background overlay — solid block, opacity scales with scroll position */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: isDarkText
            ? `rgba(243,242,239,${bgOpacity})`
            : `rgba(13,13,13,${bgOpacity})`,
          backdropFilter: bgOpacity > 0 ? `blur(${bgOpacity * 18}px)` : 'none',
          WebkitBackdropFilter: bgOpacity > 0 ? `blur(${bgOpacity * 18}px)` : 'none',
        }}
      />
      {/* Logo */}
      <Link to="/" className="relative z-10 flex items-center">
        <img
          src={isDarkText
            ? '/assets/Altura - Logo Suite/02 Secondary Logo/PNG/SecondaryLogo-FullColor.png'
            : (logoImage || '/assets/Images/altura-logo.png')
          }
          alt="Altura"
          className="w-[72px] h-[72px] md:w-[108px] md:h-[108px]"
          style={isDarkText ? {} : { filter: 'brightness(0) invert(1)' }}
        />
      </Link>

      {/* Hamburger button — mobile only */}
      <button
        className="relative z-10 md:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span
          className="block w-6 h-[2px] transition-all duration-300"
          style={{
            backgroundColor: hamburgerColor,
            transform: menuOpen ? 'rotate(45deg) translateY(3px)' : 'none',
          }}
        />
        <span
          className="block w-6 h-[2px] mt-[6px] transition-all duration-300"
          style={{
            backgroundColor: hamburgerColor,
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-6 h-[2px] mt-[6px] transition-all duration-300"
          style={{
            backgroundColor: hamburgerColor,
            transform: menuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none',
          }}
        />
      </button>

      {/* Desktop Nav Links */}
      <ul className="relative z-10 hidden md:flex items-center gap-9 list-none">
        <li>
          <Link to="/" className={getLinkClass('/')}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className={getLinkClass('/portfolio')}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/about" className={getLinkClass('/about')}>
            About
          </Link>
        </li>
        <li>
          <Link to="/services" className={getLinkClass('/services')}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/blog" className={getLinkClass('/blog')}>
            Blog
          </Link>
        </li>
        <li>
          <a
            href="/services#contact"
            className={`font-display ${isDarkText ? 'bg-blue-dark' : 'bg-[#A4BDE0]'} text-white px-[22px] py-[10px] rounded-[2px] font-normal text-[20px] leading-[150%] tracking-[0%] uppercase transition-all hover:bg-[#8DADD0]`}
          >
            Let's Chat
          </a>
        </li>
      </ul>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-near-black/95 flex flex-col items-center justify-center gap-8 md:hidden">
          <Link to="/" className={getMobileLinkClass('/')} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/portfolio" className={getMobileLinkClass('/portfolio')} onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/about" className={getMobileLinkClass('/about')} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" className={getMobileLinkClass('/services')} onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/blog" className={getMobileLinkClass('/blog')} onClick={() => setMenuOpen(false)}>Blog</Link>
          <a
            href="/services#contact"
            className="font-display bg-[#A4BDE0] text-white px-[22px] py-[10px] rounded-[2px] font-normal text-[24px] leading-[150%] tracking-[0%] uppercase transition-all hover:bg-[#8DADD0]"
            onClick={() => setMenuOpen(false)}
          >
            Let's Chat
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
