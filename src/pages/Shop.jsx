import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutGrid } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { relics } from '../data/relics';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [sortBy, setSortBy] = useState('featured');
  const [columns, setColumns] = useState(3);

  const categories = ['All', 'Watches', 'Chains', 'Rings', 'Belts', 'Earrings'];

  const setCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredRelics = useMemo(() => {
    let list = activeCategory === 'All'
      ? relics
      : relics.filter((r) => r.category.toLowerCase() === activeCategory.toLowerCase());

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-32 md:pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-white">
      {/* Editorial Header */}
      <header className="mb-16 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-mono text-neutral-400 mb-4">
          <span>CATALOGUE</span>
          <span>//</span>
          <span>{activeCategory.toUpperCase()}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tight text-white mb-6">
          ALL RELICS.
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-sans tracking-wide leading-relaxed">
          Curated objects of character and permanence. Each piece is designed to outlive the cycle of trends and become part of your personal narrative.
        </p>
      </header>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs uppercase font-mono tracking-widest px-4 py-2 border transition-all ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Grid Layout */}
        <div className="flex items-center gap-6 self-end md:self-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#050505] text-white border border-white/15 px-3 py-1.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-white/40"
            >
              <option value="featured">FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>

          {/* Desktop Grid Switcher */}
          <div className="hidden lg:flex items-center gap-1 border border-white/15 p-0.5">
            <button
              onClick={() => setColumns(3)}
              className={`p-1.5 transition-colors ${columns === 3 ? 'bg-white/20 text-white' : 'text-neutral-500 hover:text-white'}`}
              aria-label="3 Column Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 transition-colors ${columns === 4 ? 'bg-white/20 text-white' : 'text-neutral-500 hover:text-white'}`}
              aria-label="4 Column Grid"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Relics Grid */}
      {filteredRelics.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-4">
            NO RELICS REGISTERED IN THIS ARCHIVE
          </p>
          <button
            onClick={() => setCategory('All')}
            className="border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-mono px-6 py-3 hover:bg-white hover:text-black transition-all"
          >
            VIEW ALL RELICS
          </button>
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-8 gap-y-16`}>
          {filteredRelics.map((relic, idx) => (
            <ProductCard key={relic.id} relic={relic} priority={idx < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
