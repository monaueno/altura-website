import { useState } from 'react';

function ServicesEditor({ formData, setFormData }) {
  const [editingId, setEditingId] = useState(null);
  const services = formData._services || [];

  const updateServices = (updated) => {
    setFormData(prev => ({ ...prev, _services: updated }));
  };

  const addService = () => {
    const num = String(services.length + 1).padStart(2, '0');
    const newS = {
      id: Date.now().toString(),
      number: num,
      title: '',
      description: '',
      link: '',
    };
    updateServices([...services, newS]);
    setEditingId(newS.id);
  };

  const deleteService = (id) => {
    const s = services.find(x => x.id === id);
    if (window.confirm(`Delete "${s?.title || 'Untitled'}"?`)) {
      // Re-number after delete
      const filtered = services.filter(x => x.id !== id).map((s, i) => ({
        ...s,
        number: String(i + 1).padStart(2, '0'),
      }));
      updateServices(filtered);
      if (editingId === id) setEditingId(null);
    }
  };

  const updateField = (id, key, value) => {
    updateServices(services.map(s => s.id === id ? { ...s, [key]: value } : s));
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]";

  const editing = services.find(s => s.id === editingId);

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
          Back to all services
        </button>

        <div className="mb-10">
          <h2 className="font-display text-[1.75rem] font-semibold text-near-black tracking-tight">
            {editing.title || 'New Service'}
          </h2>
        </div>

        <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Service Name</label>
            <input
              type="text"
              value={editing.title || ''}
              onChange={(e) => updateField(editing.id, 'title', e.target.value)}
              placeholder="Creative Strategist Consultant"
              className={inputClass}
            />
          </div>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2.5">Description</label>
            <textarea
              value={editing.description || ''}
              onChange={(e) => updateField(editing.id, 'description', e.target.value)}
              placeholder="Describe this service..."
              className={`${inputClass} resize-y min-h-[120px]`}
            />
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-10">
        <h2 className="font-display text-[1.75rem] font-semibold text-near-black mb-3 tracking-tight">
          Services
        </h2>
        <p className="text-[0.95rem] text-near-black/50 leading-relaxed">
          Manage the services shown on the homepage and Services page.
        </p>
      </div>

      {/* Homepage Services Section Text */}
      <div className="bg-white border border-near-black/[0.04] rounded-lg p-7 mb-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <h3 className="text-[0.9rem] font-semibold text-near-black mb-4">Homepage Section Text (left side)</h3>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Headline</label>
          <input type="text" value={formData.servicesHeadline || ''} onChange={(e) => setFormData(prev => ({ ...prev, servicesHeadline: e.target.value }))} placeholder="Strategic Marketing Support for Growing Brands" className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]" />
        </div>
        <div className="mb-4">
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">Body Text</label>
          <textarea value={formData.servicesBody || ''} onChange={(e) => setFormData(prev => ({ ...prev, servicesBody: e.target.value }))} placeholder="Annalise Marketing offers..." className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none resize-y min-h-[80px] transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]" />
        </div>
        <div>
          <label className="block text-[0.85rem] font-medium text-near-black/70 mb-2">CTA Button Text</label>
          <input type="text" value={formData.servicesCTAText || ''} onChange={(e) => setFormData(prev => ({ ...prev, servicesCTAText: e.target.value }))} placeholder="Hire Us" className="w-full px-3.5 py-2.5 border border-near-black/[0.06] rounded-lg font-body text-[0.95rem] text-near-black bg-white outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent/15 placeholder:text-near-black/30 hover:border-near-black/[0.12]" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[1.1rem] font-semibold text-near-black">Services</h3>
        <button
          onClick={addService}
          className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none transition-all duration-200 bg-near-black text-white hover:bg-near-black/90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="bg-white border border-near-black/[0.04] rounded-lg p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <p className="text-near-black/40 text-[1rem] mb-4">No services yet.</p>
          <button onClick={addService} className="px-5 py-2.5 text-[0.9rem] font-body font-medium rounded-lg cursor-pointer border-none bg-near-black text-white hover:bg-near-black/90">
            Add Your First Service
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map(s => (
            <div key={s.id} className="bg-white border border-near-black/[0.04] rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-near-black/5 flex items-center justify-center shrink-0">
                <span className="text-[0.8rem] font-bold text-near-black/40">{s.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[0.95rem] font-semibold text-near-black truncate">
                  {s.title || 'Untitled Service'}
                </h4>
                <p className="text-[0.8rem] text-near-black/40 mt-0.5 truncate">
                  {s.description ? s.description.slice(0, 80) + '...' : 'No description'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(s.id)}
                  className="p-2 rounded-lg border border-near-black/[0.08] bg-transparent text-near-black/50 hover:text-near-black hover:border-near-black/20 cursor-pointer transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteService(s.id)}
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

export default ServicesEditor;
