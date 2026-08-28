import React from 'react';

const sample = [
  { name: 'Asha & Rahul', text: 'Trishul made our pre-wedding shoot feel effortless and timeless — the photos still make us smile.' },
  { name: 'Maya', text: 'Amazing direction and editing. Highly recommend for maternity shoots.' },
  { name: 'Rohan', text: 'Small event coverage was professional and beautiful. Great team.' },
  { name: 'Sneha & Vikram', text: 'The team captured candid moments perfectly. Memories for a lifetime.' },
  { name: 'Priya', text: 'Fast delivery and excellent color grading — absolutely loved the edits.' },
  { name: 'Nikhil', text: 'Friendly crew, great locations. Highly recommended for intimate events.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="rounded-[1.5rem] py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold mb-6 text-center">What clients say</h3>
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex gap-8 items-stretch">
            {sample.concat(sample).map((t, idx) => (
              <div key={t.name + idx} className="marquee-item rounded-2xl p-6 bg-white/95 text-stone-900 min-w-[420px] max-w-md shadow-sm flex">
                <div className="flex-shrink-0 mr-4 flex items-start">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                    <path d="M7.17 6A6 6 0 1 0 6 12v6h6v-6H8.5A1.5 1.5 0 0 1 7 10.5V9.83A2.17 2.17 0 0 1 7.17 6z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <p className="text-base leading-7">“{t.text}”</p>
                  <p className="mt-4 text-sm font-semibold text-stone-600">— {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
