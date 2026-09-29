import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
        {/* Brand identity & Motto */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="h-9 mb-8 flex items-center">
              <img
                src="/brand/wordmark_white.png"
                alt="FRED RELICS"
                className="h-full w-auto object-contain"
              />
            </div>
            
            <p className="text-xl md:text-2xl font-display font-light text-neutral-300 uppercase tracking-tight max-w-sm mb-6 leading-snug">
              NOT JUST ACCESSORIES. <br />
              <span className="text-white font-bold">RELICS.</span>
            </p>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              Objects that become associated with moments. Pieces with character designed to outlive trends and become part of your story.
            </p>
          </div>

          <div className="pt-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400 block mb-2">
              CORE PHILOSOPHY
            </span>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              WEAR WHAT STAYS // MADE TO BE REMEMBERED
            </p>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400">
            CATALOGUE
          </h4>
          <ul className="space-y-3 text-xs tracking-wider uppercase font-mono">
            <li><Link to="/shop?category=Watches" className="text-neutral-400 hover:text-white transition-colors">Watches</Link></li>
            <li><Link to="/shop?category=Chains" className="text-neutral-400 hover:text-white transition-colors">Chains</Link></li>
            <li><Link to="/shop?category=Rings" className="text-neutral-400 hover:text-white transition-colors">Rings</Link></li>
            <li><Link to="/shop?category=Belts" className="text-neutral-400 hover:text-white transition-colors">Belts</Link></li>
            <li><Link to="/shop?category=Earrings" className="text-neutral-400 hover:text-white transition-colors">Earrings</Link></li>
            <li><Link to="/shop" className="text-neutral-300 hover:text-white transition-colors border-b border-white/20 pb-0.5 inline-block mt-2">All Relics</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400">
            THE WORLD
          </h4>
          <ul className="space-y-3 text-xs tracking-wider uppercase font-mono">
            <li><Link to="/collections" className="text-neutral-400 hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/about" className="text-neutral-400 hover:text-white transition-colors">Manifesto</Link></li>
            <li><Link to="/about#story" className="text-neutral-400 hover:text-white transition-colors">Brand Story</Link></li>
            <li><a href="#hero" className="text-neutral-400 hover:text-white transition-colors">Campaign Film</a></li>
          </ul>
        </div>

        {/* Dispatch / Newsletter Signup */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400">
            RELIC DISPATCH
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Receive private notifications on future relic archives and seasonal campaign releases.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS"
              className="w-full bg-white/[0.04] border border-white/15 px-4 py-3 text-xs font-mono tracking-widest text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors uppercase"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center"
              aria-label="Subscribe"
            >
              {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>
          {subscribed && (
            <p className="text-[10px] text-neutral-300 font-mono tracking-widest uppercase">
              CONFIRMED. YOU ARE ON THE REGISTER.
            </p>
          )}
        </div>
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-400">
        <div className="flex items-center gap-4">
          <img src="/brand/fr_monogram_white.png" alt="FR" className="w-4 h-4 object-contain opacity-50" />
          <span>&copy; {new Date().getFullYear()} FRED RELICS. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6 text-neutral-400">
          <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
          <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
          <span className="hover:text-white transition-colors cursor-pointer">CARE & ARCHIVE</span>
        </div>
      </div>
    </footer>
  );
}
