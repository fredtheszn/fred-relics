import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { relics, collections, brandPhilosophy } from '../data/relics';
import { useCart } from '../context/CartContext';

export default function Home() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const { addToCart, setQuickViewProduct } = useCart();

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const featuredRelic = relics[0]; // Relic 01 Chronograph

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* =========================================================================
          SECTION 01 — VIDEO HERO (Cinematic centerpiece)
      ========================================================================= */}
      <section id="hero" className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 md:pt-28 pb-10">
        {/* Video Background Canvas with 16:9 cinematic framing */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <motion.div 
            style={{ y: heroParallax, opacity: heroOpacity }}
            className="w-full h-full relative"
          >
            <video
              ref={videoRef}
              src="/videos/hero_campaign.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
            />
            {/* Cinematic Gradient Overlays to seamlessly blend with header & next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none" />
          </motion.div>
        </div>

        {/* Top Sound Control & Archive Status Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>CAMPAIGN FILM // 001</span>
          </div>

          <button
            onClick={toggleMute}
            className="flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-neutral-300 hover:text-white transition-all rounded-full"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
            <span>{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
          </button>
        </div>

        {/* Hero Center Overlay: Brand Monogram & Monumental Motto */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 my-auto py-12 md:py-16 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 md:w-24 md:h-24 mb-6 relative flex items-center justify-center"
          >
            <img 
              src="/brand/fr_monogram_white.png" 
              alt="FRED RELICS Monogram" 
              className="w-full h-full object-contain filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-mono text-neutral-300 mb-4">
              FRED RELICS
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-extrabold uppercase tracking-tighter leading-[0.9] text-white max-w-5xl mx-auto">
              NOT JUST <br className="hidden sm:block" />
              <span className="text-neutral-300 font-light">ACCESSORIES.</span> <br />
              RELICS.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-3 bg-white text-black px-8 md:px-10 py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span>EXPLORE RELICS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/20 backdrop-blur-md px-6 py-4 uppercase tracking-[0.25em] text-xs font-mono text-neutral-300 hover:text-white hover:border-white/50 transition-all"
            >
              THE PHILOSOPHY
            </Link>
          </motion.div>
        </div>

        {/* Hero Bottom Ticker & Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-end text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-300">
          <div className="hidden sm:block">
            <span>WEAR WHAT STAYS.</span>
          </div>

          <a 
            href="#statement"
            className="mx-auto sm:mx-0 flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>DISCOVER BELOW</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>

          <div className="hidden sm:block text-right">
            <span>ESTABLISHED ARCHIVE</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — BRAND STATEMENT (Oversized Editorial Typography)
      ========================================================================= */}
      <section id="statement" className="py-28 md:py-44 px-6 md:px-12 bg-[#050505] border-t border-white/10 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] font-mono text-neutral-300 border border-white/10 px-4 py-1.5">
              THE CORE PHILOSOPHY
            </span>
          </motion.div>

          <div className="space-y-2 md:space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.95]"
            >
              NOT JUST
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-light text-neutral-400 tracking-tighter uppercase leading-[0.95]"
            >
              ACCESSORIES.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.95] text-white"
            >
              RELICS.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-[1px] h-16 bg-white/20 mx-auto my-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl mx-auto text-sm md:text-base text-neutral-400 font-sans tracking-wide leading-relaxed"
          >
            "A watch, ring, chain, earring, belt or other piece can become part of someone's identity, memories and story. That is why we call them relics."
          </motion.p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — FEATURED RELICS (Editorial Grid)
      ========================================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-300 block mb-2">
              ARCHIVE CURATION
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">
              FEATURED RELICS.
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-neutral-300">
              06 PERMANENT PIECES
            </span>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono hover:text-neutral-300 transition-colors border-b border-white pb-1"
            >
              VIEW ALL RELICS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {relics.map((relic, idx) => (
            <ProductCard key={relic.id} relic={relic} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 — COLLECTIONS (Pillars as visual campaigns)
      ========================================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#090909] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-300 block mb-2">
              DISCIPLINES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">
              THE FOUR PILLARS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                to={`/shop?category=${col.title}`}
                className="group relative h-[480px] bg-[#121212] overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-700 flex flex-col justify-between p-8"
              >
                {/* Background Image with Zoom & Dark Wash */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.55] group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Top Number */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-2xl font-display font-bold text-neutral-300 group-hover:text-white transition-colors">
                    {col.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-300 border border-white/15 px-2.5 py-1 backdrop-blur-sm">
                    {col.relicCount}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-300 block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white mb-3">
                    {col.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-6">
                    {col.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-white group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE CATEGORY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05 — BRAND CAMPAIGN (Editorial Full-Width Spread)
      ========================================================================= */}
      <section className="relative py-36 md:py-48 px-6 md:px-12 overflow-hidden bg-black flex items-center justify-center">
        {/* Subtle geometric texture grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="w-12 h-12 mx-auto mb-8 opacity-40">
              <img src="/brand/fr_monogram_white.png" alt="FR" className="w-full h-full object-contain" />
            </div>

            <p className="text-xs uppercase tracking-[0.4em] font-mono text-neutral-300 mb-6">
              FRED RELICS CAMPAIGN
            </p>

            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tighter leading-[0.9] text-white mb-10">
              WORN TODAY. <br />
              <span className="text-neutral-400 font-light">REMEMBERED</span> <br />
              TOMORROW.
            </h2>

            <p className="max-w-lg mx-auto text-sm text-neutral-400 font-sans tracking-wide leading-relaxed mb-10">
              A relic is not defined by when it was forged. It is defined by how deeply it becomes woven into the identity of the person who wears it.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 uppercase tracking-[0.25em] text-xs font-mono hover:bg-white hover:text-black transition-all"
            >
              READ THE MANIFESTO <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 — FEATURED RELIC SPOTLIGHT (Flagship Chronograph)
      ========================================================================= */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Product Imagery with HUD coordinate tags matching brand video */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] sm:aspect-square bg-[#0c0c0c] border border-white/10 overflow-hidden group">
              <img
                src={featuredRelic.image}
                alt={featuredRelic.name}
                className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
              />

              {/* HUD Coordinate Callout Overlays */}
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>REL-01 // ARCHIVE</span>
              </div>

              <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-300">
                42MM MATTE TITANIUM
              </div>

              <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-300">
                10 ATM DEPTH
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-300 block mb-2">
                ARCHIVE SPOTLIGHT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-4">
                {featuredRelic.name}
              </h2>
              <p className="text-2xl font-mono text-neutral-300 tracking-wide">
                ${featuredRelic.price}
              </p>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {featuredRelic.story}
            </p>

            {/* Bullet points */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              {featuredRelic.specs.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => addToCart(featuredRelic, 1)}
                className="flex-1 bg-white text-black py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>ACQUIRE REL-01</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setQuickViewProduct(featuredRelic)}
                className="border border-white/20 text-white px-6 py-4 uppercase tracking-[0.25em] text-xs font-mono hover:bg-white/10 transition-colors"
              >
                INSPECT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 07 — BRAND STORY (Strictly Adhering to Brand Identity)
      ========================================================================= */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-neutral-300 block mb-3">
              ABOUT FRED RELICS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
              WE SEE THEM DIFFERENTLY.
            </h2>
          </div>

          <div className="space-y-8 text-neutral-300 font-sans text-base md:text-lg leading-relaxed border-l border-white/15 pl-6 md:pl-10">
            <p>
              FRED RELICS exists to redefine the way people think about accessories.
            </p>
            <p className="text-neutral-400">
              Accessories are often treated as finishing touches. We reject that premise.
            </p>
            <div className="space-y-3 font-mono text-xs md:text-sm text-neutral-200 py-4 uppercase tracking-wider">
              <p>— A watch can mark a moment.</p>
              <p>— A ring can carry a memory.</p>
              <p>— A chain can become part of someone's identity.</p>
              <p>— A belt can become recognizable.</p>
              <p>— A piece can become something you keep for years.</p>
            </div>
            <p>
              That's the idea behind FRED RELICS. We create and curate pieces designed to become more than accessories — pieces that become part of your story.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] font-mono text-neutral-400">
              NOT JUST ACCESSORIES. <span className="text-white font-bold">RELICS.</span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 08 — FINAL CTA & CLOSING
      ========================================================================= */}
      <section className="py-36 md:py-48 px-6 md:px-12 bg-black text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-mono text-neutral-300 mb-6">
              THE TIME TO CHOOSE WHAT STAYS
            </p>

            <h2 className="text-5xl sm:text-7xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.9] text-white mb-12">
              MAKE IT <br />
              A RELIC.
            </h2>

            <Link
              to="/shop"
              className="inline-flex items-center gap-4 bg-white text-black px-10 md:px-14 py-5 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.25)]"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
