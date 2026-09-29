import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Check, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';
import { relics } from '../data/relics';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const relic = relics.find((r) => r.id === id) || relics[0];
  const [selectedSize, setSelectedSize] = useState(relic.sizes ? relic.sizes[0] : 'Standard');
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const handleAddToCart = () => {
    addToCart(relic, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const relatedRelics = relics.filter((r) => r.id !== relic.id).slice(0, 3);

  const accordions = [
    {
      title: "ARCHIVE SPECIFICATIONS",
      content: relic.specs
    },
    {
      title: "OBJECT INTEGRITY & CARE",
      content: [
        "Constructed from solid architectural-grade alloys and treated hides.",
        "Store in the included micro-suede travel pouch when not in continuous rotation.",
        "Natural patinas will develop with skin contact and environmental wear, deepening its character."
      ]
    },
    {
      title: "COURIER DISPATCH & ARCHIVE REGISTRATION",
      content: [
        "Complimentary insured global express courier dispatch on all relic acquisitions.",
        "Dispatched within 24 to 48 hours in discreet signature black packaging.",
        "Includes registered archive certificate of authenticity and unique serial stamp."
      ]
    }
  ];

  return (
    <div className="pt-32 md:pt-40 pb-36 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-white">
      {/* Back Button */}
      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PREVIOUS ARCHIVE</span>
        </button>
      </div>

      {/* Main Relic Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-24 border-b border-white/10">
        {/* Left: Big Editorial Imagery */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] bg-[#0c0c0c] border border-white/10 overflow-hidden group">
            <img
              src={relic.image}
              alt={relic.name}
              className="w-full h-full object-cover filter contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Serial Badge */}
            <div className="absolute top-6 left-6 bg-black/70 backdrop-blur px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-300 border border-white/10">
              {relic.serial}
            </div>

            {/* Badge */}
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-200">
              {relic.badge}
            </div>
          </div>
        </div>

        {/* Right: Relic Dossier & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Category & Status */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-400">
                {relic.category}
              </span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-300">
                REGISTERED
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
              {relic.name}
            </h1>

            {/* Price */}
            <p className="text-2xl font-mono text-white mb-6">
              ${relic.price}
            </p>

            {/* Short Poetic Motto */}
            {relic.shortMotto && (
              <p className="text-sm font-display italic text-neutral-300 mb-6 border-l-2 border-white/30 pl-4 py-1">
                "{relic.shortMotto}"
              </p>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-6">
              {relic.description}
            </p>

            {/* Story */}
            <div className="bg-white/[0.02] border border-white/5 p-4 mb-8">
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-neutral-500 block mb-1">
                RELIC PHILOSOPHY
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {relic.story}
              </p>
            </div>

            {/* Size / Dimension Selector */}
            {relic.sizes && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-400">
                    SELECT DIMENSION
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">
                    STANDARD FIT
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {relic.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs uppercase font-mono px-4 py-2.5 border transition-all ${
                        selectedSize === s
                          ? 'border-white bg-white text-black font-semibold'
                          : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Acquisition CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-black py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 mb-4 group shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ACQUIRED TO BAG</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>ACQUIRE RELIC — ${relic.price}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono tracking-wider mb-8">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>COMPLIMENTARY INSURED COURIER DISPATCH INCLUDED</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-white/10 divide-y divide-white/10">
            {accordions.map((acc, index) => (
              <div key={acc.title} className="py-4">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full flex justify-between items-center text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors text-left"
                >
                  <span>{acc.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeAccordion === index ? 'rotate-180 text-white' : 'text-neutral-500'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-3"
                    >
                      <ul className="space-y-2 text-xs text-neutral-400 leading-relaxed">
                        {acc.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-white/40 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Relics */}
      <section className="pt-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-400 block mb-2">
              COMPLEMENTARY PIECES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight">
              MORE FROM THE ARCHIVE.
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.25em] font-mono hover:text-neutral-300 transition-colors border-b border-white pb-1"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedRelics.map((rel) => (
            <ProductCard key={rel.id} relic={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
