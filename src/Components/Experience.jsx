import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useCustomHooks';
import { portfolioData } from '../utils/Data';

export default function Experience() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" style={{ background: theme.bg, padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{ color: theme.magenta, fontFamily: 'Space Grotesk', fontWeight: 600, letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>
            MY JOURNEY
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: theme.text
          }}>
            Work{' '}
            <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Experience
            </span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: '30px', top: 0, bottom: 0,
              width: '2px', background: theme.gradient,
              transformOrigin: 'top', zIndex: 0
            }}
          />

          {portfolioData.experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative', paddingLeft: '1.5rem' }}
            >
              <motion.div
                whileHover={{ scale: 1.5 }}
                style={{
                  position: 'absolute', left: '22px', top: '20px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: item.color, border: `3px solid ${theme.bg}`,
                  boxShadow: `0 0 15px ${item.color}80`, zIndex: 1, flexShrink: 0
                }}
              />

              <motion.div
                whileHover={{ x: 5, boxShadow: `0 10px 40px ${item.color}20` }}
                style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: '16px', padding: '1.5rem 1.75rem',
                  marginLeft: '2.5rem', flex: 1,
                  borderLeft: `3px solid ${item.color}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem' }}>
                    {item.title}
                  </h3>
                  <span style={{
                    color: item.color, fontSize: '0.8rem', fontFamily: 'Inter',
                    background: `${item.color}15`, padding: '4px 12px', borderRadius: '20px', fontWeight: 500
                  }}>
                    {item.period}
                  </span>
                </div>
                <p style={{ color: item.color, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {item.company}
                </p>
                <p style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: '4rem' }}
        >
          <h3 style={{
            fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.5rem',
            color: theme.text, marginBottom: '1.5rem', textAlign: 'center'
          }}>
            🎓 Education
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {portfolioData.education.map((edu, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, boxShadow: `0 15px 40px ${theme.cyan}15` }}
                style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: '16px', padding: '1.5rem'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{edu.icon}</div>
                <h4 style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {edu.degree}
                </h4>
                <p style={{ color: theme.cyan, fontFamily: 'Inter', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  {edu.institution}
                </p>
                <p style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.8rem' }}>
                  {edu.period}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}