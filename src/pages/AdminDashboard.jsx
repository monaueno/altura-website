import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../utils/storage';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [activeTab, setActiveTab] = useState({});
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!sessionStorage.getItem('admin_authenticated')) {
      navigate('/admin');
      return;
    }

    // Load existing data
    const siteData = getData();
    const flatData = {};

    // Flatten home data
    Object.entries(siteData.home || {}).forEach(([key, value]) => {
      flatData[key] = value;
    });

    // Ensure heroVideoUrl exists
    if (!flatData.heroVideoUrl) {
      flatData.heroVideoUrl = '';
    }

    // Flatten testimonials
    siteData.testimonials?.forEach((t, i) => {
      const num = i + 1;
      flatData[`t${num}-quote`] = t.quote || '';
      flatData[`t${num}-avatar`] = t.avatar || '';
      flatData[`t${num}-logo`] = t.logo || '';
    });

    // Flatten services
    siteData.services?.slice(0, 4).forEach((s, i) => {
      const num = i + 1;
      flatData[`s${num}-title`] = s.title || '';
      flatData[`s${num}-body`] = s.description || '';
    });

    // Flatten videos
    siteData.videos?.forEach((v, i) => {
      const num = i + 1;
      flatData[`v${num}-thumbnail`] = v.thumbnail || '';
    });

    // Flatten portfolio hero
    flatData['portfolioHeroTitle'] = siteData.portfolioHero?.title || '';
    flatData['portfolioHeroSubtitle'] = siteData.portfolioHero?.subtitle || '';
    flatData['portfolioHeroImage'] = siteData.portfolioHero?.backgroundImage || '';
    flatData['portfolioHeroLogo'] = siteData.portfolioHero?.logo || '';

    setFormData(flatData);
  }, [navigate]);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleInputChange(key, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const siteData = getData();

    // Update home data
    siteData.home = {
      ...siteData.home,
      logoImage: formData['logoImage'] || siteData.home.logoImage,
      heroHeadline: formData['heroHeadline'] || siteData.home.heroHeadline,
      heroSubheadline: formData['heroSubheadline'] || siteData.home.heroSubheadline,
      heroCTAText: formData['heroCTAText'] || siteData.home.heroCTAText,
      heroImage: formData['heroImage'] || siteData.home.heroImage,
      heroVideoUrl: formData['heroVideoUrl'] || siteData.home.heroVideoUrl || '',
      staticShowcaseHeadline: formData['staticShowcaseHeadline'] || siteData.home.staticShowcaseHeadline,
      staticShowcaseSubheading: formData['staticShowcaseSubheading'] || siteData.home.staticShowcaseSubheading,
    };

    // Update testimonials
    siteData.testimonials = siteData.testimonials.map((t, i) => {
      const num = i + 1;
      return {
        ...t,
        quote: formData[`t${num}-quote`] || t.quote,
        avatar: formData[`t${num}-avatar`] || t.avatar,
        logo: formData[`t${num}-logo`] || t.logo,
      };
    });

    // Update services
    siteData.services = siteData.services.map((s, i) => {
      if (i >= 4) return s;
      const num = i + 1;
      return {
        ...s,
        title: formData[`s${num}-title`] || s.title,
        description: formData[`s${num}-body`] || s.description,
      };
    });

    // Update videos
    siteData.videos = siteData.videos.map((v, i) => {
      const num = i + 1;
      return {
        ...v,
        thumbnail: formData[`v${num}-thumbnail`] || v.thumbnail,
      };
    });

    // Update portfolio hero
    siteData.portfolioHero = {
      title: formData['portfolioHeroTitle'] || siteData.portfolioHero?.title || 'Our Work',
      subtitle: formData['portfolioHeroSubtitle'] || siteData.portfolioHero?.subtitle || '',
      backgroundImage: formData['portfolioHeroImage'] || siteData.portfolioHero?.backgroundImage || '',
      logo: formData['portfolioHeroLogo'] || siteData.portfolioHero?.logo || '',
    };

    setData(siteData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  const switchTab = (group, num) => {
    setActiveTab(prev => ({ ...prev, [group]: num }));
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      {/* Header - Linear Style */}
      <header className="bg-white border-b border-near-black/[0.06] px-6 flex items-center justify-between h-16 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-near-black rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="font-display text-[1.05rem] text-near-black font-semibold tracking-tight">
              Annalise
            </div>
          </div>
          <div className="h-5 w-px bg-near-black/[0.08]"></div>
          <div className="px-2.5 py-1 bg-accent/[0.08] rounded-md">
            <span className="font-body text-[0.75rem] font-medium text-accent">
              Admin
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => window.open('/', '_blank')}
            className="group flex items-center gap-2 px-4 py-2 text-[0.85rem] font-body font-medium rounded-lg cursor-pointer transition-all duration-200 bg-transparent text-near-black/60 border border-near-black/[0.08] hover:border-near-black/20 hover:text-near-black hover:bg-[#FAFAFA]"
          >
            Preview
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button
            onClick={handleSave}
            className="group flex items-center gap-2 px-4 py-2 text-[0.85rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-near-black text-white hover:bg-near-black/90"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save
          </button>
          <div className="h-5 w-px bg-near-black/[0.08] mx-1"></div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-[0.85rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-transparent text-near-black/40 hover:text-near-black/70 hover:bg-near-black/5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[calc(100vh-64px)]">
        {/* Sidebar - Linear Style */}
        <aside className="bg-white border-r border-near-black/[0.06] py-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 mb-4">
            <p className="text-[0.75rem] font-medium text-near-black/40 px-2">
              Content
            </p>
          </div>
          {[
            { id: 'hero', icon: '🖼', label: 'Hero Section' },
            { id: 'testimonials', icon: '💬', label: 'Testimonials' },
            { id: 'portfolio', icon: '🎨', label: 'Portfolio' },
            { id: 'videos', icon: '🎬', label: 'Videos' },
            { id: 'services', icon: '📋', label: 'Services' },
            { id: 'footer', icon: '📌', label: 'Footer' },
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`group w-full px-4 py-2 mb-0.5 text-left bg-transparent border-none font-body cursor-pointer transition-all duration-150 rounded-lg flex items-center gap-3 ${
                activeSection === section.id
                  ? 'bg-accent/[0.08] text-near-black'
                  : 'text-near-black/50 hover:bg-[#FAFAFA] hover:text-near-black/80'
              }`}
            >
              <div className={`transition-colors ${activeSection === section.id ? 'text-accent' : 'text-near-black/40 group-hover:text-near-black/60'}`}>
                {section.icon}
              </div>
              <div className={`text-[0.9rem] font-medium transition-colors ${
                activeSection === section.id ? 'text-near-black' : 'text-near-black/60 group-hover:text-near-black/80'
              }`}>
                {section.label}
              </div>
            </button>
          ))}
        </aside>

        {/* Content - Linear Layout */}
        <main className="px-8 py-10 max-w-[840px]">
          {/* Hero Section */}
          {activeSection === 'hero' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              {/* Section header */}
              <div className="mb-10">
                <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
                  Hero Section
                </h2>
                <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
                  The main banner that visitors see first on your homepage.
                </p>
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Logo
                  </h3>
                </div>
                <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-8 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logoImage')}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <svg className="w-10 h-10 mx-auto mb-3 text-near-black/25 transition-transform duration-150 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="text-[0.9rem] text-near-black/60 font-medium mb-1">Click to upload logo</div>
                  <div className="text-[0.8rem] text-near-black/35">PNG recommended</div>
                </div>
                {formData.logoImage && (
                  <div className="mt-4 p-4 bg-[#F8F8F8] rounded-lg border border-near-black/[0.04]">
                    <img src={formData.logoImage} alt="Logo preview" className="max-h-[60px] object-contain mx-auto" />
                  </div>
                )}
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Background Media
                  </h3>
                </div>

                {/* Video URL Option */}
                <div className="mb-6">
                  <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={formData.heroVideoUrl || ''}
                    onChange={(e) => handleInputChange('heroVideoUrl', e.target.value)}
                    placeholder="https://your-cdn.com/hero-video.mp4"
                    className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                  />
                  <p className="text-[0.85rem] text-near-black/50 mt-2.5 leading-relaxed">
                    Paste a direct link to your video file. MP4 format recommended.
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-7">
                  <div className="flex-1 h-px bg-near-black/[0.06]"></div>
                  <span className="text-[0.8rem] text-near-black/35 font-medium">or</span>
                  <div className="flex-1 h-px bg-near-black/[0.06]"></div>
                </div>

                {/* Image Upload Option */}
                <div>
                  <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                    Upload Image
                  </label>
                  <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-8 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'heroImage')}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <svg className="w-10 h-10 mx-auto mb-3 text-near-black/25 transition-transform duration-150 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-[0.9rem] text-near-black/60 font-medium mb-1">Click to upload image</div>
                    <div className="text-[0.8rem] text-near-black/35">JPG, PNG or WebP</div>
                  </div>
                  {formData.heroImage && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-near-black/[0.04]">
                      <img src={formData.heroImage} alt="Hero preview" className="w-full max-h-[200px] object-cover" />
                    </div>
                  )}
                </div>

                <div className="mt-6 p-3.5 bg-accent/[0.04] rounded-lg border border-accent/[0.08]">
                  <p className="text-[0.85rem] text-near-black/55 leading-relaxed flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Video URL takes priority if both are set. Clear the URL field to use the uploaded image.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Text Content
                  </h3>
                </div>
                <div className="mb-5">
                  <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline || ''}
                    onChange={(e) => handleInputChange('heroHeadline', e.target.value)}
                    placeholder="Where Strategy Meets Creative That Converts"
                    className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                    Subtext
                  </label>
                  <textarea
                    value={formData.heroSubheadline || ''}
                    onChange={(e) => handleInputChange('heroSubheadline', e.target.value)}
                    placeholder="A short sentence or two about what you do..."
                    className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[100px] leading-relaxed transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroCTAText || ''}
                    onChange={(e) => handleInputChange('heroCTAText', e.target.value)}
                    placeholder="Let's Chat"
                    className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Section */}
          {activeSection === 'testimonials' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-start justify-between mb-10">
                <div>
                  <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
                    Testimonials
                  </h2>
                  <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
                    Client testimonials displayed on your homepage.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('This will clear your current testimonials and reload defaults. Continue?')) {
                      localStorage.removeItem('annalise_site_data');
                      window.location.reload();
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-[0.8rem] font-body font-medium rounded-lg cursor-pointer border border-near-black/[0.08] transition-all duration-150 bg-transparent text-near-black/50 hover:border-near-black/20 hover:text-near-black/70 hover:bg-[#FAFAFA]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Client Testimonials
                  </h3>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      onClick={() => switchTab('testimonials', num)}
                      className={`px-4 py-2 border rounded-lg bg-transparent font-body text-[0.85rem] font-medium cursor-pointer transition-all duration-150 ${
                        (activeTab.testimonials || 1) === num
                          ? 'bg-accent/[0.08] text-accent border-accent/20'
                          : 'border-near-black/[0.06] text-near-black/50 hover:border-near-black/[0.12] hover:text-near-black/80 hover:bg-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {[1, 2, 3].map(num => (
                  <div key={num} className={(activeTab.testimonials || 1) === num ? 'block' : 'hidden'}>
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                        Quote
                      </label>
                      <textarea
                        value={formData[`t${num}-quote`] || ''}
                        onChange={(e) => handleInputChange(`t${num}-quote`, e.target.value)}
                        placeholder="What they said..."
                        className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[100px] leading-relaxed transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                        Logo / Signature
                      </label>
                      <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-6 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, `t${num}-logo`)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <svg className="w-8 h-8 mx-auto mb-2 text-near-black/25 transition-transform duration-150 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div className="text-[0.85rem] text-near-black/60 font-medium mb-1">Upload logo</div>
                        <div className="text-[0.75rem] text-near-black/35">PNG recommended</div>
                      </div>
                      {formData[`t${num}-logo`] && (
                        <div className="mt-3 p-3 bg-[#F8F8F8] border border-near-black/[0.04] rounded-lg">
                          <img src={formData[`t${num}-logo`]} alt="Logo preview" className="max-h-[50px] object-contain mx-auto" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                        Name & Title
                      </label>
                      <input
                        type="text"
                        value={formData[`t${num}-avatar`] || ''}
                        onChange={(e) => handleInputChange(`t${num}-avatar`, e.target.value)}
                        placeholder="Alacia Maloy, Dir. of Comms & Ops"
                        className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Section */}
          {activeSection === 'portfolio' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="mb-10">
                <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
                  Portfolio
                </h2>
                <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
                  Edit the portfolio section text that appears on the homepage.
                </p>
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Section Text
                  </h3>
                </div>
                <div>
                  <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                    Description
                  </label>
                  <textarea
                    value={formData.staticShowcaseSubheading || ''}
                    onChange={(e) => handleInputChange('staticShowcaseSubheading', e.target.value)}
                    placeholder="These ads are real examples of how insight..."
                    className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[100px] leading-relaxed transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Services Section */}
          {activeSection === 'services' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="mb-10">
                <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
                  Services
                </h2>
                <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
                  Edit each service name and description that appears in the accordion.
                </p>
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Service Items
                  </h3>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  {[1, 2, 3, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => switchTab('services', num)}
                      className={`px-4 py-2 border rounded-lg bg-transparent font-body text-[0.85rem] font-medium cursor-pointer transition-all duration-150 ${
                        (activeTab.services || 1) === num
                          ? 'bg-accent/[0.08] text-accent border-accent/20'
                          : 'border-near-black/[0.06] text-near-black/50 hover:border-near-black/[0.12] hover:text-near-black/80 hover:bg-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {[1, 2, 3, 4].map(num => (
                  <div key={num} className={(activeTab.services || 1) === num ? 'block' : 'hidden'}>
                    <div className="mb-5">
                      <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={formData[`s${num}-title`] || ''}
                        onChange={(e) => handleInputChange(`s${num}-title`, e.target.value)}
                        placeholder="Creative Strategist Consultant"
                        className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
                        Description
                      </label>
                      <textarea
                        value={formData[`s${num}-body`] || ''}
                        onChange={(e) => handleInputChange(`s${num}-body`, e.target.value)}
                        placeholder="For teams that already have execution..."
                        className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[100px] leading-relaxed transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {activeSection === 'videos' && (
            <div>
              <h2 className="font-display text-[1.5rem] font-bold text-near-black mb-[6px]">Videos</h2>
              <p className="text-[0.88rem] text-mid-gray mb-8 font-light">
                Upload custom cover photos (thumbnails) for your video showcase. These images appear before the user clicks play.
              </p>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Video Thumbnails
                </h3>
                <div className="flex gap-2 mb-5 flex-wrap">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      onClick={() => switchTab('videos', num)}
                      className={`px-[18px] py-2 border rounded-[20px] bg-transparent font-body text-[0.78rem] font-semibold cursor-pointer transition-all ${
                        (activeTab.videos || 1) === num
                          ? 'bg-accent text-near-black border-accent'
                          : 'border-near-black/15 text-mid-gray hover:border-accent'
                      }`}
                    >
                      Video {num}
                    </button>
                  ))}
                </div>

                {[1, 2, 3].map(num => (
                  <div key={num} className={(activeTab.videos || 1) === num ? 'block' : 'hidden'}>
                    <div className="relative border-2 border-dashed border-near-black/15 rounded p-7 text-center cursor-pointer transition-all hover:border-accent hover:bg-accent/[0.06] bg-cream">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, `v${num}-thumbnail`)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="text-[1.8rem] mb-2">🎬</div>
                      <div className="text-[0.85rem] text-mid-gray font-medium">Click to upload thumbnail for Video {num}</div>
                      <div className="text-[0.75rem] text-near-black/40 mt-1">JPG or PNG · 9:16 aspect ratio recommended (e.g., 720x1280px)</div>
                    </div>
                    {formData[`v${num}-thumbnail`] && (
                      <img
                        src={formData[`v${num}-thumbnail`]}
                        alt={`Video ${num} thumbnail`}
                        className="w-full max-w-[240px] mx-auto mt-3 rounded-[3px] object-cover"
                        style={{ aspectRatio: '9/16' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Section */}
          {activeSection === 'footer' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <div className="mb-10">
                <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
                  Footer
                </h2>
                <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
                  Contact info and social links at the bottom of every page.
                </p>
              </div>

              <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-[0.9rem] font-semibold text-near-black">
                    Contact & Social Links
                  </h3>
                </div>
                <div className="p-4 bg-accent/[0.04] rounded-lg border border-accent/[0.08]">
                  <p className="text-[0.85rem] text-near-black/55 leading-relaxed flex items-start gap-2">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    To update these fields, you'll need to edit the Footer component directly. Coming soon in a future update.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Save Toast - Linear Style */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-near-black text-white px-5 py-3 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.15)] text-[0.9rem] flex items-center gap-2.5 animate-[slideInUp_0.3s_ease-out]">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Changes saved</span>
        </div>
      )}

      {/* Keyframes for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
