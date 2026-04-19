import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getData } from '../utils/storage';

function Services() {
  const data = getData();
  const services = data.services || [];
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Scroll reveal
  const revealRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
    }
    setSubmitting(false);
  };

  // Only show 4 services on the cards (exclude Organic Social per Figma design)
  const displayServices = services.filter(
    (s) => s.title !== 'Organic Social Consultant'
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section — mountain bg with cream overlay */}
      <section className="relative min-h-[500px] pt-[180px] pb-[80px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/Images/Mountains/background-mountain.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-portfolio-cream/50" />
        </div>

        {/* Headline */}
        <div className="relative z-10 max-w-[700px] mx-auto text-center px-6" ref={addRevealRef}>
          <h1 className="font-display font-bold text-[50px] leading-[1.05] uppercase text-near-black">
            You imagine what's possible.{' '}
            <br />
            We design{' '}
            <span className="text-blue-dark">
              the strategy to get you there.
            </span>
          </h1>
        </div>

        {/* Service Cards Grid */}
        <div
          className="relative z-10 max-w-[1300px] mx-auto mt-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
          ref={addRevealRef}
        >
          {displayServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-[10px] p-12 flex flex-col items-center text-center"
            >
              <h3 className="font-display font-bold text-[27px] leading-[1.1] uppercase text-near-black mb-6 max-w-[442px]">
                {service.title}
              </h3>
              <p className="font-subheading font-light text-[18px] leading-[1.25] text-near-black max-w-[466px] mb-8">
                {service.description}
              </p>
              <button className="border-2 border-near-black px-6 py-2 font-display font-bold text-[16px] tracking-[0.05em] uppercase hover:bg-near-black hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-portfolio-cream py-24 px-6">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-16">
          {/* Left — heading */}
          <div className="lg:w-[380px] shrink-0" ref={addRevealRef}>
            <h2 className="font-display font-bold text-[40px] leading-[1.05] uppercase text-near-black">
              Have an idea?
              <br />
              Let's make it happen.
            </h2>
            <p className="font-subheading font-light text-[18px] leading-[1.25] text-near-black mt-4">
              We'd love to hear from you.
            </p>
          </div>

          {/* Right — form */}
          <div className="flex-1" ref={addRevealRef}>
            {submitted ? (
              <div className="text-center py-20">
                <h3 className="font-display font-bold text-[30px] uppercase text-near-black mb-4">
                  Thank you!
                </h3>
                <p className="font-subheading font-light text-[18px] text-near-black">
                  We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/30 pb-2 font-display text-[20px] text-near-black placeholder:text-[#828282] focus:outline-none focus:border-near-black transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/30 pb-2 font-display text-[20px] text-near-black placeholder:text-[#828282] focus:outline-none focus:border-near-black transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/30 pb-2 font-display text-[20px] text-near-black placeholder:text-[#828282] focus:outline-none focus:border-near-black transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/30 pb-2 font-display text-[20px] text-near-black placeholder:text-[#828282] focus:outline-none focus:border-near-black transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/30 pb-2 font-display text-[20px] text-near-black placeholder:text-[#828282] focus:outline-none focus:border-near-black transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      name="website"
                      placeholder="Website URL"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/30 pb-2 font-display text-[20px] text-near-black placeholder:text-[#828282] focus:outline-none focus:border-near-black transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us what you've got in mind."
                    value={formData.message}
                    onChange={handleChange}
                    rows={8}
                    className="w-full border border-black/30 p-4 font-display text-[20px] text-near-black placeholder:text-[#828282] bg-transparent focus:outline-none focus:border-near-black transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-near-black text-white font-display font-bold text-[20px] tracking-[0.05em] uppercase px-6 py-3 hover:bg-dark-gray transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Services;
