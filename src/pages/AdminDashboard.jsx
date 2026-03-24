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
      flatData[`t${num}-company`] = t.company || '';
      flatData[`t${num}-quote`] = t.quote || '';
      flatData[`t${num}-name`] = t.name || '';
      flatData[`t${num}-title`] = t.titleCompany || '';
    });

    // Flatten services
    siteData.services?.slice(0, 4).forEach((s, i) => {
      const num = i + 1;
      flatData[`s${num}-title`] = s.title || '';
      flatData[`s${num}-body`] = s.description || '';
    });

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
        company: formData[`t${num}-company`] || t.company,
        quote: formData[`t${num}-quote`] || t.quote,
        name: formData[`t${num}-name`] || t.name,
        titleCompany: formData[`t${num}-title`] || t.titleCompany,
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
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-near-black px-10 flex items-center justify-between h-16 sticky top-0 z-50">
        <div className="font-display text-[1.1rem] text-white font-bold">
          Annalise <span className="font-body text-[0.65rem] tracking-[0.18em] uppercase text-accent ml-2">Admin</span>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => window.open('/', '_blank')}
            className="px-[18px] py-2 text-[0.75rem] font-body font-semibold tracking-[0.08em] uppercase rounded-[2px] cursor-pointer border-none transition-colors bg-transparent text-white/70 border border-white/20 hover:border-accent hover:text-accent"
          >
            ↗ Preview Site
          </button>
          <button
            onClick={handleSave}
            className="px-[18px] py-2 text-[0.75rem] font-body font-semibold tracking-[0.08em] uppercase rounded-[2px] cursor-pointer border-none transition-colors bg-accent text-near-black hover:bg-accent-light"
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-[6px] text-[0.7rem] font-body font-semibold tracking-[0.08em] uppercase rounded-[2px] cursor-pointer border-none transition-colors bg-transparent text-white/40 hover:text-white/70"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="bg-cream-dark border-r border-near-black/[0.08] py-7 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <p className="px-6 py-[6px] text-[0.62rem] tracking-[0.2em] uppercase text-near-black/40 font-semibold mt-3">
            Pages
          </p>
          {[
            { id: 'hero', icon: '🖼', label: 'Hero Section' },
            { id: 'testimonials', icon: '💬', label: 'Testimonials' },
            { id: 'portfolio', icon: '🎨', label: 'Portfolio' },
            { id: 'services', icon: '📋', label: 'Services' },
            { id: 'footer', icon: '📌', label: 'Footer' },
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full px-6 py-[11px] text-left bg-transparent border-none font-body text-[0.85rem] font-medium cursor-pointer transition-all border-l-[3px] ${
                activeSection === section.id
                  ? 'bg-accent/[0.18] text-near-black border-l-accent font-semibold'
                  : 'text-mid-gray border-l-transparent hover:bg-accent/[0.12] hover:text-near-black'
              }`}
            >
              {section.icon} {section.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="px-12 py-10 max-w-[860px]">
          {/* Hero Section */}
          {activeSection === 'hero' && (
            <div>
              <h2 className="font-display text-[1.5rem] font-bold text-near-black mb-[6px]">Hero Section</h2>
              <p className="text-[0.88rem] text-mid-gray mb-8 font-light">
                This is the first thing visitors see — the big full-screen section at the top of the page.
              </p>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Logo
                </h3>
                <div className="relative border-2 border-dashed border-near-black/15 rounded p-7 text-center cursor-pointer transition-all hover:border-accent hover:bg-accent/[0.06] bg-cream">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logoImage')}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="text-[1.8rem] mb-2">🏢</div>
                  <div className="text-[0.85rem] text-mid-gray font-medium">Click to upload your logo</div>
                  <div className="text-[0.75rem] text-near-black/40 mt-1">PNG with transparent background recommended</div>
                </div>
                {formData.logoImage && (
                  <img src={formData.logoImage} alt="Logo preview" className="max-h-[60px] object-contain mt-3" />
                )}
              </div>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Background Media
                </h3>

                {/* Video URL Option */}
                <div className="mb-6">
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                    🎥 Video URL (Recommended for videos)
                  </label>
                  <input
                    type="text"
                    value={formData.heroVideoUrl || ''}
                    onChange={(e) => handleInputChange('heroVideoUrl', e.target.value)}
                    placeholder="https://your-cdn.com/hero-video.mp4"
                    className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                  />
                  <p className="text-[0.75rem] text-near-black/40 mt-2">
                    Upload your video to Google Drive, Dropbox, Cloudflare, or any CDN, then paste the direct link here. MP4 format (H.264 codec) required for browser compatibility.
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-near-black/10"></div>
                  <span className="text-[0.7rem] text-near-black/40 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-near-black/10"></div>
                </div>

                {/* Image Upload Option */}
                <div>
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                    📸 Upload Image
                  </label>
                  <div className="relative border-2 border-dashed border-near-black/15 rounded p-7 text-center cursor-pointer transition-all hover:border-accent hover:bg-accent/[0.06] bg-cream">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'heroImage')}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="text-[1.8rem] mb-2">📸</div>
                    <div className="text-[0.85rem] text-mid-gray font-medium">Click to upload a background image</div>
                    <div className="text-[0.75rem] text-near-black/40 mt-1">JPG, PNG or WebP · Stored locally in browser</div>
                  </div>
                  {formData.heroImage && (
                    <img src={formData.heroImage} alt="Hero preview" className="w-full max-h-[200px] object-cover rounded-[3px] mt-3" />
                  )}
                </div>

                <p className="text-[0.75rem] text-accent mt-4 bg-accent/10 p-3 rounded">
                  💡 <strong>Tip:</strong> If both are set, the video URL will be used. Clear the video URL field to use the uploaded image instead.
                </p>
              </div>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Text Content
                </h3>
                <div className="mb-[18px]">
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline || ''}
                    onChange={(e) => handleInputChange('heroHeadline', e.target.value)}
                    placeholder="Where Strategy Meets Creative That Converts"
                    className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div className="mb-[18px]">
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                    Subtext (description below headline)
                  </label>
                  <textarea
                    value={formData.heroSubheadline || ''}
                    onChange={(e) => handleInputChange('heroSubheadline', e.target.value)}
                    placeholder="A short sentence or two about what you do..."
                    className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none resize-y min-h-[90px] leading-[1.6] transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.heroCTAText || ''}
                    onChange={(e) => handleInputChange('heroCTAText', e.target.value)}
                    placeholder="Let's Chat"
                    className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Section */}
          {activeSection === 'testimonials' && (
            <div>
              <h2 className="font-display text-[1.5rem] font-bold text-near-black mb-[6px]">Testimonials</h2>
              <p className="text-[0.88rem] text-mid-gray mb-8 font-light">
                Edit each client testimonial. Visitors can click arrows to browse between them.
              </p>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Testimonials
                </h3>
                <div className="flex gap-2 mb-5 flex-wrap">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      onClick={() => switchTab('testimonials', num)}
                      className={`px-[18px] py-2 border rounded-[20px] bg-transparent font-body text-[0.78rem] font-semibold cursor-pointer transition-all ${
                        (activeTab.testimonials || 1) === num
                          ? 'bg-accent text-near-black border-accent'
                          : 'border-near-black/15 text-mid-gray hover:border-accent'
                      }`}
                    >
                      Testimonial {num}
                    </button>
                  ))}
                </div>

                {[1, 2, 3].map(num => (
                  <div key={num} className={(activeTab.testimonials || 1) === num ? 'block' : 'hidden'}>
                    <div className="mb-[18px]">
                      <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                        Company / Client Name
                      </label>
                      <input
                        type="text"
                        value={formData[`t${num}-company`] || ''}
                        onChange={(e) => handleInputChange(`t${num}-company`, e.target.value)}
                        placeholder="BoostedSafe"
                        className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <div className="mb-[18px]">
                      <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                        Quote
                      </label>
                      <textarea
                        value={formData[`t${num}-quote`] || ''}
                        onChange={(e) => handleInputChange(`t${num}-quote`, e.target.value)}
                        placeholder="What they said..."
                        className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none resize-y min-h-[90px] leading-[1.6] transition-colors focus:border-accent"
                      />
                    </div>
                    <div className="mb-[18px]">
                      <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                        Person's Name
                      </label>
                      <input
                        type="text"
                        value={formData[`t${num}-name`] || ''}
                        onChange={(e) => handleInputChange(`t${num}-name`, e.target.value)}
                        placeholder="Alexis Miles"
                        className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                        Person's Title
                      </label>
                      <input
                        type="text"
                        value={formData[`t${num}-title`] || ''}
                        onChange={(e) => handleInputChange(`t${num}-title`, e.target.value)}
                        placeholder="Dir. of Content, BoostedSafe"
                        className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Section */}
          {activeSection === 'portfolio' && (
            <div>
              <h2 className="font-display text-[1.5rem] font-bold text-near-black mb-[6px]">Portfolio</h2>
              <p className="text-[0.88rem] text-mid-gray mb-8 font-light">
                Edit the portfolio section text that appears on the homepage.
              </p>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Section Text
                </h3>
                <div>
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.staticShowcaseSubheading || ''}
                    onChange={(e) => handleInputChange('staticShowcaseSubheading', e.target.value)}
                    placeholder="These ads are real examples of how insight..."
                    className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none resize-y min-h-[90px] leading-[1.6] transition-colors focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Services Section */}
          {activeSection === 'services' && (
            <div>
              <h2 className="font-display text-[1.5rem] font-bold text-near-black mb-[6px]">Services</h2>
              <p className="text-[0.88rem] text-mid-gray mb-8 font-light">
                Edit each service name and description that appears in the accordion.
              </p>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Service Items
                </h3>
                <div className="flex gap-2 mb-5 flex-wrap">
                  {[1, 2, 3, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => switchTab('services', num)}
                      className={`px-[18px] py-2 border rounded-[20px] bg-transparent font-body text-[0.78rem] font-semibold cursor-pointer transition-all ${
                        (activeTab.services || 1) === num
                          ? 'bg-accent text-near-black border-accent'
                          : 'border-near-black/15 text-mid-gray hover:border-accent'
                      }`}
                    >
                      Service {num}
                    </button>
                  ))}
                </div>

                {[1, 2, 3, 4].map(num => (
                  <div key={num} className={(activeTab.services || 1) === num ? 'block' : 'hidden'}>
                    <div className="mb-[18px]">
                      <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={formData[`s${num}-title`] || ''}
                        onChange={(e) => handleInputChange(`s${num}-title`, e.target.value)}
                        placeholder="Creative Strategist Consultant"
                        className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-near-black/50 font-semibold mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData[`s${num}-body`] || ''}
                        onChange={(e) => handleInputChange(`s${num}-body`, e.target.value)}
                        placeholder="For teams that already have execution..."
                        className="w-full px-[14px] py-[11px] border border-near-black/[0.12] rounded-[3px] font-body text-[0.92rem] text-near-black bg-cream outline-none resize-y min-h-[90px] leading-[1.6] transition-colors focus:border-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Section */}
          {activeSection === 'footer' && (
            <div>
              <h2 className="font-display text-[1.5rem] font-bold text-near-black mb-[6px]">Footer</h2>
              <p className="text-[0.88rem] text-mid-gray mb-8 font-light">
                Update your contact info and social media links that appear at the bottom of every page.
              </p>

              <div className="bg-white border border-near-black/[0.08] rounded-md p-7 mb-5">
                <h3 className="text-[0.72rem] tracking-[0.15em] uppercase text-accent font-semibold mb-[18px] pb-3 border-b border-near-black/[0.06]">
                  Contact & Social Links
                </h3>
                <p className="text-[0.85rem] text-mid-gray mb-4">
                  Note: To update these fields, you'll need to edit the Footer component directly. Coming soon in a future update!
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Save Toast */}
      {showToast && (
        <div className="fixed bottom-7 right-7 bg-[#4CAF50] text-white px-6 py-3 rounded shadow-lg font-semibold text-[0.85rem] animate-[fadeIn_0.3s_ease]">
          ✓ Changes saved!
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
