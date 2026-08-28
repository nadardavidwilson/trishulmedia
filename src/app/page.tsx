"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';

type GalleryItem = {
  src: string;
  title: string;
  location: string;
  caption: string;
};

// Images included in `public/` — add more filenames there to show them on the site.
const gallery: GalleryItem[] = [
  { src: '/GalleryImage1.jpg', title: 'Moment One', location: 'Mumbai', caption: 'A warm sunset frame full of emotion and motion.' },
  { src: '/GalleryImage2.jpg', title: 'Moment Two', location: 'Goa', caption: 'Candid expressions, soft light and a relaxed coastal mood.' },
  { src: '/GalleryImage3.jpg', title: 'Moment Three', location: 'Lonavala', caption: 'A cinematic portrait inspired by natural light and storytelling.' },
  { src: '/GalleryImage4.jpg', title: 'Moment Four', location: 'Bengaluru', caption: 'A graceful portrait session with rich tones and natural elegance.' },
  { src: '/GalleryImage5.webp', title: 'Moment Five', location: 'Pune', caption: 'A candid emotional detail that brings the entire story together.' },
  { src: '/GalleryImage6.webp', title: 'Moment Six', location: 'Mahabaleshwar', caption: 'A dreamy final frame that completes the full love-story sequence.' },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹15,999',
    description: 'Perfect for intimate couples who want a clean, memorable session without overspending.',
    features: ['1 location', '2 outfit changes', '20 edited photos', 'Basic cinematic highlight video'],
    featured: false,
  },
  {
    name: 'Signature',
    price: '₹24,999',
    description: 'A balanced package for couples who want fuller coverage and more storytelling.',
    features: ['2 locations', '3 outfit changes', '50 edited photos', '30-second teaser reel', 'Travel support within city'],
    featured: true,
  },
  {
    name: 'Story',
    price: '₹39,999',
    description: 'Ideal for couples wanting extended coverage, multiple setups and premium storytelling.',
    features: ['3 locations', '4 outfit changes', '80 edited photos', '1-minute highlight film', 'Priority editing support'],
    featured: false,
  },
];

