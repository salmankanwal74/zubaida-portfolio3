import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useMousePosition, useApiQuote } from '../hooks/useCustomHooks';

const TypeWriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1500);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex(prev => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (deleting ? -1 : 1));
    }, deleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words]);

  return <span>{words[index].substring(0, subIndex)}<span style={{ opacity: 0.7 }}>|</span></span>;
};

export default function Hero() {
  const { theme } = useTheme();
  const mousePos = useMousePosition();
  const { quote, loading } = useApiQuote();

  const scrollToSection = (section) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: mousePos.x * 0.03, y: mousePos.y * 0.03 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          style={{
            position: 'absolute', top: '10%', left: '10%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.cyan}25 0%, transparent 70%)`,
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{ x: -mousePos.x * 0.02, y: -mousePos.y * 0.02 }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          style={{
            position: 'absolute', bottom: '20%', right: '10%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.magenta}20 0%, transparent 70%)`,
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{ x: mousePos.x * 0.015 }}
          transition={{ type: 'spring', stiffness: 30 }}
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '600px', height: '600px', borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.purple}15 0%, transparent 70%)`,
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`,
        backgroundSize: '60px 60px', opacity: 0.3
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '8rem 2rem 4rem', maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `linear-gradient(135deg, ${theme.cyan}15, ${theme.magenta}15)`,
            border: `1px solid ${theme.border}`,
            borderRadius: '50px', padding: '8px 20px', marginBottom: '2rem',
            color: theme.cyan, fontSize: '0.85rem', fontWeight: 500,
            fontFamily: 'Space Grotesk'
          }}
        >
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: theme.green, boxShadow: `0 0 10px ${theme.green}` }} />
          Available for Work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700, color: theme.text, lineHeight: 1.1, marginBottom: '1rem'
          }}
        >
          Hi, I'm{' '}
          <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Zubaida Kanwal
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 600, color: theme.cyan, marginBottom: '1.5rem', minHeight: '2.5rem'
          }}
        >
          <TypeWriter words={['Full-Stack Developer', 'React Developer', 'Laravel Expert', '.NET Developer', 'UI/UX Enthusiast']} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            color: theme.textMuted, fontSize: '1.05rem', lineHeight: 1.8,
            maxWidth: '600px', margin: '0 auto 2.5rem', fontFamily: 'Inter'
          }}
        >
          Teacher turned developer. I bring precision, patience, and passion to every line of code I write.
        </motion.p>

        {!loading && quote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              background: `linear-gradient(135deg, ${theme.bgCard}, ${theme.bgSecondary})`,
              border: `1px solid ${theme.border}`,
              borderRadius: '16px', padding: '1rem 1.5rem',
              maxWidth: '500px', margin: '0 auto 2.5rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <p style={{ color: theme.textMuted, fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'Inter' }}>
              "{quote.content}" — <strong style={{ color: theme.cyan }}>{quote.author}</strong>
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${theme.cyan}50` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('projects')}
            style={{
              background: theme.gradient, border: 'none', borderRadius: '50px',
              padding: '14px 32px', color: '#fff', fontFamily: 'Space Grotesk',
              fontWeight: 600, fontSize: '1rem', cursor: 'pointer'
            }}
          >
            View My Work ✨
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('contact')}
            style={{
              background: 'transparent',
              border: `1.5px solid ${theme.cyan}`,
              borderRadius: '50px', padding: '14px 32px',
              color: theme.cyan, fontFamily: 'Space Grotesk',
              fontWeight: 600, fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Contact Me 📩
          </motion.button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ marginTop: '4rem', color: theme.textMuted, fontSize: '0.8rem', fontFamily: 'Inter' }}
        >
          scroll down ↓
        </motion.div>
      </div>
    </section>
  );
}