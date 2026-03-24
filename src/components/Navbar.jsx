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

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass = "font-display text-white/85 text-[20px] leading-[150%] uppercase transition-colors hover:text-[#A4BDE0]";
    const activeClass = "font-bold italic tracking-[0.05em]";
    const inactiveClass = "font-normal tracking-[0%]";
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-5 transition-all duration-400 ${
        scrolled ? 'bg-near-black/92 backdrop-blur-[12px]' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        {logoImage ? (
          <img src={logoImage} alt="Altura" className="w-[108px] h-[108px]" />
        ) : (
          <span className="font-display text-[1.4rem] font-bold text-white tracking-[0.04em]">
            Annalise
          </span>
        )}
      </Link>

      {/* Nav Links */}
      <ul className="flex items-center gap-9 list-none">
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
            className="font-display bg-[#A4BDE0] text-white px-[22px] py-[10px] rounded-[2px] font-normal text-[20px] leading-[150%] tracking-[0%] uppercase transition-all hover:bg-[#8DADD0]"
          >
            Let's Chat
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
