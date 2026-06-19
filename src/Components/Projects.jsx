import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useCustomHooks';
import { portfolioData } from '../utils/data';

export default function Projects() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" style={{ background: theme.bgSecondary, padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ color: theme.purple, fontFamily: 'Space Grotesk', fontWeight: 600, letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '1rem' }}>
            WHAT I BUILT
          </p>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: theme.text }}>
            Featured{' '}
            <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Projects
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {portfolioData.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: theme.bgCard, borderRadius: '20px',
                  border: `1px solid ${hovered === i ? project.color + '50' : theme.border}`,
                  overflow: 'hidden', height: '100%',
                  boxShadow: hovered === i ? `0 20px 60px ${project.color}20` : 'none',
                  transition: 'border-color 0.3s, box-shadow 0.3s'
                }}
              >
                <div style={{
                  height: '180px', position: 'relative', overflow: 'hidden',
                  background: `linear-gradient(135deg, ${project.color}20, ${theme.bg})`
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `linear-gradient(${project.color}10 1px, transparent 1px), linear-gradient(90deg, ${project.color}10 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }} />
                  <motion.div
                    animate={hovered === i ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%,-50%)', fontSize: '4rem'
                    }}
                  >
                    {i === 0 ? '🌐' : i === 1 ? '📚' : '🛒'}
                  </motion.div>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: `${project.color}20`, border: `1px solid ${project.color}50`,
                    borderRadius: '20px', padding: '4px 12px',
                    color: project.color, fontSize: '0.75rem', fontFamily: 'Space Grotesk', fontWeight: 600
                  }}>
                    {i === 0 ? 'Live' : 'In Progress'}
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ color: theme.text, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: theme.textMuted, fontFamily: 'Inter', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{
                        background: `${project.color}15`, border: `1px solid ${project.color}30`,
                        color: project.color, fontSize: '0.75rem', fontFamily: 'Inter',
                        fontWeight: 500, padding: '4px 12px', borderRadius: '20px'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      color: project.color, fontFamily: 'Space Grotesk', fontWeight: 600,
                      fontSize: '0.9rem', textDecoration: 'none'
                    }}
                  >
                    View Project →
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}