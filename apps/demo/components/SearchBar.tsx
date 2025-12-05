'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useThemeOptional } from 'ghostui-react';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search potions, elixirs...' }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  
  const accentColor = theme === 'blood' ? '#ef4444' : '#FF6F00';
  const accentRgb = theme === 'blood' ? '239, 68, 68' : '255, 111, 0';

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!query) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setIsExpanded(false);
  };

  const handleToggle = () => {
    if (isExpanded && !query) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <motion.div
        className="relative flex items-center overflow-hidden rounded-full"
        style={{
          backgroundColor: isExpanded ? `rgba(${accentRgb}, 0.1)` : 'transparent',
          border: isExpanded ? `1px solid rgba(${accentRgb}, 0.3)` : '1px solid transparent',
        }}
        animate={{
          width: isExpanded ? 320 : 40,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Search Icon Button */}
        <motion.button
          onClick={handleToggle}
          className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full transition-colors"
          style={{
            color: isFocused || isExpanded ? accentColor : 'var(--ghost-text-secondary)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-5 h-5" />
        </motion.button>

        {/* Input Field */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex-1 flex items-center pr-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--ghost-text)] placeholder:text-[var(--ghost-text-secondary)]/50"
              />

              {/* Clear Button */}
              {query && (
                <motion.button
                  onClick={handleClear}
                  className="flex items-center justify-center w-6 h-6 rounded-full ml-1"
                  style={{
                    backgroundColor: `rgba(${accentRgb}, 0.2)`,
                    color: accentColor,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Underline Glow - only shows when focused or has text */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 15px rgba(${accentRgb}, 0.8), 0 0 30px rgba(${accentRgb}, 0.5)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isFocused || query ? 1 : 0,
            opacity: isFocused || query ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

      {/* Ambient Glow Effect - only shows when focused or has text */}
      <AnimatePresence>
        {(isFocused || query) && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-full pointer-events-none"
            style={{
              filter: 'blur(20px)',
              backgroundColor: `rgba(${accentRgb}, 0.15)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
