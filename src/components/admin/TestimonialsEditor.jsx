import { useState } from 'react';

function TestimonialsEditor({ formData, setFormData }) {
  const [editingId, setEditingId] = useState(null);
  const testimonials = formData._testimonials || [];

  const updateTestimonials = (updated) => {
    setFormData(prev => ({ ...prev, _testimonials: updated }));
  };

  const addTestimonial = () => {
    const newT = {
      id: Date.now().toString(),
      quote: '',
      logo: '',
      logoScale: 50,
      avatar: '',
    };
    updateTestimonials([...testimonials, newT]);
    setEditingId(newT.id);
  };

  const deleteTestimonial = (id) => {
    const t = testimonials.find(x => x.id === id);
    if (window.confirm(`Delete testimonial from "${t?.avatar || 'Untitled'}"?`)) {
      updateTestimonials(testimonials.filter(x => x.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const updateField = (id, key, value) => {
    updateTestimonials(testimonials.map(t => t.id === id ? { ...t, [key]: value } : t));
  };

  const handleLogoUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateField(id, 'logo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]";

  const editing = testimonials.find(t => t.id === editingId);

  if (editing) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={() => setEditingId(null)}
          className="flex items-center gap-2 mb-8 text-[0.9rem] font-medium text-near-black/50 hover:text-near-black transition-colors bg-transparent border-none cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all testimonials
        </button>

        <div className="mb-10">
          <h2 className="font-display text-[1.75rem] font-semibold text-near-black tracking-tight">
            {editing.avatar || 'New Testimonial'}
          </h2>
        </div>

        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Quote</label>
            <textarea
              value={editing.quote || ''}
              onChange={(e) => updateField(editing.id, 'quote', e.target.value)}
              placeholder="What they said..."
              className={`${inputClass} resize-y min-h-[120px]`}
            />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Name & Title</label>
            <input
              type="text"
              value={editing.avatar || ''}
              onChange={(e) => updateField(editing.id, 'avatar', e.target.value)}
              placeholder="Alacia Maloy, Dir. of Comms & Ops"
              className={inputClass}
            />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Logo / Signature</label>
            <div className="relative border border-dashed border-near-black/[0.1] rounded-lg p-6 text-center cursor-pointer transition-all duration-150 hover:border-accent/60 hover:bg-accent/[0.03] bg-white group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoUpload(editing.id, e)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <svg className="w-8 h-8 mx-auto mb-2 text-near-black/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-[0.85rem] text-near-black/60 font-medium">Upload logo</div>
            </div>
            {editing.logo && (
              <div className="mt-3 p-3 bg-[#F8F8F8] border border-near-black/[0.04] rounded-lg">
                <img src={editing.logo} alt="Logo preview" className="object-contain" style={{ height: `${editing.logoScale || 50}px` }} />
              </div>
            )}
          </div>
          {editing.logo && (
            <div>
              <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">
                Logo Size — {editing.logoScale || 50}px
              </label>
              <input
                type="range"
                min="20"
                max="150"
                value={editing.logoScale || 50}
                onChange={(e) => updateField(editing.id, 'logoScale', Number(e.target.value))}
                className="w-full accent-near-black cursor-pointer"
              />
              <div className="flex justify-between text-[0.75rem] text-near-black/30 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
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
          Testimonials
        </h2>
        <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
          Client testimonials displayed on your homepage.
        </p>
      </div>

      {/* Section Text */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <h3 className="text-[0.9rem] font-semibold text-near-black mb-4">Section Text (left side)</h3>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Label</label>
          <input type="text" value={formData.testimonialsLabel || ''} onChange={(e) => setFormData(prev => ({ ...prev, testimonialsLabel: e.target.value }))} placeholder="What Clients Say" className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]" />
        </div>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Headline</label>
          <input type="text" value={formData.testimonialsHeadline || ''} onChange={(e) => setFormData(prev => ({ ...prev, testimonialsHeadline: e.target.value }))} placeholder="It's About Understanding People...Not Just Platforms." className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]" />
        </div>
        <div>
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Body Text</label>
          <textarea value={formData.testimonialsBody || ''} onChange={(e) => setFormData(prev => ({ ...prev, testimonialsBody: e.target.value }))} placeholder="We focus on uncovering what your audience..." className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[80px] transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[1.1rem] font-semibold text-near-black">Testimonials</h3>
        <button
          onClick={addTestimonial}
          className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-near-black text-white hover:bg-near-black/90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <p className="text-near-black/40 text-[1rem] mb-4">No testimonials yet.</p>
          <button onClick={addTestimonial} className="px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none bg-near-black text-white hover:bg-near-black/90">
            Add Your First Testimonial
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white border border-near-black/[0.04] rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-4">
              {t.logo && (
                <img src={t.logo} alt="" className="h-10 object-contain shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-[0.95rem] font-semibold text-near-black truncate">
                  {t.avatar || 'Untitled'}
                </h4>
                <p className="text-[0.8rem] text-near-black/40 mt-0.5 truncate">
                  {t.quote ? `"${t.quote.slice(0, 60)}..."` : 'No quote'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(t.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteTestimonial(t.id)}
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

export default TestimonialsEditor;
