import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const socials = [
  { label: 'GitHub', icon: '🐙', href: 'https://github.com' },
  { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
  { label: 'Portfolio', icon: '🌐', href: 'https://stately-baklava-48b396.netlify.app' },
  { label: 'Email', icon: '📧', href: 'mailto:salmankanwal95@gmail.com' },
];

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer style={{
      background: theme.bgSecondary,
      borderTop: `1px solid ${theme.border}`,
      padding: '3rem 2rem'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '2rem',
            background: theme.gradient, WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', marginBottom: '1rem',
            display: 'inline-block'
          }}
        >
          ZK.dev
        </motion.div>

        <p style={{
          color: theme.textMuted, fontFamily: 'Inter',
          fontSize: '0.9rem', marginBottom: '1.75rem',
          maxWidth: '400px', margin: '0 auto 1.75rem'
        }}>
          Full-Stack Developer · Karachi, Pakistan
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, boxShadow: `0 8px 20px ${theme.cyan}30` }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: '50px', padding: '8px 18px',
                color: theme.textMuted, fontFamily: 'Inter',
                fontSize: '0.85rem', transition: 'all 0.3s'
              }}
            >
              <span>{s.icon}</span> {s.label}
            </motion.a>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map(link => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ color: theme.cyan }}
              style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem', transition: 'color 0.2s' }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div style={{ width: '60px', height: '2px', background: theme.gradient, margin: '0 auto 1.5rem' }} />

        <p style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} <span style={{ color: theme.cyan }}>Zubaida Kanwal</span>. Built with React + Tailwind + Framer Motion 💙
        </p>
      </div>
    </footer>
  );
}