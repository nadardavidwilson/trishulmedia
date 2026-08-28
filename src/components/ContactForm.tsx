import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:hello@trishul_gmg.com?subject=${encodeURIComponent('Website enquiry from ' + name)}&body=${encodeURIComponent(message + '\n\n' + email)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <section id="contact-form" className="rounded-[2rem] p-6 card-glass">
      <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
      {sent ? (
        <p className="text-stone-700">Thanks — your mail client has been opened. We'll reply soon.</p>
      ) : (
        <form onSubmit={submit} className="grid gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-md border border-gray-200 p-3 bg-transparent placeholder:text-stone-400 focus:outline-none focus:ring-2"
            style={{ boxShadow: 'none', borderColor: 'rgba(0,0,0,0.08)' }}
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="rounded-md border border-gray-200 p-3 bg-transparent placeholder:text-stone-400 focus:outline-none focus:ring-2"
            style={{ boxShadow: 'none', borderColor: 'rgba(0,0,0,0.08)' }}
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows={5}
            className="rounded-md border border-gray-200 p-3 bg-transparent placeholder:text-stone-400 focus:outline-none focus:ring-2"
            style={{ boxShadow: 'none', borderColor: 'rgba(0,0,0,0.08)' }}
            required
          />
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-brand">Send message</button>
            <a href="mailto:hello@trishul_gmg.com" className="text-sm text-stone-600">Or email us directly</a>
          </div>
        </form>
      )}
    </section>
  );
}
