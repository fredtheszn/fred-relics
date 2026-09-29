import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { relics } from '../data/relics';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredRelics = relics.filter((r) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.serial.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center px-6 py-5 border-b border-white/10 gap-4">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH RELICS, WATCHES, CHAINS, ARCHIVE CODES..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 tracking-wider font-mono outline-none uppercase"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-mono text-neutral-400 hover:text-white"
                >
                  CLEAR
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results or Suggested Prompts */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {query.trim() === '' ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-500 mb-4">
                    SUGGESTED DISCOVERIES
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Chronograph', 'Titanium', 'Curb Chain', 'Signet', 'Leather', 'Huggie'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-all font-mono"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-500 mb-3">
                    ALL CATEGORIES
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Watches', 'Chains', 'Rings', 'Belts'].map((cat) => (
                      <Link
                        key={cat}
                        to={`/shop?category=${cat}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="p-3 bg-white/[0.02] border border-white/5 hover:border-white/20 text-center block transition-all"
                      >
                        <span className="text-xs uppercase tracking-widest text-neutral-300 font-display">
                          {cat}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredRelics.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400 mb-1">
                    NO RELIC MATCHED "{query.toUpperCase()}"
                  </p>
                  <p className="text-xs text-neutral-600">
                    Try searching by category (e.g. Watch, Chain, Ring, Belt)
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-500 mb-3">
                    MATCHING RELICS ({filteredRelics.length})
                  </p>
                  {filteredRelics.map((relic) => (
                    <Link
                      key={relic.id}
                      to={`/product/${relic.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-16 bg-neutral-900 overflow-hidden flex-shrink-0">
                          <img
                            src={relic.image}
                            alt={relic.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-display uppercase tracking-wide text-white group-hover:text-neutral-200">
                            {relic.name}
                          </p>
                          <p className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">
                            {relic.serial} · {relic.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-neutral-300">
                          ${relic.price}
                        </span>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
