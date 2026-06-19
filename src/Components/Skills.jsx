import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useCustomHooks';
import { portfolioData } from '../utils/data';

const categories = ['All', 'Frontend', 'Backend', 'Database'];

const SkillCard = ({ skill, index, theme }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${theme.bgCard}, ${theme.bgSecondary})`
          : theme.bgCard,
        border: `1px solid ${hovered ? theme.cyan + '50' : theme.border}`,
        borderRadius: '16px', padding: '1.25rem',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 10px 30px ${theme.cyan}15` : 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>{skill.icon}</span>
          <span style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '0.95rem' }}>
            {skill.name}
          </span>
        </div>
        <span style={{
          color: theme.cyan, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.85rem',
          background: `${theme.cyan}15`, padding: '2px 10px', borderRadius: '20px'
        }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: '6px', background: theme.bgSecondary, borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            height: '100%', borderRadius: '10px',
            background: skill.level >= 80 ? theme.gradient
              : skill.level >= 70 ? `linear-gradient(90deg, ${theme.purple}, ${theme.cyan})`
              : `linear-gradient(90deg, ${theme.magenta}, ${theme.purple})`
          }}
        />
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <span style={{
          color: theme.textMuted, fontSize: '0.75rem', fontFamily: 'Inter',
          background: theme.bgSecondary, padding: '2px 8px', borderRadius: '10px'
        }}>
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = portfolioData.skills.filter(s =>
    activeCategory === 'All' || s.category === activeCategory
  );

  return (
    <section id="skills" style={{ background: theme.bgSecondary, padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ color: theme.cyan, fontFamily: 'Space Grotesk', fontWeight: 600, letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>
            WHAT I KNOW
          </p>
          <h2 style={{
            fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: theme.text, marginBottom: '1rem'
          }}>
            Technical{' '}
            <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Skills
            </span>
          </h2>
          <p style={{ color: theme.textMuted, fontFamily: 'Inter', maxWidth: '500px', margin: '0 auto' }}>
            A versatile stack spanning frontend, backend, and database technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? theme.gradient : 'transparent',
                border: `1.5px solid ${activeCategory === cat ? 'transparent' : theme.border}`,
                borderRadius: '50px', padding: '8px 22px',
                color: activeCategory === cat ? '#fff' : theme.textMuted,
                fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '0.9rem',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}