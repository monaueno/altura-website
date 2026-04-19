import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getData } from '../utils/storage';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logoImage, setLogoImage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const siteData = getData();
    setLogoImage(siteData.home.logoImage || '/assets/Images/altura-logo.png');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pages with light/cream backgrounds need dark navbar text
  const darkTextPages = ['/portfolio', '/services', '/blog'];
  const isDarkText = darkTextPages.includes(location.pathname);

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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-0"
    >
      {/* Background overlay — solid color + blur, opacity masked top-to-bottom */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          opacity: scrolled ? 1 : 0,
          background: isDarkText ? 'rgba(243,242,239,0.92)' : 'rgba(20,20,20,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />
      {/* Logo */}
      <Link to="/" className="relative z-10 flex items-center">
        <img
          src={isDarkText
            ? '/assets/Images/altura-logo.png'
            : (logoImage || '/assets/Images/altura-logo.png')
          }
          alt="Altura"
          className="w-[108px] h-[108px]"
          style={isDarkText ? {} : { filter: 'brightness(0) invert(1)' }}
        />
      </Link>

      {/* Nav Links */}
      <ul className="relative z-10 flex items-center gap-9 list-none">
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
            href="#contact"
            className={`font-display ${isDarkText ? 'bg-blue-dark' : 'bg-[#A4BDE0]'} text-white px-[22px] py-[10px] rounded-[2px] font-normal text-[20px] leading-[150%] tracking-[0%] uppercase transition-all hover:bg-[#8DADD0]`}
          >
            Let's Chat
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
