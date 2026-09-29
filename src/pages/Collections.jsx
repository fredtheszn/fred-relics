import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collections } from '../data/relics';

export default function Collections() {
  return (
    <div className="pt-32 md:pt-40 pb-36 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-white">
      {/* Header */}
      <header className="mb-20 border-b border-white/10 pb-12">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-400 mb-4">
          <span>THE PILLARS</span>
          <span>//</span>
          <span>FOUR CHAPTERS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tight text-white mb-6">
          COLLECTIONS.
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-sans tracking-wide leading-relaxed">
          Do not treat these as disconnected product categories. They all belong to one larger idea: <span className="text-white font-semibold">RELICS.</span>
        </p>
      </header>

      {/* Collection Campaigns List */}
      <div className="space-y-24 md:space-y-36">
        {collections.map((col, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              {/* Image Side */}
              <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
                <div className="relative aspect-[16/10] bg-[#0c0c0c] border border-white/10 overflow-hidden group">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute top-6 left-6 font-mono text-xs uppercase tracking-[0.3em] text-neutral-300 bg-black/60 backdrop-blur px-3 py-1.5 border border-white/10">
                    DISCIPLINE // {col.number}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'} space-y-6`}>
                <span className="text-xs uppercase tracking-[0.35em] font-mono text-neutral-400 block">
                  {col.subtitle}
                </span>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
                  {col.title}
                </h2>

                <p className="text-sm md:text-base font-display italic text-neutral-300">
                  "{col.statement}"
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {col.description}
                </p>

                <div className="pt-4">
                  <Link
                    to={`/shop?category=${col.title}`}
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-all"
                  >
                    <span>EXPLORE {col.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
