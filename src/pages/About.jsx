import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandPhilosophy } from '../data/relics';

export default function About() {
  return (
    <div className="pt-32 md:pt-40 pb-36 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-white">
      {/* Editorial Header */}
      <header className="mb-20 md:mb-32 border-b border-white/10 pb-12">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-400 mb-4">
          <span>THE PHILOSOPHY</span>
          <span>//</span>
          <span>EDITORIAL MANIFESTO</span>
        </div>

        <h1 className="text-4xl sm:text-7xl md:text-9xl font-display font-extrabold uppercase tracking-tight text-white mb-6">
          THE RELIC.
        </h1>

        <p className="text-xl md:text-3xl font-display font-light text-neutral-300 uppercase tracking-tight max-w-3xl leading-snug">
          "NOT JUST ACCESSORIES. <br />
          <span className="text-white font-bold">RELICS."</span>
        </p>
      </header>

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-32">
        {/* Left: Monogram and Core Statement */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-36">
          <div className="w-20 h-20 bg-white/5 border border-white/10 p-4 flex items-center justify-center">
            <img src="/brand/fr_monogram_white.png" alt="FRED RELICS" className="w-full h-full object-contain" />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-500 block mb-2">
              POSITIONING
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white">
              BEYOND THE FLEETING CYCLE.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            FRED RELICS sits between high fashion, street culture, luxury, personal identity, and collectible objects. A relic is not necessarily old; a relic is something that becomes meaningful.
          </p>

          <div className="pt-4 border-t border-white/10">
            <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-500 block mb-3">
              THE PILLARS
            </span>
            <div className="flex flex-wrap gap-2">
              {brandPhilosophy.coreValues.map((v) => (
                <span
                  key={v}
                  className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-white/[0.03] border border-white/10 text-neutral-300"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: The Brand Manifesto Narrative */}
        <div className="lg:col-span-7 space-y-12 text-neutral-300 font-sans text-base md:text-lg leading-relaxed">
          <div className="border-l border-white/20 pl-6 md:pl-10 space-y-6">
            <p className="text-xl md:text-2xl font-display text-white font-medium">
              FRED RELICS exists to redefine the way people think about accessories.
            </p>
            <p className="text-neutral-400">
              Accessories are often treated as finishing touches. An afterthought. A detail added at the end of dressing.
            </p>
            <p className="text-white font-medium">
              We see them differently.
            </p>
          </div>

          <div className="bg-[#090909] border border-white/10 p-8 md:p-12 space-y-6 font-mono text-xs md:text-sm tracking-wider uppercase text-neutral-200">
            <p className="text-neutral-400 font-sans text-xs tracking-normal normal-case mb-4">
              The moments we associate with pieces:
            </p>
            <p className="border-b border-white/10 pb-3">A watch can mark a moment.</p>
            <p className="border-b border-white/10 pb-3">A ring can carry a memory.</p>
            <p className="border-b border-white/10 pb-3">A chain can become part of someone's identity.</p>
            <p className="border-b border-white/10 pb-3">A belt can become recognizable.</p>
            <p>A piece can become something you keep for years.</p>
          </div>

          <div className="space-y-6">
            <p>
              That's the idea behind FRED RELICS.
            </p>
            <p className="text-neutral-400">
              We create and curate pieces designed to become more than accessories — pieces that become part of your story.
            </p>
            <p className="text-neutral-400">
              FRED RELICS is not about following every trend. It is about finding pieces with character and making them part of your story.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-500 mb-1">
                BRAND MOTTO
              </p>
              <p className="text-lg font-display uppercase text-white font-bold">
                NOT JUST ACCESSORIES. RELICS.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-all"
            >
              <span>DISCOVER RELICS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
