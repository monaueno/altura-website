import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [logoImage, setLogoImage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const siteData = getData();
    setLogoImage(siteData.home.logoImage || '/assets/Images/altura-logo.png');
  }, []);

  useEffect(() => {
    const MAX_OPACITY = 0.55;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const start = vh * 0.5; // begin fade-in at midway through hero
      const end = vh * 0.95;  // fully visible near end of hero
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
  const darkTextPages = ['/portfolio'];
  const isDarkText = darkTextPages.includes(location.pathname);

  // Pages with light/cream backgrounds need dark navbar text
  const darkTextPages = ['/portfolio', '/services', '/blog'];
  const isDarkText = darkTextPages.includes(location.pathname);

  // Pages with light/cream backgrounds need dark navbar text
  const darkTextPages = ['/portfolio', '/services', '/blog'];
  const isDarkText = darkTextPages.includes(location.pathname);

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
      {/* Background overlay — solid block, opacity scales with scroll position */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: `rgba(13,13,13,${bgOpacity})`,
        }}
      />
      {/* Logo */}
      <Link to="/" className="relative z-10 flex items-center">
        <img
          src={isDarkText
            ? '/assets/Altura - Logo Suite/02 Secondary Logo/PNG/SecondaryLogo-FullColor.png'
            : '/assets/Altura - Logo Suite/02 Secondary Logo/PNG/SecondaryLogo-White.png'
          }
          alt="Altura"
          className="w-[108px] h-[108px]"
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
