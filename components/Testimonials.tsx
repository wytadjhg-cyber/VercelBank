
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Marcus Thorne",
      title: "CEO, Nexa Global",
      quote: "The only power case that doesn't feel like a brick in my pocket. Pure luxury.",
      rating: 5
    },
    {
      name: "Elara Vance",
      title: "Tech Reviewer",
      quote: "Vercel has redefined the category. It's high fashion meets high performance.",
      rating: 5
    },
    {
      name: "Julian S.",
      title: "Creative Director",
      quote: "Stunning build quality. The titanium accents feel incredible in the hand.",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-black border-y border-white/5 scroll-mt-24">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="#3b82f6" className="text-blue-500" />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-16 tracking-tight">Trusted by Industry Leaders</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {reviews.map((review, idx) => (
            <div key={idx} className="relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 italic">
              <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
                "{review.quote}"
              </p>
              <div className="not-italic">
                <div className="font-bold text-white text-lg">{review.name}</div>
                <div className="text-zinc-500 text-sm tracking-widest uppercase">{review.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