// Compute a brand color from the logo at runtime and expose as --brand CSS variable.
function useBrandColorFromLogo(logoPath = '/logo.jpg') {
  const [brand, setBrand] = useState('#b43');
  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = logoPath + '?cachebust=' + Date.now();
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = 1;
        c.height = 1;
        const ctx = c.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        const hex = '#' + [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('');
        if (mounted) setBrand(hex);
        document.documentElement.style.setProperty('--brand', hex);
      } catch (e) {
        // ignore — leave default
      }
    };
    return () => {
      mounted = false;
    };
  }, [logoPath]);
  return brand;
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);
  const brand = useBrandColorFromLogo('/logo.jpg');
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      setVideoMuted(true);
      void video.play();
    });
  }, []);

  const mobileGalleryItem = useMemo(() => gallery[mobileGalleryIndex] ?? gallery[0], [mobileGalleryIndex]);

  const showPreviousMobileImage = () => {
    setMobileGalleryIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  };

  const showNextMobileImage = () => {
    setMobileGalleryIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  };

  return (
    <main style={{ ['--brand' as any]: brand }} className="min-h-screen text-stone-200">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-8 pt-0 sm:px-10 lg:px-12 lg:pb-10 lg:pt-0">
        <header className="relative left-1/2 flex w-screen -translate-x-1/2 flex-col items-start justify-between gap-4 rounded-none card-glass px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:px-10 sm:py-3 lg:px-12">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img src="/logo.jpg" alt="Trishul Media & Films" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover shadow" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] truncate" style={{ color: 'var(--brand)' }}>Trishul Media & Films</p>
              <h1 className="text-sm sm:text-lg font-semibold text-stone-100 whitespace-normal">Capturing Pre-weddings, Maternity and Small Events</h1>
            </div>
          </div>
          <nav className="hidden sm:flex w-full sm:w-auto flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-stone-600 mt-0 sm:mt-0">
            <a href="#gallery" onClick={() => setMenuOpen(false)} className="transition hover:text-rose-500">Gallery</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="transition hover:text-rose-500">About</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="transition hover:text-rose-500">Pricing</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="transition hover:text-rose-500">Book</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className="transition hover:text-rose-500">
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube" className="transition hover:text-rose-500">
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
                <path d="m9.75 15.5 5.5-3.5-5.5-3.5v7Z" fill="white" />
              </svg>
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:hidden">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className="inline-flex p-2 transition hover:text-rose-500">
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube" className="inline-flex p-2 transition hover:text-rose-500">
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
                <path d="m9.75 15.5 5.5-3.5-5.5-3.5v7Z" fill="white" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 text-stone-700 bg-white/90 shadow relative z-50"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile menu dropdown (placed directly after header so it appears under hamburger) */}
        {menuOpen ? (
          <div className="sm:hidden mt-3 fixed left-4 right-4 top-20 z-50 pointer-events-none">
            <div className="card-glass rounded-xl p-4 space-y-2 z-50 pointer-events-auto">
              <a href="#gallery" onClick={() => setMenuOpen(false)} className="block">Gallery</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="block">About</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="block">Pricing</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block">Book</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} aria-label="Instagram" title="Instagram" className="inline-flex p-2 transition hover:text-rose-500">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} aria-label="YouTube" title="YouTube" className="inline-flex p-2 transition hover:text-rose-500">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
                  <path d="m9.75 15.5 5.5-3.5-5.5-3.5v7Z" fill="white" />
                </svg>
              </a>
            </div>
          </div>
        ) : null}

        <section className="hero-video relative left-1/2 isolate -mt-10 flex min-h-[620px] w-screen -translate-x-1/2 items-end overflow-hidden rounded-none p-6 card-glass animate-fade-up md:min-h-[680px] md:p-10 lg:p-14">
          <video
            ref={videoRef}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            loop
            muted={videoMuted}
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/GalleyVedio1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10" aria-hidden="true" />

          <button
            type="button"
            onClick={() => setVideoMuted((muted) => !muted)}
            aria-label={videoMuted ? 'Turn video sound on' : 'Turn video sound off'}
            title={videoMuted ? 'Turn sound on' : 'Turn sound off'}
            className="absolute right-6 top-6 z-20 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/50 bg-black/35 px-3 text-white transition hover:bg-black/60 md:right-10 lg:right-14"
          >
            {videoMuted ? (
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="m23 9-6 6m0-6 6 6" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
              </svg>
            )}
          </button>

          <div className="relative z-20 flex w-full flex-col gap-6">
            <div>
              <span className="inline-flex rounded-full border border-white/40 bg-black/25 px-3 py-1 text-sm font-medium text-white">
                Romantic • Cinematic • Timeless
              </span>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Turning milestones into timeless art.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#gallery" className="rounded-full px-5 py-3 text-sm font-semibold btn-brand">
                Explore Gallery
              </a>
            </div>
          </div>

        </section>

        <section className="w-full px-6 py-2 text-center sm:px-10 lg:px-12">
          <div className="mt-4 space-y-4">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-stone-600">
              We are a pre-wedding shoot, photography and video-editing studio — crafting elegant visuals for weddings, maternity shoots and small events.
            </p>
          </div>
        </section>

        {/* ABOUT and GALLERY sections remain here */}

        <section id="about" className="grid gap-6 rounded-[2rem] p-6 md:grid-cols-[1fr_0.9fr] md:p-8 card-glass animate-fade-up">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand)' }}>The Experience</p>
            <h3 className="text-3xl font-semibold text-stone-100">Every frame feels like a chapter from your love story.</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['18+', 'Locations curated'],
              ['4k', 'Editorial quality'],
              ['100%', 'Personalized direction'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border p-4 text-center" style={{ borderColor: 'rgba(255,255,255,0.03)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <p className="text-2xl font-semibold text-stone-100">{value}</p>
                <p className="mt-1 text-sm text-stone-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl font-semibold text-stone-900">A collection of tender, cinematic moments.</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-stone-600">
              Click any image to open it in a focused lightbox experience that highlights both mood and detail.
            </p>
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="group overflow-hidden rounded-[1.5rem] border border-white/6 bg-transparent text-left shadow-sm gallery-item"
              >
                <img src={item.src} alt={item.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="space-y-1 p-4">
                  <p className="text-sm font-semibold text-stone-100">{item.title}</p>
                  <p className="text-sm text-stone-400">{item.location}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="sm:hidden">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/6 bg-transparent shadow-sm">
              <button
                type="button"
                onClick={() => setSelectedImage(mobileGalleryItem)}
                className="block w-full text-left"
              >
                <img src={mobileGalleryItem.src} alt={mobileGalleryItem.title} className="h-[28rem] w-full object-cover" />
              </button>

              <div className="space-y-1 bg-white/95 p-4 text-stone-900">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{mobileGalleryItem.title}</p>
                  <span className="text-xs text-stone-500">{mobileGalleryIndex + 1}/{gallery.length}</span>
                </div>
                <p className="text-sm text-stone-500">{mobileGalleryItem.location}</p>
              </div>

              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
                <button
                  type="button"
                  onClick={showPreviousMobileImage}
                  aria-label="Previous image"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-white shadow-lg transition hover:bg-black/80"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNextMobileImage}
                  aria-label="Next image"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg text-white shadow-lg transition hover:bg-black/80"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="rounded-[2rem] px-6 py-8 text-stone-900 card-glass md:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand)' }}>Pricing</p>
            <h3 className="mt-3 text-3xl font-semibold">Affordable packages for meaningful memories.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              Thoughtful storytelling, quality editing and flexible coverage designed for couples and families who want beautiful images without a premium price tag.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[1.75rem] border p-6 transition ${plan.featured ? 'border-transparent shadow-lg ring-2 ring-black/5' : 'border-black/5'} `}
                style={{
                  background: plan.featured ? 'linear-gradient(180deg, #fff8f3 0%, #ffffff 100%)' : '#ffffff',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold">{plan.name}</p>
                  {plan.featured ? (
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white" style={{ backgroundColor: 'var(--brand)' }}>
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-5">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-stone-600">{plan.description}</p>

                <ul className="mt-5 space-y-3 text-sm text-stone-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Book this plan
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-[2rem] px-6 py-8 text-stone-900 card-glass md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand)' }}>Contact</p>
              <h3 className="text-3xl font-semibold">Ready for a shoot that feels effortlessly yours?</h3>
            </div>
            <a href="mailto:hello@trishul_gmg.com" className="rounded-full px-5 py-3 text-sm font-semibold btn-brand">
              hello@trishul_gmg.com
            </a>
          </div>
        </section>

        

        {/* Testimonials as full-width stacked sections */}
        <div className="mt-6">
          <Testimonials />
        </div>

        {/* Final contact form section */}
        <div className="mt-6">
          <ContactForm />
        </div>

        {/* Final CTA: Let's Plan Yours (moved to the bottom) */}
        <section className="mt-8 rounded-[2rem] p-8 card-glass text-center">
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand)' }}>Let’s Plan Yours</p>
          <h3 className="text-2xl font-semibold mt-2">Start your pre-wedding or event with us</h3>
          <a href="mailto:hello@trishul_gmg.com" className="mt-5 inline-block btn-brand">Reserve a Session</a>
        </section>
      </section>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl rounded-[2rem] card-glass p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-stone-100 shadow"
            >
              Close
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[75vh] w-full rounded-[1.5rem] object-contain" />
            <div className="space-y-2 p-4">
              <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand)' }}>{selectedImage.location}</p>
              <h4 className="text-2xl font-semibold text-stone-100">{selectedImage.title}</h4>
              <p className="text-sm leading-7 text-stone-300">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
