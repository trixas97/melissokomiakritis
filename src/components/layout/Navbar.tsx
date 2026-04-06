'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/shop' as const, label: t('shop') },
    { href: '/faqs' as const, label: t('faqs') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/55 backdrop-blur-xl border-b border-white/[0.08] shadow-xl shadow-black/30'
          : 'bg-black/15 backdrop-blur-md border-b border-white/[0.06]'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between">
          {/* Logo */}
          <Link href="/" className="group pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Μελισσοκομία Κρήτης"
              className="h-14 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-white/70 rounded-lg transition-all duration-200 hover:text-white hover:bg-white/[0.08]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: language toggle + hamburger */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden -mx-4 px-4 pb-4 pt-2 space-y-0.5 border-t border-white/[0.06] bg-black/40 backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-white/70 rounded-lg transition-colors hover:text-white hover:bg-white/[0.08]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
