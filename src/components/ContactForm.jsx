import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xvzyggde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-dark py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-geologica font-bold text-cream mb-6">
            Let's Chat
          </h2>
          <p className="text-xl text-cream/80 font-afacad">
            Ready to elevate your marketing? Drop me a message and let's talk strategy.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-cream font-afacad mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:border-accent transition-colors font-afacad"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-cream font-afacad mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:border-accent transition-colors font-afacad"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-cream font-afacad mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:border-accent transition-colors font-afacad resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-accent text-dark px-8 py-4 rounded-full text-lg font-afacad font-semibold hover:bg-accent/90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-center text-accent font-afacad">
              Thanks! I'll get back to you soon.
            </p>
          )}

          {status === 'error' && (
            <p className="text-center text-red-400 font-afacad">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
