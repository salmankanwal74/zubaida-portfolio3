import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useCustomHooks';

const stats = [
  { number: '8+', label: 'Years Teaching' },
  { number: '12+', label: 'Tech Skills' },
  { number: '3+', label: 'Projects Built' },
  { number: '2+', label: 'Frameworks' },
];

export default function About() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" style={{ background: theme.bg, padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{
            color: theme.magenta, fontFamily: 'Space Grotesk', fontWeight: 600,
            letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem'
          }}>WHO I AM</p>
          <h2 style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem,4vw,3rem)',
            fontWeight: 700, color: theme.text
          }}>
            About{' '}
            <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Me
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '280px', height: '280px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-6px', borderRadius: '50%',
                  background: `conic-gradient(${theme.cyan}, ${theme.magenta}, ${theme.purple}, ${theme.cyan})`,
                  zIndex: 0
                }}
              />
              <div style={{
                position: 'relative', zIndex: 1, width: '100%', height: '100%',
                borderRadius: '50%', background: `linear-gradient(135deg, ${theme.bgCard}, ${theme.bgSecondary})`,
                border: `4px solid ${theme.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Space Grotesk', fontWeight: 800,
                    fontSize: '4rem', background: theme.gradient,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>ZK</div>
                  <div style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem' }}>
                    Full-Stack Dev
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute', bottom: '-10px', right: '-10px',
                  background: theme.gradient, borderRadius: '14px',
                  padding: '8px 14px', zIndex: 2,
                  boxShadow: `0 8px 24px ${theme.cyan}40`
                }}
              >
                <p style={{ color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.8rem' }}>
                  👩‍💻 Open to work
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 style={{
              fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.6rem',
              color: theme.text, marginBottom: '1rem'
            }}>
              Teacher → Developer 🚀
            </h3>
            <p style={{
              color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.95rem',
              lineHeight: 1.85, marginBottom: '1rem'
            }}>
              I'm <strong style={{ color: theme.cyan }}>Zubaida Kanwal</strong>, a passionate Full-Stack Developer based in Karachi. I spent 8+ years as a science teacher — teaching Physics, Chemistry, and leading the Science Department.
            </p>
            <p style={{
              color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.95rem',
              lineHeight: 1.85, marginBottom: '1.5rem'
            }}>
              In 2024, I took the leap into software engineering at <strong style={{ color: theme.magenta }}>Aptech Garden Center</strong>, building expertise in React, Angular, Laravel, .NET, and C#.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
              {['Problem Solver', 'Detail-Oriented', 'Fast Learner', 'Team Player', 'Creative Thinker'].map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: `linear-gradient(135deg, ${theme.cyan}15, ${theme.magenta}10)`,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '20px', padding: '5px 14px',
                    color: theme.cyan, fontSize: '0.82rem',
                    fontFamily: 'Space Grotesk', fontWeight: 500
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: `0 0 25px ${theme.cyan}40` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: theme.gradient, borderRadius: '50px',
                padding: '13px 28px', color: '#fff',
                fontFamily: 'Space Grotesk', fontWeight: 600,
                fontSize: '0.95rem', cursor: 'pointer'
              }}
            >
              📩 Get In Touch
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.25rem', marginTop: '3.5rem'
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, boxShadow: `0 12px 30px ${theme.cyan}20` }}
              style={{
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: '16px', padding: '1.5rem', textAlign: 'center'
              }}
            >
              <div style={{
                fontFamily: 'Space Grotesk', fontWeight: 800,
                fontSize: '2.2rem', marginBottom: '4px',
                background: theme.gradient, WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.number}
              </div>
              <div style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.85rem' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}