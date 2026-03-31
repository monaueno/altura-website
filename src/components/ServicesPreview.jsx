import { useEffect, useState } from 'react';
import { getData } from '../utils/storage';

function ServicesPreview() {
  const [services, setServices] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const siteData = getData();
    setServices(siteData.services.slice(0, 4)); // Only show first 4 services
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-12 py-24 bg-dark-white grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
      {/* Left Side - Text */}
      <div>
        <h2 className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold text-near-black leading-[1.25] mb-5">
          Strategic Marketing Support for Growing Brands
        </h2>
        <p className="text-mid-gray text-[0.95rem] leading-[1.75] max-w-[380px] mb-9 font-light">
          Annalise Marketing offers strategic marketing support for brands that want clarity, stronger creative, and measurable growth.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-[14px] bg-black text-white font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-mid-gray hover:-translate-y-[1px]"
        >
          Hire Us
        </a>
      </div>

      {/* Right Side - Accordion */}
      <div>
        {services.map((service, index) => (
          <div key={service.id} className="border-b border-near-black/15">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between py-5 bg-transparent border-none cursor-pointer font-body text-[0.85rem] font-semibold tracking-[0.08em] uppercase text-near-black text-left transition-colors hover:text-accent"
            >
              <span>{service.title}</span>
              <span
                className={`text-[0.65rem] opacity-50 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-[350ms] ${
                openIndex === index ? 'max-h-[200px] pb-5' : 'max-h-0'
              }`}
            >
              <p className="text-[0.9rem] text-mid-gray leading-[1.7] font-light mb-6">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-block px-2r py-[8px] bg-cream text-near-black font-body font-semibold text-[0.82rem] tracking-[0.1em] uppercase rounded-[2px] transition-all hover:bg-mid-gray hover:-translate-y-[1px]"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesPreview;
