import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Navbar() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section) => {
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(section);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled
          ? isDark ? 'rgba(10,14,26,0.95)' : 'rgba(240,244,255,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
        transition: 'all 0.3s ease',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', cursor: 'pointer',
            background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          onClick={() => scrollTo('Home')}
        >
          ZK.dev
        </motion.div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <motion.button
              key={link}
              whileHover={{ color: theme.cyan }}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: active === link ? theme.cyan : theme.textMuted,
                fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 500,
                transition: 'color 0.2s',
                borderBottom: active === link ? `2px solid ${theme.cyan}` : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              {link}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
              background: `linear-gradient(135deg, ${theme.cyan}22, ${theme.magenta}22)`,
              border: `1px solid ${theme.border}`,
              borderRadius: '50%', width: '38px', height: '38px',
              cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, fontSize: '1.5rem', display: 'none' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: isDark ? 'rgba(10,14,26,0.98)' : 'rgba(240,244,255,0.98)',
              borderTop: `1px solid ${theme.border}`,
              padding: '1rem 2rem 2rem'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link)}
                style={{ padding: '0.75rem 0', color: active === link ? theme.cyan : theme.text,
                  cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '1.1rem',
                  borderBottom: `1px solid ${theme.border}` }}
              >
                {link}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}