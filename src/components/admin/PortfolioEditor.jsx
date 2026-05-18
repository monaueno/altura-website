import { useState } from 'react';

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function PortfolioEditor({ formData, setFormData }) {
  const [editingId, setEditingId] = useState(null);
  const brands = formData._brands || [];
  const heroData = formData._portfolioHero || { title: '', subtitle: '' };

  const updateBrands = (newBrands) => {
    setFormData(prev => ({ ...prev, _brands: newBrands }));
  };

  const updateHero = (key, value) => {
    setFormData(prev => ({ ...prev, _portfolioHero: { ...prev._portfolioHero, [key]: value } }));
  };

  const addBrand = () => {
    const newBrand = {
      id: Date.now().toString(),
      slug: '',
      name: '',
      logo: '',
      bgColor: '#f4efe4',
      arrowColor: '#000000',
      logoHeight: '80',
      ads: [],
    };
    updateBrands([...brands, newBrand]);
    setEditingId(newBrand.id);
  };

  const deleteBrand = (id) => {
    const brand = brands.find(b => b.id === id);
    if (window.confirm(`Delete "${brand?.name || 'Untitled'}"? This cannot be undone.`)) {
      updateBrands(brands.filter(b => b.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const updateBrand = (id, key, value) => {
    updateBrands(brands.map(b => {
      if (b.id !== id) return b;
      const updated = { ...b, [key]: value };
      if (key === 'name') {
        let slug = generateSlug(value);
        const others = brands.filter(o => o.id !== id);
        let suffix = 2;
        let candidate = slug;
        while (others.some(o => o.slug === candidate)) {
          candidate = `${slug}-${suffix++}`;
        }
        updated.slug = candidate;
      }
      return updated;
    }));
  };

  const addAd = (brandId, type = 'static') => {
    updateBrands(brands.map(b => {
      if (b.id !== brandId) return b;
      return { ...b, ads: [...(b.ads || []), { type, src: '', thumbnail: '' }] };
    }));
  };

  const updateAd = (brandId, idx, updates) => {
    updateBrands(brands.map(b => {
      if (b.id !== brandId) return b;
      const ads = [...b.ads];
      const current = typeof ads[idx] === 'string' ? { type: 'static', src: ads[idx] } : ads[idx];
      ads[idx] = { ...current, ...updates };
      return { ...b, ads };
    }));
  };

  const removeAd = (brandId, idx) => {
    updateBrands(brands.map(b => {
      if (b.id !== brandId) return b;
      return { ...b, ads: b.ads.filter((_, i) => i !== idx) };
    }));
  };

  const handleAdUpload = (brandId, idx, field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateAd(brandId, idx, { [field]: ev.target.result });
    reader.readAsDataURL(file);
  };

  // Normalize ad to object format (backward compat)
  const normalizeAd = (ad) => typeof ad === 'string' ? { type: 'static', src: ad } : ad;

  const handleLogoUpload = (brandId, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateBrand(brandId, 'logo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]";

  const editingBrand = brands.find(b => b.id === editingId);

  // Edit view
  if (editingBrand) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setEditingId(null)}
          className="flex items-center gap-2 mb-8 text-[0.9rem] font-medium text-near-black/50 hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all brands
        </button>

        <div className="mb-10">
          <h2 className="font-display text-[1.75rem] font-semibold text-near-black tracking-tight">
            {editingBrand.name || 'New Brand'}
          </h2>
        </div>

        {/* Brand Info */}
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <h3 className="text-[0.9rem] font-semibold text-near-black mb-6">Brand Info</h3>

          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Brand Name</label>
            <input type="text" value={editingBrand.name} onChange={(e) => updateBrand(editingBrand.id, 'name', e.target.value)} placeholder="Brand name" className={inputClass} />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Slug <span className="text-near-black/30">(auto-generated)</span></label>
            <input type="text" value={editingBrand.slug} onChange={(e) => updateBrand(editingBrand.id, 'slug', e.target.value)} className={`${inputClass} bg-[#FAFAFA] text-near-black/60`} />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={editingBrand.bgColor}
                onChange={(e) => updateBrand(editingBrand.id, 'bgColor', e.target.value)}
                className="w-10 h-10 rounded border border-near-black/10 cursor-pointer"
              />
              <input type="text" value={editingBrand.bgColor} onChange={(e) => updateBrand(editingBrand.id, 'bgColor', e.target.value)} placeholder="#f4efe4" className={inputClass} />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Arrow Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={editingBrand.arrowColor || '#000000'}
                onChange={(e) => updateBrand(editingBrand.id, 'arrowColor', e.target.value)}
                className="w-10 h-10 rounded border border-near-black/10 cursor-pointer"
              />
              <input type="text" value={editingBrand.arrowColor || '#000000'} onChange={(e) => updateBrand(editingBrand.id, 'arrowColor', e.target.value)} placeholder="#000000" className={inputClass} />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">
              Logo Size — {editingBrand.logoScale || 50}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={editingBrand.logoScale || 50}
              onChange={(e) => updateBrand(editingBrand.id, 'logoScale', Number(e.target.value))}
              className="w-full accent-near-black cursor-pointer"
            />
            <div className="flex justify-between text-[0.75rem] text-near-black/30 mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
            {editingBrand.logo && (
              <div className="mt-3 rounded-lg flex items-center justify-center h-[100px]" style={{ backgroundColor: editingBrand.bgColor }}>
                <img src={editingBrand.logo} alt="Preview" className="object-contain" style={{ height: `${editingBrand.logoScale || 50}%` }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Logo</label>
            <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-6 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoUpload(editingBrand.id, e)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <svg className="w-8 h-8 mx-auto mb-2 text-near-black/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-[0.85rem] text-near-black/60 font-medium">Click to upload logo</div>
            </div>
            {editingBrand.logo && (
              <div className="mt-3 p-4 rounded-lg border border-near-black/[0.04]" style={{ backgroundColor: editingBrand.bgColor }}>
                <img src={editingBrand.logo} alt="Logo preview" className="max-h-[80px] object-contain mx-auto" />
              </div>
            )}
          </div>
        </div>

        {/* Ads */}
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[0.9rem] font-semibold text-near-black">Ads</h3>
            <div className="flex gap-2">
              <button
                onClick={() => addAd(editingBrand.id, 'static')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[0.8rem] font-medium rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/60 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Static Ad
              </button>
              <button
                onClick={() => addAd(editingBrand.id, 'video')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[0.8rem] font-medium rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/60 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Video Ad
              </button>
            </div>
          </div>

          <p className="text-[0.8rem] text-near-black/40 mb-4">
            Ads are shown 3 per slide. Static ads display as images, video ads show a play button overlay.
          </p>

          {(editingBrand.ads || []).length === 0 ? (
            <p className="text-[0.85rem] text-near-black/40 text-center py-4">No ads yet. Add a static or video ad to get started.</p>
          ) : (
            <div className="space-y-4">
              {editingBrand.ads.map((rawAd, idx) => {
                const ad = normalizeAd(rawAd);
                return (
                  <div key={idx} className="border border-near-black/[0.06] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[0.75rem] font-medium text-near-black/40 uppercase">
                        {ad.type === 'video' ? '🎬 Video' : '🖼 Static'} Ad {idx + 1}
                      </span>
                      <button onClick={() => removeAd(editingBrand.id, idx)} className="text-[0.75rem] text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer">Remove</button>
                    </div>

                    {/* Image/Thumbnail upload */}
                    <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-4 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAdUpload(editingBrand.id, idx, ad.type === 'video' ? 'thumbnail' : 'src', e)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="text-[0.85rem] text-near-black/60 font-medium">
                        {ad.type === 'video' ? 'Click to upload thumbnail image' : 'Click to upload image'}
                      </div>
                      <div className="text-[0.75rem] text-near-black/35 mt-1">JPG, PNG or WebP</div>
                    </div>

                    {/* Video file upload */}
                    {ad.type === 'video' && (
                      <div className="mt-3 relative border border-dashed border-near-black/[0.1] rounded-lg p-4 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleAdUpload(editingBrand.id, idx, 'src', e)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="text-[0.85rem] text-near-black/60 font-medium">Click to upload video file</div>
                        <div className="text-[0.75rem] text-near-black/35 mt-1">MP4, MOV or WebM</div>
                      </div>
                    )}

                    {/* Preview */}
                    {(ad.src || ad.thumbnail) && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-near-black/[0.04] relative">
                        <img src={ad.thumbnail || ad.src} alt={`Ad ${idx + 1}`} className="w-full max-h-[200px] object-contain bg-[#FAFAFA]" />
                        {ad.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-10">
        <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
          Ad Gallery
        </h2>
        <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
          Manage the brands and their ads shown on the Portfolio page.
        </p>
      </div>

      {/* Portfolio Hero Text */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <h3 className="text-[0.9rem] font-semibold text-near-black mb-4">Page Header</h3>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Title</label>
          <input type="text" value={heroData.title || ''} onChange={(e) => updateHero('title', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Subtitle</label>
          <input type="text" value={heroData.subtitle || ''} onChange={(e) => updateHero('subtitle', e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Brands List */}
      <div className="flex items-center justify-between mb-5 mt-8">
        <h3 className="text-[1.1rem] font-semibold text-near-black">Brands</h3>
        <button
          onClick={addBrand}
          className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-near-black text-white hover:bg-near-black/90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Brand
        </button>
      </div>

      {brands.length === 0 ? (
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <p className="text-near-black/40 text-[1rem] mb-4">No brands yet.</p>
          <button onClick={addBrand} className="px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none bg-near-black text-white hover:bg-near-black/90">
            Add Your First Brand
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {brands.map(brand => (
            <div
              key={brand.id}
              className="bg-white border border-near-black/[0.04] rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-4"
            >
              {brand.logo && (
                <div className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ backgroundColor: brand.bgColor }}>
                  <img src={brand.logo} alt="" className="max-h-[40px] max-w-[56px] object-contain" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-[0.95rem] font-semibold text-near-black truncate">
                  {brand.name || 'Untitled Brand'}
                </h4>
                <p className="text-[0.8rem] text-near-black/40 mt-0.5">
                  {brand.ads?.length || 0} ad{(brand.ads?.length || 0) !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(brand.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteBrand(brand.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-red-500 hover:border-red-200 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioEditor;
